import { del, get, put } from "@vercel/blob";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";
import { defaultContact, type ContactData } from "@/data/contact";
import { defaultGalleryPhotos, type GalleryPhoto } from "@/data/gallery";
import { defaultSiteContent, normalizeSiteContent, type SiteContent } from "@/data/siteContent";
// Snapshot committed from the local CMS. Used as the read fallback in
// production (no Blob store), so the deployed site shows the saved copy
// and uploaded photos instead of empty defaults.
import committedSiteContent from "../../public/data/site.json";

const CONTACT_KEY = "content/contact.json";
const GALLERY_KEY = "content/gallery.json";
const SITE_CONTENT_KEY = "content/site.json";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const LOCAL_DATA_DIR = path.join(PUBLIC_DIR, "data");

export function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export function canUseLocalStorage() {
  return process.env.NODE_ENV !== "production";
}

function localJsonPath(key: string) {
  return path.join(LOCAL_DATA_DIR, path.basename(key));
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (!hasBlobToken() && canUseLocalStorage()) {
    try {
      return JSON.parse(await readFile(localJsonPath(key), "utf8")) as T;
    } catch {
      return fallback;
    }
  }
  if (!hasBlobToken()) return fallback;
  try {
    const result = await get(key, { access: "public", useCache: false });
    if (!result || result.statusCode !== 200) return fallback;
    return (await new Response(result.stream).json()) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(key: string, value: T) {
  if (!hasBlobToken() && canUseLocalStorage()) {
    await mkdir(LOCAL_DATA_DIR, { recursive: true });
    await writeFile(localJsonPath(key), JSON.stringify(value, null, 2));
    return;
  }
  await put(key, JSON.stringify(value, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export function sanitizeUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("mailto:") || value.startsWith("/") || value.startsWith("https://")) {
    return value.trim();
  }
  return "";
}

export function sanitizeText(value: unknown, max = 240) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

export async function readContact() {
  return readJson<ContactData>(CONTACT_KEY, defaultContact);
}

export async function writeContact(input: Partial<ContactData>) {
  const contact: ContactData = {
    email: sanitizeText(input.email, 120) || defaultContact.email,
    phone: sanitizeText(input.phone, 40),
    whatsapp: sanitizeUrl(String(input.whatsapp ?? "")) || defaultContact.whatsapp,
    instagram: sanitizeUrl(String(input.instagram ?? "")) || defaultContact.instagram,
    instagramLabel: sanitizeText(input.instagramLabel, 80) || defaultContact.instagramLabel,
    linkedin: sanitizeUrl(String(input.linkedin ?? "")) || defaultContact.linkedin,
    github: sanitizeUrl(String(input.github ?? "")),
    resumeUrl: sanitizeUrl(String(input.resumeUrl ?? "")) || defaultContact.resumeUrl,
  };
  await writeJson(CONTACT_KEY, contact);
  return contact;
}

export async function readGallery() {
  return readJson<GalleryPhoto[]>(GALLERY_KEY, defaultGalleryPhotos);
}

export async function writeGallery(photos: GalleryPhoto[]) {
  await writeJson(GALLERY_KEY, photos);
  return photos;
}

export async function readSiteContent() {
  const fallback = normalizeSiteContent(committedSiteContent) ?? defaultSiteContent;
  const content = await readJson<SiteContent>(SITE_CONTENT_KEY, fallback);
  return normalizeSiteContent(content);
}

export async function writeSiteContent(input: unknown) {
  const content = normalizeSiteContent(input);
  await writeJson(SITE_CONTENT_KEY, content);
  return content;
}

export async function deleteBlob(urlOrPathname: string) {
  if (!hasBlobToken() && canUseLocalStorage() && urlOrPathname.startsWith("/uploads/")) {
    try {
      await unlink(path.join(PUBLIC_DIR, urlOrPathname));
    } catch {
      // Missing local files are already deleted from the user's point of view.
    }
    return;
  }
  if (urlOrPathname.startsWith("http") || urlOrPathname.startsWith("uploads/")) {
    await del(urlOrPathname);
  }
}

export async function writeLocalPublicFile(relativePath: string, bytes: Buffer) {
  const safePath = relativePath.replace(/^\/+/, "");
  const target = path.join(PUBLIC_DIR, safePath);
  if (!target.startsWith(PUBLIC_DIR)) {
    throw new Error("Invalid file path");
  }
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, bytes);
  return `/${safePath}`;
}
