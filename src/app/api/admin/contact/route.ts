import { NextResponse } from "next/server";
import { readContact, writeContact } from "@/lib/blobContent";
import { requireAdmin } from "@/lib/adminSecurity";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const denied = requireAdmin(request, false);
  if (denied) return denied;
  return NextResponse.json(await readContact());
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const body = await request.json();
  return NextResponse.json(await writeContact(body));
}
