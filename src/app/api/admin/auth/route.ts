import { NextResponse } from "next/server";
import { setAdminCookies, verifyPassword } from "@/lib/adminSecurity";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request: Request) {
  try {
    const key = clientKey(request);
    const now = Date.now();
    const current = attempts.get(key);
    if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: "Try again later" }, { status: 429 });
    }

    const body = (await request.json()) as { password?: string };
    const ok = body.password ? await verifyPassword(body.password) : false;
    if (!ok) {
      const next = current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + WINDOW_MS };
      attempts.set(key, next);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    attempts.delete(key);
    const response = NextResponse.json({ ok: true });
    setAdminCookies(response);
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign in" }, { status: 400 });
  }
}
