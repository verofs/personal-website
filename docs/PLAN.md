# Veronica Fortuno Seput — Personal Portfolio Website

## Context

Veronica needs a personal website that serves as an interactive, animated extension of her resume. When employers receive her resume, they'll see a link to this site and be blown away by her story, personality, and international experience. The site must feel professional enough for job applications but creative and fun enough to show who she really is — direct, genuine, positive, a world traveler, and a girl boss who builds things.

**Deploying to**: Vercel (free) — URL will be something like `veronica-fortuno.vercel.app`
**Budget**: $0 — no domain, no paid services

---

## Tech Stack

| Tool | Why |
|------|-----|
| **Next.js 15 (App Router)** | Free Vercel deploy, great SEO so employers can find her, React ecosystem |
| **TypeScript** | Type safety, professional codebase |
| **Tailwind CSS v4** | Fast styling, easy gradients, responsive out of the box |
| **Framer Motion** | Smooth scroll animations, section transitions, hover effects |
| **COBE** | Lightweight (~5KB) interactive globe that spins — exactly what she wants |
| **Embla Carousel** | Smooth horizontal slider for the timeline |

No database needed. Pure static site. No Supabase needed.

---

## Design System

### Color Palette (Bold & Mixed Gradients)
- **Primary gradient**: `#FF6B9D` (hot pink) → `#C084FC` (purple) → `#818CF8` (indigo) → `#38BDF8` (sky blue)
- **Background**: Alternating between soft warm cream (`#FFF7ED`) and deep navy (`#0F172A`) sections — gradient transitions between them
- **Text**: Dark charcoal on light sections, white on dark sections
- **Accent**: Coral `#FF7E67` for CTAs and highlights

### Typography
- **Headings**: Inter or Space Grotesk (bold, modern, girl-boss energy)
- **Body**: Inter (clean, professional, readable)
- **Accent text**: Playfair Display italic (for quotes or personality moments)

### Animation Philosophy
- Scroll-triggered fade-ins and slide-ups via Framer Motion
- Gradient backgrounds that subtly shift/animate
- The globe spins continuously, interactive on hover/drag
- Timeline slides smoothly with momentum
- Nothing jarring — smooth, confident, polished

---

## Site Structure & Sections

### 1. Hero Section (Dark → Gradient)
- Full viewport height
- Her name **VERONICA FORTUNO SEPUT** in large, bold type
- Animated subtitle that cycles: "Startup Founder" → "International Business" → "World Traveler" → "Community Builder"
- Subtle animated gradient background (pink → purple → blue shifting)
- Scroll-down indicator (animated chevron)
- Small floating badges: 🇮🇹 🇪🇸 🇺🇸 flags

### 2. About Me (Light gradient section)
- Brief, punchy intro paragraph — who she is in her own voice (direct, genuine, positive)
- Key stats in animated counters: "3 Languages" / "10+ Countries" / "4 Club Presidencies" / "1 Startup"
- Personality traits displayed as stylized tags/pills: Direct, Honest, Genuine, Positive, Sweet, Girl Boss
- Photo placeholder (she'll add her photo later)

### 3. Life Journey Timeline (Gradient transition → darker)
- **Horizontal slider** (Embla Carousel) — swipe or click arrows
- Each "card" = a life chapter with:
  - Year range
  - Location (with flag emoji)
  - Title (e.g., "Born in Valencia" / "Rome Years" / "IB Program, Las Vegas")
  - Short description
  - Photo placeholder
  - Highlights/achievements for that period

**Timeline Cards:**
1. **2005** 🇪🇸 Born in Valencia, Spain
2. **2010** 🇮🇹 Moved to Rome, Italy — Attended international school (Cambridge program)
3. **2020** 🇺🇸 Moved to Pahrump, NV — "Tough times, massive growth"
4. **2021-2023** 🇺🇸 Las Vegas — Palo Verde HS, IB Program (International Baccalaureate), President of Hispanic Honor Society (partnered with Spring Preserve & Animal Sanctuary), volunteering
5. **2023-Present** 🎓 UNLV — Double major International Business & Marketing, 4 club presidencies, Gamma Phi Beta, Lee Student Advisory Board
6. **2025** 🚀 RebelBot is born — First startup idea, NSF I-Corps, SDR Training
7. **March 2026** 🏆 RebelBot launches — Won Research Symposium + President's Innovation Challenge
8. **2026** 🌍 Next chapter — Graduating December, moving back to Europe

### 4. RebelBot Spotlight (Dark section with glow effects)
- Dedicated section with RebelBot branding
- What it is: AI-powered student engagement platform
- Key achievements: Research Symposium award, President's Innovation Challenge winner
- "The Exchange" event highlight — photo placeholder showing the event's success
- Links: rebelbot.ai, Instagram, LinkedIn, TikTok (as icon buttons)
- This is the "wow, she built this" moment

### 5. Experience & Leadership (Light gradient section)
- Clean cards/accordion for professional experience:
  - Marketing & Programs Intern — World Affairs Council of Las Vegas (May-Sep 2026)
  - Marketing Lead — Team Casas Mortgage (Oct 2025 - Aug 2026)
  - Admin & Ops Assistant — Davide Tarsi (Jan 2023 - Aug 2025)
  - Sales Associate — DAN Valetudo, Valencia, Spain (Jan 2019 - Present)
- Leadership positions displayed as a visual grid:
  - President, International Business Association
  - President, AI in Business
  - President, Bhakti Yoga Club
  - Secretary, Lee Student Advisory Board
  - President, Hispanic Honor Society (HS)
  - Standards Chair, Gamma Phi Beta

### 6. Languages & Skills (Gradient transition)
- Three large animated "fluent" badges: Italian 🇮🇹 / Spanish 🇪🇸 / English 🇺🇸
- "Currently learning" section with Duolingo-style progress indicators: Russian, Greek, Portuguese, German
- "I learn fast — languages and everything else" tagline
- Skills: AI tools, Canva, Adobe Premiere Pro, Final Cut Pro, digital marketing, etc.

### 7. Travel Globe (Dark section — the showstopper)
- **COBE interactive globe** — spins automatically, user can drag to rotate
- Colored dots/arcs on all places she's been:
  - **USA**: Las Vegas, Utah, San Francisco, LA, San Diego, Yosemite, Death Valley, Grand Canyon, Red Rock, Valley of Fire, Sedona, Arcosanti (AZ), New Mexico, Miami, Texas, NYC, Boston
  - **Mexico**: Puerto Vallarta
  - **Canada**: Toronto, Vancouver
  - **Spain**: Valencia, Madrid
  - **Italy**: Rome, Naples, Gallipoli
  - **Other**: Malta, Corfu (Greece), Dubai, Montenegro, Albania
- Below the globe: a grid of travel photo placeholders with location labels
- Tagline: "I don't just talk about international business — I live it"

### 8. Community (Light section)
- "Building Community in Las Vegas" — narrative about networking, connecting, growing
- Photo grid placeholder for networking events, community involvement
- Volunteer work highlights: Girls on the Run, Spring Preserve, Animal Sanctuary

### 9. Footer / Contact (Dark gradient)
- "Let's connect" with email link (v.fortunoseput@gmail.com)
- LinkedIn icon link
- "Open to travel and relocation opportunities worldwide" — bold statement
- Small animated globe or plane icon
- Download resume button (PDF link)

---

## Project Structure

```
/Resume
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── images/           ← photo placeholders, she adds real photos later
│   │   ├── placeholder.jpg
│   │   └── ...
│   └── resume.pdf        ← downloadable resume
├── src/
│   ├── app/
│   │   ├── layout.tsx     ← root layout, fonts, metadata
│   │   ├── page.tsx       ← main page composing all sections
│   │   └── globals.css    ← Tailwind base + custom gradient animations
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Timeline.tsx         ← horizontal slider with life chapters
│   │   ├── TimelineCard.tsx     ← individual timeline card
│   │   ├── RebelBot.tsx         ← startup spotlight section
│   │   ├── Experience.tsx       ← work & leadership
│   │   ├── Languages.tsx        ← languages & skills
│   │   ├── TravelGlobe.tsx      ← COBE globe + travel grid
│   │   ├── Community.tsx        ← networking & volunteer
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx       ← sticky nav with section links
│   │   └── SectionWrapper.tsx   ← reusable gradient transition wrapper
│   ├── data/
│   │   ├── timeline.ts          ← timeline entries data
│   │   ├── travel.ts            ← travel locations with coordinates
│   │   └── experience.ts        ← work & leadership data
│   └── hooks/
│       └── useScrollAnimation.ts ← shared scroll-trigger hook
```

---

## Implementation Plan (Build Order)

### Phase 1: Project Setup
1. Initialize Next.js 15 project with TypeScript + Tailwind
2. Install dependencies: `framer-motion`, `cobe`, `embla-carousel-react`
3. Set up fonts (Inter, Space Grotesk via next/font)
4. Create base layout, globals.css with gradient keyframes
5. Create `SectionWrapper` component for gradient transitions

### Phase 2: Static Sections (Top to Bottom)
6. Build `Navigation` — sticky top bar with smooth-scroll links
7. Build `Hero` — animated name, cycling subtitle, gradient background
8. Build `About` — stats counters, personality traits, photo placeholder
9. Build `Footer` — contact links, resume download, closing statement

### Phase 3: Data-Driven Sections
10. Create data files (`timeline.ts`, `travel.ts`, `experience.ts`)
11. Build `Timeline` + `TimelineCard` — horizontal Embla carousel
12. Build `Experience` — work cards + leadership grid
13. Build `Languages` — fluency badges + learning indicators

### Phase 4: Wow-Factor Sections
14. Build `TravelGlobe` — COBE globe with location markers + photo grid
15. Build `RebelBot` — startup spotlight with links and event highlight
16. Build `Community` — networking narrative + photo grid

### Phase 5: Polish & Deploy
17. Add all Framer Motion scroll animations across sections
18. Responsive testing (mobile-first — employers might open on phone)
19. SEO metadata (title, description, Open Graph tags)
20. Deploy to Vercel

---

## Verification / Testing

- `npm run dev` — check all sections render, animations work smoothly
- Test horizontal timeline swiping on both desktop and mobile
- Test globe interaction (drag to spin, dots visible)
- Check gradient transitions between sections look seamless
- Test all links (RebelBot site, social media, LinkedIn, email)
- Lighthouse audit: aim for 90+ performance, 100 accessibility
- Test on mobile viewport (375px) — everything must look great on phone
- Deploy to Vercel and verify production build

---

## Photos & Content Strategy

All photo spots will use styled placeholder boxes with labels like "Add photo: The Exchange Event" so Veronica can easily find and replace them. The site will look complete and polished even without photos — the gradients, animations, and content carry it. Photos will elevate it further when added.

---

## Decisions Log

| Date | Decision | Why |
|------|----------|-----|
| 2026-05-21 | Next.js + Vercel | Free hosting, great SEO, React animation ecosystem |
| 2026-05-21 | Bold mixed gradients (pink→purple→blue) | Matches personality — vibrant, creative, unapologetic |
| 2026-05-21 | Gradient transitions between sections | Best of both worlds — professional dark + fun light sections |
| 2026-05-21 | COBE for globe | Lightweight (5KB), spins + interactive, no heavy 3D library |
| 2026-05-21 | Embla Carousel for timeline | Smooth horizontal slider with swipe support |
| 2026-05-21 | No domain purchase | Using free Vercel subdomain |
| 2026-05-21 | No database/Supabase | Pure static site, all content in code |
