"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Language } from "@/data/translations";
import { defaultSiteContent, type SiteTranslations } from "@/data/siteContent";
import type { SectionKey } from "@/data/sectionOrder";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: SiteTranslations;
  sectionOrder: SectionKey[];
  images: Record<string, string>;
  imageFocus: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLanguage = (value: string | null): value is Language =>
  value === "en" || value === "it" || value === "es";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<SiteTranslations>(defaultSiteContent.translations);
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(defaultSiteContent.sectionOrder);
  const [images, setImages] = useState<Record<string, string>>(defaultSiteContent.images);
  const [imageFocus, setImageFocus] = useState<Record<string, string>>(defaultSiteContent.imageFocus);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (isLanguage(savedLanguage)) {
      queueMicrotask(() => setLanguageState(savedLanguage));
    }
  }, []);

  useEffect(() => {
    fetch("/api/content/site")
      .then((response) => (response.ok ? response.json() : defaultSiteContent))
      .then((content) => {
        setTranslations(content.translations ?? defaultSiteContent.translations);
        setSectionOrder(content.sectionOrder ?? defaultSiteContent.sectionOrder);
        setImages(content.images ?? defaultSiteContent.images);
        setImageFocus(content.imageFocus ?? defaultSiteContent.imageFocus);
      })
      .catch(() => {
        setTranslations(defaultSiteContent.translations);
        setSectionOrder(defaultSiteContent.sectionOrder);
        setImages(defaultSiteContent.images);
        setImageFocus(defaultSiteContent.imageFocus);
      });
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-language", nextLanguage);
    }
  };

  const value = useMemo(
    () => ({ language, setLanguage, translations, sectionOrder, images, imageFocus }),
    [language, translations, sectionOrder, images, imageFocus]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
