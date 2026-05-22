"use client";

import { useLanguage } from "@/context/LanguageContext";
import { localize, translations } from "@/data/translations";

export function useTranslation() {
  const { language, setLanguage } = useLanguage();

  return {
    language,
    setLanguage,
    t: translations,
    localize: <T extends Record<typeof language, string>>(value: T) =>
      localize(value, language),
  };
}
