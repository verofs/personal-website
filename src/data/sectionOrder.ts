export const sectionKeys = [
  "hero",
  "about",
  "experience",
  "timeline",
  "rebelbot",
  "languages",
  "globe",
  "community",
  "footer",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

export const defaultSectionOrder: SectionKey[] = [
  "hero",
  "about",
  "experience",
  "timeline",
  "rebelbot",
  "languages",
  "globe",
  "community",
  "footer",
];

export const sectionLabels: Record<SectionKey, string> = {
  hero: "Hero",
  about: "About",
  experience: "Experience",
  timeline: "Journey",
  rebelbot: "RebelBot",
  languages: "Languages",
  globe: "Globe",
  community: "Community",
  footer: "Footer",
};
