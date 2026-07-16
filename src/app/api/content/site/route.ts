import { NextResponse } from "next/server";
import { readSiteContent } from "@/lib/blobContent";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await readSiteContent());
}
