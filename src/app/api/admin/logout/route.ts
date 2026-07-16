import { NextResponse } from "next/server";
import { clearAdminCookies } from "@/lib/adminSecurity";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  clearAdminCookies(response);
  return response;
}
