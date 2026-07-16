import { defaultSectionOrder, sectionKeys, type SectionKey } from "./sectionOrder";
import { translations } from "./translations";

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? Widen<Item>[]
    : T extends object
      ? { -readonly [Key in keyof T]: Widen<T[Key]> }
      : T;

export type SiteTranslations = Widen<typeof translations>;

export interface SiteContent {
  translations: SiteTranslations;
  sectionOrder: SectionKey[];
  images: Record<string, string>;
}

export const defaultSiteContent: SiteContent = {
  translations: translations as unknown as SiteTranslations,
  sectionOrder: defaultSectionOrder,
  images: {},
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function mergeDeep<T>(fallback: T, override: unknown): T {
  if (Array.isArray(fallback)) {
    return (Array.isArray(override) ? override : fallback) as T;
  }
  if (!isRecord(fallback)) {
    return (typeof override === typeof fallback ? override : fallback) as T;
  }
  if (!isRecord(override)) return fallback;

  const merged: Record<string, unknown> = { ...fallback };
  for (const key of Object.keys(fallback)) {
    merged[key] = mergeDeep((fallback as Record<string, unknown>)[key], override[key]);
  }
  return merged as T;
}

export function normalizeSectionOrder(value: unknown): SectionKey[] {
  const selected = Array.isArray(value)
    ? value.filter((key): key is SectionKey => sectionKeys.includes(key as SectionKey))
    : [];
  return [...selected, ...defaultSectionOrder.filter((key) => !selected.includes(key))];
}

export function normalizeImages(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {};
  const images: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value)) {
    if (typeof raw !== "string") continue;
    const url = raw.trim();
    if (url.startsWith("/uploads/") || url.startsWith("https://") || url.startsWith("http://")) {
      images[key.slice(0, 80)] = url.slice(0, 400);
    }
  }
  return images;
}

export function normalizeSiteContent(value: unknown): SiteContent {
  const record = isRecord(value) ? value : {};
  return {
    translations: mergeDeep(translations as unknown as SiteTranslations, record.translations),
    sectionOrder: normalizeSectionOrder(record.sectionOrder),
    images: normalizeImages(record.images),
  };
}
