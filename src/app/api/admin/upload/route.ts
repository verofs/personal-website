import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { canUseLocalStorage, hasBlobToken, writeLocalPublicFile } from "@/lib/blobContent";
import { requireAdmin } from "@/lib/adminSecurity";

export const runtime = "nodejs";

const IMAGE_LIMIT = 5 * 1024 * 1024;
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function hasValidSignature(type: string, bytes: Buffer) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (type === "image/webp") return bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  const ext = file instanceof File ? ALLOWED.get(file.type) : null;
  if (!(file instanceof File) || !ext || file.size > IMAGE_LIMIT) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  if (!hasValidSignature(file.type, bytes)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const id = randomUUID();
  let url: string;
  if (hasBlobToken()) {
    const blob = await put(`uploads/images/${id}.${ext}`, bytes, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });
    url = blob.url;
  } else if (canUseLocalStorage()) {
    url = await writeLocalPublicFile(`uploads/images/${id}.${ext}`, bytes);
  } else {
    return NextResponse.json({ error: "Storage is not configured" }, { status: 503 });
  }
  return NextResponse.json({ url });
}
