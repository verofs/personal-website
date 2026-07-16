import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { canUseLocalStorage, deleteBlob, hasBlobToken, readGallery, sanitizeText, writeGallery, writeLocalPublicFile } from "@/lib/blobContent";
import { requireAdmin } from "@/lib/adminSecurity";
import type { GalleryPhoto } from "@/data/gallery";

export const runtime = "nodejs";

const IMAGE_LIMIT = 5 * 1024 * 1024;
const ALLOWED = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function hasValidSignature(type: string, bytes: Buffer) {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (type === "image/webp") return bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

export async function GET(request: Request) {
  const denied = requireAdmin(request, false);
  if (denied) return denied;
  return NextResponse.json(await readGallery());
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const form = await request.formData();
  const file = form.get("file");
  const ext = file instanceof File ? ALLOWED.get(file.type) : null;
  if (!(file instanceof File) || !ext || file.size > IMAGE_LIMIT) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  if (!hasValidSignature(file.type, bytes)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const id = randomUUID();
  let src: string;
  if (hasBlobToken()) {
    const blob = await put(`uploads/gallery/${id}.${ext}`, bytes, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });
    src = blob.url;
  } else if (canUseLocalStorage()) {
    src = await writeLocalPublicFile(`uploads/gallery/${id}.${ext}`, bytes);
  } else {
    return NextResponse.json({ error: "Storage is not configured" }, { status: 503 });
  }
  const photo: GalleryPhoto = {
    id,
    src,
    caption: {
      en: sanitizeText(form.get("captionEn"), 140) || "Gallery photo",
      it: sanitizeText(form.get("captionIt"), 140) || "Foto galleria",
      es: sanitizeText(form.get("captionEs"), 140) || "Foto de galeria",
    },
    category: sanitizeText(form.get("category"), 40) || "gallery",
    aspect: "landscape",
  };
  const photos = await readGallery();
  await writeGallery([photo, ...photos]);
  return NextResponse.json(photo);
}

export async function DELETE(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = (await request.json()) as { id?: string };
  if (!id) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const photos = await readGallery();
  const target = photos.find((photo) => photo.id === id);
  const remaining = photos.filter((photo) => photo.id !== id);
  if (target) await deleteBlob(target.src);
  await writeGallery(remaining);
  return NextResponse.json({ ok: true });
}
