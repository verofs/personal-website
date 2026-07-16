import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHmac } from "crypto";
import { promisify } from "util";
import { NextResponse } from "next/server";

const scrypt = promisify(scryptCallback);

const SESSION_COOKIE = "vfs_admin_session";
const CSRF_COOKIE = "vfs_admin_csrf";
const SESSION_MAX_AGE = 60 * 60 * 8;

function parseCookies(header: string | null) {
  const cookies = new Map<string, string>();
  if (!header) return cookies;
  for (const part of header.split(";")) {
    const [rawKey, ...valueParts] = part.trim().split("=");
    if (!rawKey) continue;
    cookies.set(rawKey, decodeURIComponent(valueParts.join("=")));
  }
  return cookies;
}

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set to at least 32 characters.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export async function verifyPassword(password: string) {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return false;
  const [scheme, saltBase64, hashBase64] = stored.split(":");
  if (scheme !== "scrypt" || !saltBase64 || !hashBase64) return false;

  const salt = Buffer.from(saltBase64, "base64");
  const expected = Buffer.from(hashBase64, "base64");
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createScryptHash(password: string) {
  const salt = randomBytes(16);
  return scrypt(password, salt, 64).then((hash) => {
    const buffer = hash as Buffer;
    return `scrypt:${salt.toString("base64")}:${buffer.toString("base64")}`;
  });
}

export function setAdminCookies(response: NextResponse) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const nonce = randomBytes(16).toString("base64url");
  const payload = `${expires}.${nonce}`;
  const token = `${payload}.${sign(payload)}`;
  const csrf = randomBytes(24).toString("base64url");

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  response.cookies.set(CSRF_COOKIE, csrf, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearAdminCookies(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  response.cookies.set(CSRF_COOKIE, "", { path: "/", maxAge: 0 });
}

export function isAuthenticated(request: Request) {
  try {
    const cookies = parseCookies(request.headers.get("cookie"));
    const token = cookies.get(SESSION_COOKIE);
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = `${parts[0]}.${parts[1]}`;
    const expected = sign(payload);
    if (!timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected))) return false;
    return Number(parts[0]) > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function verifyCsrf(request: Request) {
  const cookies = parseCookies(request.headers.get("cookie"));
  const token = cookies.get(CSRF_COOKIE);
  const header = request.headers.get("x-csrf-token");
  return Boolean(token && header && token === header);
}

export function requireAdmin(request: Request, checkCsrf = true) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (checkCsrf && !verifyCsrf(request)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }
  return null;
}
