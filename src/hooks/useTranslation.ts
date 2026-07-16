"use client";

import { useLanguage } from "@/context/LanguageContext";
import { localize } from "@/data/translations";

export function useTranslation() {
  const { language, setLanguage, translations, sectionOrder, images } = useLanguage();

  return {
    language,
    setLanguage,
    sectionOrder,
    images,
    t: translations,
    localize: <T extends Record<typeof language, string>>(value: T) =>
      localize(value, language),
  };
}
