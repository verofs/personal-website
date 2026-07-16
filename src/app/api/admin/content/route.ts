import { NextResponse } from "next/server";
import { readSiteContent, writeSiteContent } from "@/lib/blobContent";
import { requireAdmin } from "@/lib/adminSecurity";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = requireAdmin(request, false);
  if (denied) return denied;
  return NextResponse.json(await readSiteContent());
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json(await writeSiteContent(await request.json()));
}
