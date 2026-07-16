import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { canUseLocalStorage, hasBlobToken, readContact, writeContact, writeLocalPublicFile } from "@/lib/blobContent";
import { requireAdmin } from "@/lib/adminSecurity";

export const runtime = "nodejs";

const PDF_LIMIT = 10 * 1024 * 1024;

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.type !== "application/pdf" || file.size > PDF_LIMIT) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.subarray(0, 4).toString("utf8") !== "%PDF") {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  let resumeUrl: string;
  if (hasBlobToken()) {
    const blob = await put(`uploads/resume/${randomUUID()}.pdf`, bytes, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });
    resumeUrl = blob.url;
  } else if (canUseLocalStorage()) {
    resumeUrl = await writeLocalPublicFile(`uploads/resume/${randomUUID()}.pdf`, bytes);
  } else {
    return NextResponse.json({ error: "Storage is not configured" }, { status: 503 });
  }
  const contact = await readContact();
  const updated = await writeContact({ ...contact, resumeUrl });
  return NextResponse.json({ resumeUrl: updated.resumeUrl });
}
