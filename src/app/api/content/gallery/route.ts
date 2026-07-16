import { NextResponse } from "next/server";
import { readGallery } from "@/lib/blobContent";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await readGallery(), {
    headers: { "cache-control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
