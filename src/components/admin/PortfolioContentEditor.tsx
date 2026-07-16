"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultSiteContent, type SiteContent } from "@/data/siteContent";
import { defaultSectionOrder, sectionLabels, type SectionKey } from "@/data/sectionOrder";
import type { Language, LocalizedText } from "@/data/translations";
import { timelineData } from "@/data/timeline";
import { adminFetch } from "./adminClient";
import ImageSlot from "./ImageSlot";
import SectionEditor from "./SectionEditor";

const languages: Language[] = ["en", "it", "es"];

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function toLines(values: string[]) {
  return values.join("\n");
}

function fromLines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function toAchievementLines(values: string[][]) {
  return values.map(([title, detail]) => `${title} | ${detail}`).join("\n");
}

function fromAchievementLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...detail] = line.split("|");
      return [title.trim(), detail.join("|").trim()] as [string, string];
    });
}

interface LocalizedFieldProps {
  label: string;
  value: LocalizedText;
  multiline?: boolean;
  onChange: (language: Language, value: string) => void;
}

function LocalizedField({ label, value, multiline = false, onChange }: LocalizedFieldProps) {
  return (
    <div className="grid gap-3">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="grid gap-3 lg:grid-cols-3">
        {languages.map((language) => (
          <label key={language} className="grid gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            {language}
            {multiline ? (
              <textarea
                value={value[language]}
                onChange={(event) => onChange(language, event.target.value)}
                rows={5}
                className="min-h-28 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-neon-cyan"
              />
            ) : (
              <input
                value={value[language]}
                onChange={(event) => onChange(language, event.target.value)}
                className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-neon-cyan"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

interface LocalizedListProps {
  label: string;
  value: Record<Language, string[]>;
  onChange: (language: Language, value: string[]) => void;
}

function LocalizedList({ label, value, onChange }: LocalizedListProps) {
  return (
    <div className="grid gap-3">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="grid gap-3 lg:grid-cols-3">
        {languages.map((language) => (
          <label key={language} className="grid gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            {language}
            <textarea
              value={toLines(value[language])}
              onChange={(event) => onChange(language, fromLines(event.target.value))}
              rows={5}
              className="min-h-28 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-neon-cyan"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

interface AchievementListProps {
  value: Record<Language, string[][]>;
  onChange: (language: Language, value: string[][]) => void;
}

function AchievementList({ value, onChange }: AchievementListProps) {
  return (
    <div className="grid gap-3">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        Achievements (one per line: title | detail)
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {languages.map((language) => (
          <label key={language} className="grid gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            {language}
            <textarea
              value={toAchievementLines(value[language])}
              onChange={(event) => onChange(language, fromAchievementLines(event.target.value))}
              rows={5}
              className="min-h-28 rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-neon-cyan"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioContentEditor() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((response) => (response.ok ? response.json() : defaultSiteContent))
      .then((data) => setContent(cloneContent(data)))
      .catch(() => setContent(cloneContent(defaultSiteContent)))
      .finally(() => setLoading(false));
  }, []);

  const t = content.translations;

  const moveSection = (key: SectionKey, direction: -1 | 1) => {
    setContent((current) => {
      const order = [...current.sectionOrder];
      const index = order.indexOf(key);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return current;
      [order[index], order[nextIndex]] = [order[nextIndex], order[index]];
      return { ...current, sectionOrder: order };
    });
  };

  const resetOrder = () => {
    setContent((current) => ({ ...current, sectionOrder: defaultSectionOrder }));
  };

  const update = (updater: (draft: SiteContent) => void) => {
    setContent((current) => {
      const draft = cloneContent(current);
      if (!draft.images) draft.images = {};
      if (!draft.imageFocus) draft.imageFocus = {};
      updater(draft);
      return draft;
    });
  };

  const setImage = (key: string, url: string) =>
    update((draft) => {
      if (url) {
        draft.images[key] = url;
      } else {
        delete draft.images[key];
        delete draft.imageFocus[key];
      }
    });

  const setImageFocus = (key: string, focus: string) =>
    update((draft) => {
      if (focus && focus !== "50% 50%") draft.imageFocus[key] = focus;
      else delete draft.imageFocus[key];
    });

  const images = content.images ?? {};
  const imageFocus = content.imageFocus ?? {};
  const photoSlots: { key: string; label: string }[] = [
    { key: "about", label: "About - profile photo" },
    { key: "rebelbotEvent", label: "RebelBot - The Exchange event photo" },
    ...t.globe.photos.en.map((label, index) => ({ key: `globe.${index}`, label: `Travel - ${label}` })),
    ...t.community.photoLabels.en.map((label, index) => ({ key: `community.${index}`, label: `Community - ${label}` })),
    ...timelineData.map((entry) => ({ key: `timeline.${entry.id}`, label: `Journey - ${entry.title.en}` })),
  ];

  const save = async () => {
    setError("");
    setSaved(false);
    try {
      const response = await adminFetch("/api/admin/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(content),
      });
      setContent(cloneContent(await response.json()));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed");
    }
  };

  const orderedSections = useMemo(() => content.sectionOrder, [content.sectionOrder]);

  if (loading) return <p className="text-sm text-white/50">Loading content...</p>;

  return (
    <div className="grid gap-5">
      <div className="sticky top-0 z-20 -mx-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur">
        <div>
          <h2 className="text-lg font-bold text-white">Portfolio CMS</h2>
          <p className="text-xs text-white/45">Edit public copy and homepage section order.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-300">Saved.</span>}
          {error && <span className="text-sm text-red-300">{error}</span>}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/75 hover:border-neon-cyan/50 hover:text-white"
          >
            Preview
          </a>
          <button onClick={save} className="rounded-lg bg-neon-pink px-4 py-2 text-sm font-bold text-white">
            Save all
          </button>
        </div>
      </div>

      <SectionEditor title="Section Order" description="Use arrows to reorder the live homepage." defaultOpen>
        <div className="grid gap-2">
          {orderedSections.map((key, index) => (
            <div key={key} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
              <span className="text-sm font-semibold text-white">{sectionLabels[key]}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveSection(key, -1)}
                  disabled={index === 0}
                  className="rounded border border-white/10 px-2 py-1 text-xs text-white/70 disabled:opacity-30"
                >
                  Up
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(key, 1)}
                  disabled={index === orderedSections.length - 1}
                  className="rounded border border-white/10 px-2 py-1 text-xs text-white/70 disabled:opacity-30"
                >
                  Down
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={resetOrder} className="mt-4 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/70">
          Reset order
        </button>
      </SectionEditor>

      <SectionEditor title="Photos" description="Drag & drop a real image into any placeholder. Use “Adjust position” to click the part of a photo you want kept in view." defaultOpen>
        <div className="grid gap-5 sm:grid-cols-2">
          {photoSlots.map((slot) => (
            <ImageSlot
              key={slot.key}
              label={slot.label}
              value={images[slot.key] ?? ""}
              onChange={(url) => setImage(slot.key, url)}
              focus={imageFocus[slot.key] ?? ""}
              onFocusChange={(focus) => setImageFocus(slot.key, focus)}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-white/40">Remember to press &ldquo;Save all&rdquo; above after adding photos.</p>
      </SectionEditor>

      <SectionEditor title="Hero" defaultOpen>
        <div className="grid gap-5">
          <LocalizedList label="Subtitles" value={t.hero.subtitles} onChange={(language, value) => update((draft) => { draft.translations.hero.subtitles[language] = value; })} />
          <LocalizedField label="Tagline" value={t.hero.tagline} onChange={(language, value) => update((draft) => { draft.translations.hero.tagline[language] = value; })} />
          <LocalizedField label="Scroll label" value={t.hero.scroll} onChange={(language, value) => update((draft) => { draft.translations.hero.scroll[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="About">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.about.title} onChange={(language, value) => update((draft) => { draft.translations.about.title[language] = value; })} />
          <LocalizedField label="Body" value={t.about.body} multiline onChange={(language, value) => update((draft) => { draft.translations.about.body[language] = value; })} />
          <LocalizedField label="Photo placeholder" value={t.about.photo} onChange={(language, value) => update((draft) => { draft.translations.about.photo[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="Experience">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.experience.title} onChange={(language, value) => update((draft) => { draft.translations.experience.title[language] = value; })} />
          <LocalizedField label="Intro" value={t.experience.intro} multiline onChange={(language, value) => update((draft) => { draft.translations.experience.intro[language] = value; })} />
          <LocalizedField label="Professional heading" value={t.experience.professional} onChange={(language, value) => update((draft) => { draft.translations.experience.professional[language] = value; })} />
          <LocalizedField label="Leadership heading" value={t.experience.leadership} onChange={(language, value) => update((draft) => { draft.translations.experience.leadership[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="Journey">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.timeline.title} onChange={(language, value) => update((draft) => { draft.translations.timeline.title[language] = value; })} />
          <LocalizedField label="Intro" value={t.timeline.intro} multiline onChange={(language, value) => update((draft) => { draft.translations.timeline.intro[language] = value; })} />
          <LocalizedField label="Previous" value={t.timeline.previous} onChange={(language, value) => update((draft) => { draft.translations.timeline.previous[language] = value; })} />
          <LocalizedField label="Next" value={t.timeline.next} onChange={(language, value) => update((draft) => { draft.translations.timeline.next[language] = value; })} />
          <LocalizedField label="Photo placeholder" value={t.timeline.photo} onChange={(language, value) => update((draft) => { draft.translations.timeline.photo[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="RebelBot">
        <div className="grid gap-5">
          <LocalizedField label="Kicker" value={t.rebelbot.kicker} onChange={(language, value) => update((draft) => { draft.translations.rebelbot.kicker[language] = value; })} />
          <LocalizedField label="Tagline" value={t.rebelbot.tagline} onChange={(language, value) => update((draft) => { draft.translations.rebelbot.tagline[language] = value; })} />
          <LocalizedField label="Body" value={t.rebelbot.body} multiline onChange={(language, value) => update((draft) => { draft.translations.rebelbot.body[language] = value; })} />
          <LocalizedField label="CTA" value={t.rebelbot.cta} onChange={(language, value) => update((draft) => { draft.translations.rebelbot.cta[language] = value; })} />
          <AchievementList value={t.rebelbot.achievements} onChange={(language, value) => update((draft) => { draft.translations.rebelbot.achievements[language] = value; })} />
          <LocalizedField label="Event photo placeholder" value={t.rebelbot.eventPhoto} onChange={(language, value) => update((draft) => { draft.translations.rebelbot.eventPhoto[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="Languages">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.languagesSection.title} onChange={(language, value) => update((draft) => { draft.translations.languagesSection.title[language] = value; })} />
          <LocalizedField label="Native label" value={t.languagesSection.native} onChange={(language, value) => update((draft) => { draft.translations.languagesSection.native[language] = value; })} />
          <LocalizedField label="Fluent label" value={t.languagesSection.fluent} onChange={(language, value) => update((draft) => { draft.translations.languagesSection.fluent[language] = value; })} />
          <LocalizedField label="Business skills heading" value={t.languagesSection.businessSkills} onChange={(language, value) => update((draft) => { draft.translations.languagesSection.businessSkills[language] = value; })} />
          <LocalizedField label="Tools heading" value={t.languagesSection.tools} onChange={(language, value) => update((draft) => { draft.translations.languagesSection.tools[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="Globe">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.globe.title} onChange={(language, value) => update((draft) => { draft.translations.globe.title[language] = value; })} />
          <LocalizedField label="Quote" value={t.globe.quote} multiline onChange={(language, value) => update((draft) => { draft.translations.globe.quote[language] = value; })} />
          <LocalizedList label="Photo placeholders" value={t.globe.photos} onChange={(language, value) => update((draft) => { draft.translations.globe.photos[language] = value; })} />
          <LocalizedField label="Add photo label" value={t.globe.addPhoto} onChange={(language, value) => update((draft) => { draft.translations.globe.addPhoto[language] = value; })} />
          <LocalizedField label="Lived marker label" value={t.globe.livedLabel} onChange={(language, value) => update((draft) => { draft.translations.globe.livedLabel[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="Community">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.community.title} onChange={(language, value) => update((draft) => { draft.translations.community.title[language] = value; })} />
          <LocalizedField label="Intro" value={t.community.intro} multiline onChange={(language, value) => update((draft) => { draft.translations.community.intro[language] = value; })} />
          <LocalizedList label="Photo placeholders" value={t.community.photoLabels} onChange={(language, value) => update((draft) => { draft.translations.community.photoLabels[language] = value; })} />
          <LocalizedField label="Add photo label" value={t.community.addPhoto} onChange={(language, value) => update((draft) => { draft.translations.community.addPhoto[language] = value; })} />
          <LocalizedField label="Volunteer title" value={t.community.volunteerTitle} onChange={(language, value) => update((draft) => { draft.translations.community.volunteerTitle[language] = value; })} />
        </div>
      </SectionEditor>

      <SectionEditor title="Footer">
        <div className="grid gap-5">
          <LocalizedField label="Title" value={t.footer.title} onChange={(language, value) => update((draft) => { draft.translations.footer.title[language] = value; })} />
          <LocalizedField label="Body" value={t.footer.body} multiline onChange={(language, value) => update((draft) => { draft.translations.footer.body[language] = value; })} />
          <LocalizedField label="Resume button" value={t.footer.resume} onChange={(language, value) => update((draft) => { draft.translations.footer.resume[language] = value; })} />
        </div>
      </SectionEditor>
    </div>
  );
}
