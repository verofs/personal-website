import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/adminSecurity";

export const runtime = "nodejs";

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isAuthenticated(request) });
}
