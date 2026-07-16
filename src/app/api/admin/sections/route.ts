import { NextResponse } from "next/server";
import { normalizeSectionOrder } from "@/data/siteContent";
import { readSiteContent, writeSiteContent } from "@/lib/blobContent";
import { requireAdmin } from "@/lib/adminSecurity";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = requireAdmin(request, false);
  if (denied) return denied;
  const content = await readSiteContent();
  return NextResponse.json({ sectionOrder: content.sectionOrder });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = (await request.json()) as { sectionOrder?: unknown };
  const content = await readSiteContent();
  const updated = await writeSiteContent({
    ...content,
    sectionOrder: normalizeSectionOrder(body.sectionOrder),
  });
  return NextResponse.json({ sectionOrder: updated.sectionOrder });
}
