"use client";

import type React from "react";
import About from "@/components/About";
import Community from "@/components/Community";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Languages from "@/components/Languages";
import RebelBot from "@/components/RebelBot";
import Timeline from "@/components/Timeline";
import TravelGlobe from "@/components/TravelGlobe";
import { useLanguage } from "@/context/LanguageContext";
import type { SectionKey } from "@/data/sectionOrder";

const sections: Record<SectionKey, React.ComponentType> = {
  hero: Hero,
  about: About,
  experience: Experience,
  timeline: Timeline,
  rebelbot: RebelBot,
  languages: Languages,
  globe: TravelGlobe,
  community: Community,
  footer: Footer,
};

export default function HomeSections() {
  const { sectionOrder } = useLanguage();

  return (
    <>
      {sectionOrder.map((key) => {
        const Section = sections[key];
        return <Section key={key} />;
      })}
    </>
  );
}
