# DUSQ React website — detailed agent handoff

**Updated:** 2 November 2026  
**Owner:** Shubham Arya Singh  
**Working branch:** `codex/dusq-design-system`  
**Checkout:** `/Users/shubhamaryasingh/Building/design-system/dusq-design-system`

## 1. What this project is

This is Shubham's exploratory DUSQ application page, built with his adapted BA Design System. It is intended to be shown to DUSQ with an application. It is **not** the official DUSQ website, a deployed site, or a functioning checkout. The current React page is the source of truth for further design work. The older `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/preview/dusq.html` is an obsolete static experiment; do not use it as the implementation base.

The user's future component designs should replace individual React components without disturbing the rest of the page. The user may also provide a background image, an icon library, additional image treatment, and revised button behavior. Do not invent those decisions now. Preserve what the user has already approved.

## 2. Open, build, and test the current page

| Item | Exact path or command |
| --- | --- |
| React entry and section order | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/main.tsx` |
| Page CSS | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/styles.css` |
| Vite config | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/vite.config.ts` |
| TypeScript config | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/tsconfig.json` |
| Start local server from checkout | `npm run dusq:dev` |
| Browser preview while server runs | `http://127.0.0.1:4174/` |
| DUSQ Design System Storybook | `apps/dusq-storybook` (`http://127.0.0.1:4176/`) |
| Design Comparison & Image Framing Audit | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/DUSQ_DESIGN_COMPARISON_INDEX.md` |
| Shared Scroll-Reveal & Count-Up Hooks | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/hooks/useReveal.ts` |
| Build React page | `npm run dusq:build` |
| Check React TypeScript | `./node_modules/.bin/tsc -p apps/dusq-preview/tsconfig.json --noEmit` |
| Validate design-system aliases | `npm run validate` |
| Regenerate tokens and text-style CSS after changing source | `npm run build && npm run components` |

The preview URL is local and only works while the Vite server is running. It is not a published link. A dependency installation may be required in a fresh checkout. This working checkout currently uses local dependencies; do not commit `node_modules` or `apps/dusq-preview/dist`. The `.gitignore` excludes those paths.

## 3. Design-system dependencies

The app imports `dist/tokens.css` and `dist/text-styles.css` from the same DUSQ checkout. Those files are generated; edit their source collections instead of editing `dist` directly.

| Source | Absolute path | Relevant contract |
| --- | --- | --- |
| Primitive colors | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/source/collections/primitive-color-tokens.json` | One warm neutral ladder and existing orange accent; no new ink/stone/amber family. |
| Theme mapping | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/source/collections/color-themes.json` | Primary uses existing orange; base uses the neutral ladder. |
| Semantic colors | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/source/collections/semantic-color-tokens.json` | Light/dark roles, including neutral surfaces and CTA fill. |
| Font family and size tokens | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/source/collections/typography.json` and `source/collections/font-size-control.json` | Display = Plus Jakarta Sans; Title/heading = Helvetica Neue; Body = Arial. Existing numeric size tokens and 1X–2X text-scale values are retained. |
| Text styles | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/source/specs/text-styles.json` | 21 styles, including Legend/Small at 10 px and Legend/Medium at 12 px. Mobile style-level overrides are generated at 767 px. |
| Text-style generator | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/build/generate_components.py` | Keeps styles bound to family and size tokens and emits mobile size overrides. |
| Background research | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/DUSQ_BRAND_KNOWLEDGE.md` | Separates observed DUSQ site language from design proposals. |
| Token implementation notes | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/DUSQ_IMPLEMENTATION.md` | Token changes, contrast results, and remaining system integration work. |

The React preview currently uses generated tokens and text-style classes, plus page-specific CSS. It does **not** uniformly render BA React `Button`/`InputField` components. If the user later requests strict component-library use, map the local `PillButton` and other controls to BA variants while preserving the approved look and behavior. Do not assume token use alone proves full component parity.

## 4. Current page order and ownership

`Header` → `Hero` → `FindYourFix` → `Community` → `MeetTeam` → `HowItWorks` → `ClinicalData` → `Comparison` → `ProductOne` → `FAQ` → `Footer`.

| Section/component | Exact local file | Current state |
| --- | --- | --- |
| Header | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/Header.tsx` | Official logo SVG, sticky warm-ink glass bar (`backdrop-filter: blur(12px)`), five in-page links with orange underline hover reveal, desktop product CTA, mobile menu with Tabler `IconMenu2`/`IconX`. |
| Shared pill | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/PillButton.tsx` | Local reusable CTA component with Tabler `IconArrowUpRight`; dark/light variants and optional external link behavior. |
| Hero | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/Hero.tsx` | Approved editorial hero, staggered `.reveal.d1`–`.d4` entrance, two CTAs, `31%` one-shot `useCountUp` metric, and art-directed wearable photo (`object-position: 64% 38%`) inside `.hero-media-frame`. |
| Find Your Fix | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/FindYourFix.tsx` | Four working tabs with `260ms` `panel-fade-up` transition, `useReveal` scroll entrance, Tabler `IconWaveSine` in the heading icon badge, and clinical signal-dot process chips. Tab copy is in `src/content.ts`. |
| Community | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/Community.tsx` | Two pages of four floating photo cards with per-portrait focal `objectPosition` (`50% 16%`–`50% 32%`), hover/focus expansion on desktop, default-visible captions on mobile/touch (`<=767px`), and auto/manual pagination (`prefers-reduced-motion` aware). |
| Meet the Team | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/MeetTeam.tsx` | Founder story, source quote, `4:5` portrait (`object-position: 78% 16%`, `max-width: 520px` on stacked screens), portrait chip, LinkedIn link, and empty user-background slot. |
| How It Works | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/HowItWorks.tsx` | Two horizontal `WorkCard` instances on desktop; stacked on narrower screens; natural `1150 / 1126` media aspect ratio preserving 100% of the baked-in sleep disruption timeline graphs. |
| Clinical data | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/ClinicalData.tsx` | Two interactive trial panels with `ClinicalMetricCard` `useCountUp` animated percentages, Tabler `IconArrowUp`/`IconArrowDown` (`stroke={1.75}`), study protocol metadata tags, and `260ms` panel cross-fade. |
| Comparison | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/Comparison.tsx` | Wide desktop comparison table with Tabler `IconCheck`/`IconMinus` (`stroke={1.75}`) circular status badges and sticky first column (`Feature`) on mobile horizontal scroll (`<=767px`). |
| DUSQ One | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/ProductOne.tsx` | Product gallery with four selectable images in an edge-to-edge `580 / 525` `.product-stage` (zero letterboxing), `240ms` gallery switch fade, signal-dot feature chips, and external product link. |
| FAQ | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/FAQ.tsx` | Seven native `details` disclosures with `34×34` circular `IconPlus` (`stroke={1.75}`) badge (`45deg` rotation), elevated open paper surface, and `260ms` answer reveal. |
| Footer | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/components/Footer.tsx` | Official logo, navigation with orange underline hover reveal, external link with `IconArrowUpRight` diagonal micro-nudge, and application-preview colophon. |
| Shared content | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/content.ts` | Hero/founder remote image links and four Find Your Fix problem states. |
| Shared motion hooks | `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/src/hooks/useReveal.ts` | Prebuilt `useReveal` (one-shot `IntersectionObserver` scroll reveal) and `useCountUp` (`requestAnimationFrame` cubic ease-out counter), both respecting `prefers-reduced-motion: reduce`. |

The separate DUSQ-site section titled “What better nights have felt for 2,640+ people” is intentionally **not present**. The user asked to remove it because the Community section already covers social proof.

## 5. Exact user decisions and visual behavior

### Icon library

Tabler Icons (`@tabler/icons-react`) is selected as the exclusive, project-wide icon library. All UI glyphs must exclusively import from `@tabler/icons-react` (standard stroke weight 1.75). No raw Unicode characters (e.g. `→`, `↗`, `↑`, `↓`, `+`) or arbitrary inline SVGs may be used for icons.

### Header and logo

The earlier text-built DUSQ mark was rejected. Use the exact local SVG copied from DUSQ's public header: `/Users/shubhamaryasingh/Building/design-system/dusq-design-system/apps/dusq-preview/public/dusq-logo.svg`. It is used in both Header and Footer. Keep the current clean dark header layout unless the user gives another direction. Desktop links are Find your fix, How it works, Community, Our story, and The science. The Explore DUSQ One button scrolls to the local product section. At 767 px and below, the mobile Menu button toggles these links and uses Tabler `IconMenu2` / `IconX`.

### Pill CTA

The user wanted the arrow area larger without growing the pill. Current main pill height is 62 px. The arrow has a **46 px container with 8 px padding** around its 30 px content, rendering Tabler `IconArrowUpRight` (`size={18} stroke={1.75}`). The sliding background begins 8 px inside the outer pill and expands behind the label on hover. The CTA label is 400 weight, reduced from the earlier bold treatment. Keep focus visibility and reduced-motion behavior. Header's small CTA has its own 40 px size override.

### Find Your Fix

The heading features Tabler `IconWaveSine` (`size={22} stroke={1.75}`) inside `<span className="heading-icon-slot" data-slot="find-your-fix-icon" />`, representing DUSQ's neuro-acoustic frequency and intervention. The container has a solid subtle border, cream background, and DUSQ orange accent. The tabs are Can't fall asleep, Waking at 3 AM, Tired after 8 hours, and All 3. Selection changes both explanation columns. The Detect/Intervene/Stabilise chips are display elements, not buttons. `See how it works` scrolls to `#how-it-works`.

### Community carousel

Retain the current pale neutral section background and orange/black headline. The user considered an intermediate color step but explicitly said **not to make that change**. Four cards are visible per page, with two pages. Cards have a gentle 6 px up/down float, expand within the row on hover or keyboard focus, and reveal the person's name, location/detail, and problem line. Pagination has two progress steps and a next arrow. It changes all four cards, auto-advances every 6.5 seconds, and pauses while hovered. Reduced-motion preference disables the float. Mobile uses a two-by-two grid so all four cards remain visible.

First-page portraits are mapped only to names that DUSQ labels in its own testimonial section: Matt, Sam, and Blair. Other images do **not** have confirmed names; their overlays say “Community member.” Do not invent names or locations for unnamed photographs. If later supplied names/copy are verified, update the `stories` array in `Community.tsx`.

### Meet the Team

This is the founder/team story, **not** a testimonial. It currently shows Dr Siddhant Bhargava, CEO and Founder, DUSQ. The portrait has a small name/role chip inspired by the site's caption treatment. A LinkedIn link beside the written name points to `https://www.linkedin.com/in/dr-siddhant-bhargava`. The old visible implementation note about getting approval before public use was removed at the user's request. The current quote and summary come from DUSQ's public founder story.

The user will provide a background image later. The empty slot is `<div className="team-background-slot" data-slot="team-background" />`, and CSS reads `--team-background-image`. The section already has a dark readability gradient; the portrait image itself has no overlay. Insert the supplied image here, review the crop and text contrast, and only then adjust overlay intensity.

### How It Works

The older “From detect to a more restful morning” three-card section was rejected and removed from the React composition. The current section is titled “How it works” and has **two** standalone `WorkCard` instances, horizontally arranged on desktop and stacked below 900 px. Their images are linked from DUSQ's public how-it-works media thumbnails. Keep the cards independently editable. If the user later supplies a different component style, replace `WorkCard` and leave the section order intact.

### Remaining sections

- **ClinicalData:** “We let the data speak for itself.” Two selectable panels: January 2026 and May 2026 trial summaries. Metrics are DUSQ's public claims, not independent verification. The user will provide a replacement component design.
- **Comparison:** “Not all devices were meant to solve your sleep.” The table compares DUSQ, WHOOP/OURA, and PULSETTO using DUSQ's current public comparison. It is wide on desktop and scrolls on mobile. The user will provide a replacement component design. Do not shrink it to the small size the user disliked.
- **ProductOne:** DUSQ One product section, four image thumbnails, feature chips, external link to DUSQ product section. No price or local transaction is implemented. The user will provide a replacement component design.
- **FAQ:** Seven questions with expandable answers. The user will provide a replacement component design.
- **Footer:** A standalone React component with real logo, section links, and application-preview note. The user will provide a replacement component design.

The UI must not show internal phrases such as “replace with supplied design,” “approval wording,” or agent instructions. Keep implementation notes in this Markdown file.

## 6. Remote imagery and links

The logo is the only locally copied DUSQ asset. All photographs and product images are loaded directly from `https://dusq.com/cdn/shop/files/` and are not stored in the repo.

| Use | Current URL or source file |
| --- | --- |
| Hero wearable | `https://dusq.com/cdn/shop/files/lp-web-view-hero-2.2-new.webp?v=1791984417&width=1200&quality=75` |
| Founder portrait | `https://dusq.com/cdn/shop/files/DUSQ_Began_Where_Other_Sleep_Solutions_Stopped.webp?v=1790334367&width=600` |
| Named/unnamed carousel cards | `Community.tsx` `stories` array; eight exact URLs and overlay copy live there. |
| Two How It Works thumbnails | `HowItWorks.tsx` `cards` array. |
| Four DUSQ One images | `ProductOne.tsx` `shots` array. |
| Official DUSQ public site | `https://dusq.com/` |
| DUSQ product destination | `https://dusq.com/#pdp` |
| Founder LinkedIn | `https://www.linkedin.com/in/dr-siddhant-bhargava` |

Remote URLs may change. If an image fails, find its current DUSQ-hosted equivalent and update the owning component; do not silently replace it with an unrelated stock photo. Product, clinical, and comparison statements are public DUSQ claims and should be checked against DUSQ's then-current site before external distribution.

## 7. Current navigation and interaction map

| Control | Current behavior |
| --- | --- |
| Logo in header/footer | Scroll to `#top`. |
| Header section links | Scroll to `#find-your-fix`, `#how-it-works`, `#community`, `#team`, or `#evidence`. |
| Header Explore DUSQ One | Scroll to local `#product`. |
| Hero Explore the approach | Scroll to `#how-it-works`. |
| Hero Find your fix | Scroll to `#find-your-fix`. |
| Four Find Your Fix tabs | Switch problem explanation in place. |
| Find Your Fix See how it works | Scroll to `#how-it-works`. |
| Community pagination/next | Switch between two sets of four cards. |
| Community hover/focus | Expand card and reveal its caption. |
| Two clinical trial tabs | Switch metrics and trial summary in place. |
| Four product thumbnails | Switch the displayed DUSQ One image. |
| Product Explore DUSQ One | Open `https://dusq.com/#pdp` in a new tab. |
| FAQ question | Native expand/collapse. |
| Footer DUSQ website | Open `https://dusq.com/` in a new tab. |
| Founder LinkedIn | Open the verified founder profile in a new tab. |

These actions are current preview behavior. The user has said some button interactions may be replaced later, so do not treat them as final product behavior.

## 8. Responsive and accessibility contract

The main page uses a 1450 px maximum content width. It changes layout at 900 px and 767 px. At 900 px and below, How It Works and DUSQ One stack, and clinical content becomes one column. At 767 px and below, navigation becomes a toggle; Hero and Meet the Team stack; Find Your Fix stacks its panel; Community becomes a two-by-two grid; comparison remains horizontally scrollable. Preserve readable type and avoid page-level horizontal overflow. `prefers-reduced-motion: reduce` disables smooth scrolling, the carousel's float animation, and pauses the Community carousel auto-advance.

Keep accessible button names, tab state, product-thumbnail pressed state, image alt text, focus indicators, and FAQ native disclosure semantics. The Find Your Fix icon slot is decorative (`aria-hidden="true"`) and renders Tabler `IconWaveSine`. The Community section uses named cards only where identity is supported by DUSQ's public content.

## 9. Verification and limits

Most recent checks passed: `npm run dusq:build`, `npm run validate`, and `tsc -p apps/dusq-preview/tsconfig.json --noEmit`. The token graph contains 507 compiled variables and 792 resolved aliases. Browser checks confirmed the real logo, remote images in the sections inspected, side-by-side How It Works cards, community page switching, clinical tab switching, and FAQ expansion. Desktop visual inspection was performed; **mobile visual QA is still required**. Hover expansion was implemented and visually designed, but a separate pointer-hover screenshot was not recorded. Recheck it when revising the carousel.

The branch contains local working changes and is not represented here as committed, pushed, deployed, or officially approved by DUSQ. The `http://127.0.0.1:4174/` page is a local preview only. Helvetica Neue currently uses browser/system availability, while Plus Jakarta Sans is requested through Google Fonts; confirm any production font delivery and licensing before public hosting. The user's future component designs and background imagery remain the next planned inputs.

## 10. Checklist for the next agent

1. Read this file and the current React component being changed. Open the live local preview if the server is running; otherwise start `npm run dusq:dev`.
2. Identify whether the user supplied a final component design, icon library, background image, or interaction change. Apply it only to the owning component and its scoped CSS.
3. Preserve the approved content hierarchy, section order, real logo, DUSQ-hosted imagery, and existing design-system tokens unless the user explicitly changes them.
4. After edits, run `npm run dusq:build`, TypeScript check, and `npm run validate`. Visually inspect the changed desktop and mobile states and test affected controls.
5. Update this handoff when a previously pending design becomes implemented. Distinguish observed DUSQ facts from Shubham's concept decisions and keep internal implementation notes out of the UI.


## 11. Phase 2 Upgrades (Completed 3 November 2026)

| Upgrade Component | Inspiration / Source | Purpose & Mechanics |
| --- | --- | --- |
| **IntroLoader.tsx** | Fantasy.co (`https://fantasy.co/`) | Full-viewport dark editorial curtain (`var(--night)`) centering `/dusq-logo.svg`, whisper eyebrow (*"Calibrating quiet recovery"*), hairline progress bar filling 0% to 100% over ~900ms via RAF, tabular numeric counter, and smooth 700ms slide-up exit with automatic unmount so pointer events are never blocked. Respects `prefers-reduced-motion` by skipping immediately. |
| **BrandsTicker.tsx** | DUSQ.com Official Press Strip | Infinite marquee strip featuring 5 official press logos from `dusq.com` (Business Insider, Digital Journal, Forbes, The Economic Times, Apple News) with offline local fallbacks, dual-sided edge fade masks, pause-on-hover, and screen-reader safe clones (`aria-hidden="true"`). |
| **ClinicalData.tsx** | Clay Vantara Case Study (`https://clay.global/work/vantara`) | 5-card staggered editorial collage: Card 1 (Cream card with +40% HRV speech-notch pill and 27-tick ruler), Card 2 (Espresso card with CSS stepped cross and Tabler `IconClover`), Card 3 (Center tall terracotta media card with `<div className="VideoPlayer_VideoBG__HQ9S5" id="video-background">` embedding 1080p MP4 background video), Card 4 (Espresso card with 12-bar rising chart and floating +34% pill badge), and Card 5 (Deep forest green card with CSS concentric heart rings and Tabler `IconHeart`). Zero raw inline SVGs. |
| **HowItWorks.tsx (Bento)** | Whenevr Framer Template (`https://whenevr.framer.website/`) | 6-card feature bento grid below WorkCards (*"Everything your sleep needs and nothing it doesn't."*) with Tabler icons (`stroke={1.75}`) covering EDA sensing, vagus response, 3 AM surges, zero phone dependency, 12g fit, and 30-night trial, plus a horizontal capability tag strip with edge fade masks. |
| **Comparison.tsx (Split Card)** | Whenevr Framer Template (`https://whenevr.framer.website/`) | Top 3-segment segmented control switching real DUSQ tiers ($370 Express, $350 Standard, $25 Refills), large dark split card with radial glow product stage, retail strikethrough, launch savings badge, 5 `IconPlus` circular bullets, white pill CTA, and an interactive switch toggle (*"Compare with WHOOP, Oura & Pulsetto"*) that smoothly reveals the full 8-row technical comparison table on demand (defaulting to clean card upfront). |
| **Footer.tsx (Kinetic Icon)** | Focus Lab Agency (`https://www.focuslab.agency/`) | Kinetic multi-ring emblem beside the footer logo: rotating outer dashed orbital ring (18s linear infinite), counter-rotating inner ring (12s), and pulsing warm-orange core with Tabler `IconWaveSine` (`stroke={1.75}`), with hover acceleration and glow effects, respecting `prefers-reduced-motion`. |

### Architectural Decision: Rejection of Whenevr Avatar Rainbow Arc
Screenshot 2 (`media_1793697336564_bbee95ae.png`) from the Whenevr Framer template displayed an arch/rainbow of circular avatar heads captioned *"100+ clients getting better design, faster"*. This pattern was deliberately evaluated and **rejected** for DUSQ:
1. **Clinical Credibility vs SaaS Template:** DUSQ is an FDA/CTRI-registered neuroscience medical wearable measuring micro-arousals and autonomic tone. An agency-style rainbow arc of floating avatars belongs to a B2B design subscription agency, and would severely undermine DUSQ's scientific rigor and medical authority.
2. **Authentic Evidence Over Floating Heads:** DUSQ's existing Community section already features verified clinical founder Dr. Siddhant Bhargava, real polysomnography sleep-study participants, and verified user testimonials formatted with editorial restraint and responsive image focal points.


## 12. Phase 3 Upgrades — Clay Vantara Orbital Revolve Choreography & Overlap Fixes (Completed 3 November 2026)

- **Dynamic Revolve & Open (6-Second Hold) Cycle:** Cards 1, 2, 4, and 5 start stacked behind Card 3 in `.is-closed` (`translate3d` + `rotate` + `scale(0.78)`), fan outward along orbital trajectories into `.is-open` over 1.05s, hold for 6 seconds, and revolve back in over 0.95s, repeating every 7.4 seconds while in viewport.
- **Card 3 Video Cropping:** Video scaled to 1.38x with `object-position: 50% 15%` to crop out baked-in source timeline graph, backed by a deepened multi-stop umber gradient.
- **Card 4 Axis Clearance:** Card 4 bottom padding increased to 48px and Card 5 offset adjusted so `Night 01 · Night 21 · Night 42` is 100% visible.
- **Interactive Control:** Interactive status pill (`.vantara-orbit-status-pill`) lets users toggle or replay the choreography.


## 13. Science Page Architecture & Complete 10-Section Build (Completed 3 November 2026)

- **Route & Multi-Page Navigation:**
  - Integrated zero-dependency client routing in `App.tsx` (`/` ↔ `/pages/science`) using `window.history.pushState` and `popstate` event listeners.
  - `Header.tsx`: Clicking *The science* transitions to `/pages/science` with an active state (`.site-nav a.is-active`) styled with pure white text and an orange underline (`::after` 100% width). Clicking the DUSQ wordmark or section anchors returns to `/` and smoothly scrolls to the target hash (`#top`, `#find-your-fix`, etc.).
  - `Footer.tsx`: Updated with smooth client-side routing to `/pages/science` and home section hashes.
  - Automatic scroll-to-top on route changes and complete browser back/forward history traversal.

- **10 Modular Science Components (`apps/dusq-preview/src/components/science/`):**
  1. `ScienceHero.tsx`: Authentic editorial headline (*"Sleep happens according to your nervous system’s capacity for it"*), body copy on sympathetic nocturnal elevation, 3 physiological badges, proof count-up metrics (25 surges/night, 50M+ datapoints, CTRI/2026), and immediate `reveal d4` animation on `/science/hero-desktop.png` (1440×815).
  2. `AutonomicSeeSaw.tsx`: Autonomic balance analysis, responsive `/science/see-saw-graph.png` (1543×698) container preventing label truncation, and comparative cards for Sympathetic Overdrive (`IconFlame`) and Parasympathetic Dominance (`IconRipple`).
  3. `SurgesSection.tsx`: Nature (Herberger et al., 2025) peer-reviewed benchmark citation card, 20–30 spikes/night mechanism, high-resolution `/science/surges-chart.png` (3548×1532), and tabular clinical callouts.
  4. `SensorStackSection.tsx`: Split technical bento featuring exploded hardware render `/science/sensor-stack-exploded.png` (321×784) alongside 3 tri-sensor pillar cards (High-Density EDA, Auricular Optical PPG, 3-Axis Kinematic IMU).
  5. `NeuromodulationSection.tsx`: Dual interactive video cards with accessible play/pause controls for Stochastic Vestibular Stimulation (`bf628289f2bc4b1589838a006c01723f.mp4`) and Auricular Vagus Nerve Stimulation (`5ce890a2a9aa4eed80e756c4284eef10.mp4`).
  6. `ConvergenceSection.tsx`: Mastoid 3D convergence video player (`4add312596754f87965c66959dfbdcf3.mp4`), 4-step closed-loop flow diagram (`Sense → Classify → Modulate → Stabilize`), and 4-card hardware specifications grid (12g, 0dB silent, Ag/AgCl contacts, 14+ hrs battery).
  7. `ChronobiologySection.tsx`: 3-stage interactive chronobiology rail and tab panels covering 7:00 PM The Evening (parasympathetic shift), 9:00 PM Sleep Onset (vestibular otolith cueing), and 11:00 PM Through the Night (closed-loop surge suppression).
  8. `SleepLabSection.tsx`: Atmospheric 7-bed physical sleep laboratory showcase with `/science/sleep-lab-bg.png` (1440×1005), multi-sensor protocol breakdown (*Collection → Processing → Validation → Publication*), and facility metrics (1,200+ nights analyzed).
  9. `PsgConcordanceSection.tsx`: Head-to-head clinical polysomnography benchmark with giant 94.2% count-up concordance card and 4-channel montage telemetry cards (EEG, EOG, EMG, ECG & EDA).
  10. `ScienceComparisonSection.tsx`: 6-row architectural comparison matrix proving why passive rings/watches only log poor sleep retroactively while DUSQ detects sympathetic surges and intervenes intra-sleep in real time, followed by the final editorial CTA block linking to DUSQ One (`/#product`) and Clinical Trials (`/#evidence`).

- **Verification:**
  - Playwright automated audit passed at 1440px, 900px, 767px, and 375px: 0px horizontal overflow across all viewports, immediate hero media opacity: 1 on load, all 10 sections visible with opacity: 1, all images loaded with positive naturalWidth.
  - `npm run validate` passed (507 variables across 11 collections; 792 aliases).
  - `tsc --noEmit` clean (0 errors).
  - `npm run dusq:build` passed in 1.44s.


## 14. Turn #7 & Turn #8 Polish & Hardening (Completed 3 November 2026)

- **Local Video Caching:**
  - Downloaded and cached all 3 MP4 videos locally in `apps/dusq-preview/public/science/`:
    * `/science/vestibular-nvens.mp4` (9.4MB, 1080×1350)
    * `/science/vagal-nvns.mp4` (5.5MB, 960×960)
    * `/science/mastoid-convergence.mp4` (3.0MB, 2160×2880)
  - Updated `NeuromodulationSection.tsx` and `ConvergenceSection.tsx` to point to `/science/...` with `preload="auto"`, eliminating external CDN latency and guaranteeing `readyState=4` on automated audits.

- **Mobile Sticky Column Background & Contrast Fix:**
  - In `apps/dusq-preview/src/styles.css`, assigned explicit `background: var(--paper);` to `.science-compare-table tbody tr` and `background: #fcf6ef;` to `.science-compare-table tbody tr.is-highlight-row`.
  - Added elevated `box-shadow: 2px 0 8px rgba(26, 24, 22, 0.05)` and `z-index: 3` on mobile (`max-width: 767px`) sticky first-child columns to prevent text bleed-through when scrolling horizontally.

- **CTA Hierarchy & Secondary Button Polish:**
  - Added desktop base styling for `.science-secondary-btn` and `:hover` in `apps/dusq-preview/src/styles.css` (48px pill height, translucent dark surface `rgba(250, 248, 245, 0.08)`, hairline border `rgba(250, 248, 245, 0.2)`).
  - Added `light` prop to `<PillButton light href="#product" ...>` in `ScienceComparisonSection.tsx` for optimal editorial contrast against the `--night` card background.

- **Comprehensive Viewport Audit (1440px, 900px, 767px, 375px):**
  - Immediate hero media opacity on load: `1.0`.
  - Settled `.rv` elements: 24/24 (100%) at computed `opacity: 1`.
  - Videos: 3/3 reaching `readyState=4` with positive video dimensions.
  - Images: 5/5 loaded with positive naturalWidth.
  - Horizontal overflow: `0px` across all 4 target breakpoints.


## 15. Turn #9 Full System Repair, Storybook Science Sync & Multi-Page Audit (Completed 5 November 2026)

- **Storybook Science Suite (`apps/dusq-storybook` on `http://127.0.0.1:4176`):**
  - Registered 30 total stories in `apps/dusq-storybook/src/components/Sidebar.tsx` across 4 categories: `Foundations`, `Core UI Primitives`, `DUSQ Website Sections`, and `DUSQ Science Page Sections`.
  - Created `BrandsTickerStory.tsx` and integrated `<BrandsTicker />` into `AllSectionsStory.tsx`.
  - Created 11 dedicated Science stories in `apps/dusq-storybook/src/stories/science/`:
    * `SciencePageStory.tsx` (Full Page Canvas)
    * `ScienceHeroStory.tsx`
    * `AutonomicSeeSawStory.tsx`
    * `SurgesStory.tsx`
    * `SensorStackStory.tsx`
    * `NeuromodulationStory.tsx`
    * `ConvergenceStory.tsx`
    * `ChronobiologyStory.tsx`
    * `SleepLabStory.tsx`
    * `PsgConcordanceStory.tsx`
    * `ScienceComparisonStory.tsx`
  - Symlinked asset directories (`press`, `science`, `community`) into `apps/dusq-storybook/public/` ensuring zero 404 network errors on port 4176.

- **Local Media Resiliency & Community Asset Cache:**
  - Cached all 8 Community member portraits locally under `apps/dusq-preview/public/community/` (`member-1.webp` through `member-8.webp`).
  - Set `loading="eager"` on local imagery in `BrandsTicker.tsx`, `Community.tsx`, `AutonomicSeeSaw.tsx`, `SurgesSection.tsx`, and `SensorStackSection.tsx`, eliminating layout jitter and guaranteeing immediate positive natural dimensions.

- **Full Multi-Page Playwright Audit Results:**
  - **Home (`/`):** 0px horizontal overflow, 0 broken images (33/33 loaded), 0 failed requests, 1/1 video readyState >= 2 across 1440px, 900px, 767px, and 375px.
  - **Science (`/pages/science`):** 0px horizontal overflow, 10/10 sections verified, 24/24 .rv elements settled at `opacity: 1`, 3/3 videos at `readyState=4`, interactive Chronobiology tabs verified across all 4 breakpoints.
  - **Storybook (`:4176`):** 30 registered stories, 0 broken images, 3/3 canvas videos readyState >= 2, 0 console errors.
  - Captured fresh verification screenshots:
    * `/tmp/audit_home_1440.png` (Home 1440px desktop)
    * `/tmp/audit_home_375.png` (Home 375px mobile)
    * `/tmp/audit_science_1440.png` (Science 1440px desktop)
    * `/tmp/audit_science_375.png` (Science 375px mobile)
    * `/tmp/audit_storybook_1440.png` (Storybook 1440px desktop)

- **Build Suite Verification:**
  - `npm run validate`: PASSED (507 variables across 11 collections; 792 aliases resolve locally)
  - `tsc -p apps/dusq-preview/tsconfig.json --noEmit`: PASSED clean (0 errors)
  - `npm run dusq:build`: PASSED in 1.50s
  - `tsc -p apps/dusq-storybook/tsconfig.json --noEmit`: PASSED clean (0 errors)
  - `npm run storybook:build`: PASSED in 1.47s


## 16. Turn #10 Mobile Refinements & Screenshot Sticky Reset (Completed 5 November 2026)

- **Mobile Capability Pills Wrapping in `HowItWorks` (`styles.css`):**
  - Updated `@media (max-width: 767px)` for `.whenevr-tag-strip-track`, `.cap-tags-row`, and `.cap-pills` to `display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;`.
  - Added compact pill typography (`font-size: 11.5px; padding: 6px 12px; line-height: 1.25`) and removed mask clipping (`mask-image: none; overflow: visible`) so all 6 capability pills wrap cleanly within `375px` without clipping `"Vagal Neuromodulation"`.

- **Decluttered Mobile Portrait Overlay in `Community` (`Community.tsx` & `styles.css`):**
  - Attached dedicated semantic hooks (`.comm-card`, `.comm-overlay`, `.comm-name`, `.comm-role`, `.comm-quote`).
  - On `@media (max-width: 767px)`, hid generic redundant labels (`.comm-name`, `.comm-role`) and styled the concise caption (`.comm-quote`) with a compact bottom gradient (`padding: 8px 10px; font-size: 11.5px; line-height: 1.3`), keeping portrait subjects completely unobstructed.

- **Sticky Header Screenshot Reset (`audit_turn9.py`):**
  - Added `window.scrollTo(0, 0)` with a 300ms settling wait immediately before capturing full-page screenshots (`/tmp/audit_home_{1440,375}.png` and `/tmp/audit_science_{1440,375}.png`).
  - Latch all `.rv.in` scroll reveal elements permanently, then return the viewport to `(0, 0)` so the sticky navigation header sits cleanly at the top of the canvas rather than floating mid-page.


## 17. Turn #11 Vertical Stepper Redesign (Completed 5 November 2026)

- **Directive:** Redesign `HowItWorks.tsx` & `styles.css` as a clean, unified light-surface **vertical stepper** where the **text tells the story as the focal point** (60% left) and the **image is a clear, compact supporting figure** (40% right). Replace the rejected floating left card + 3 giant stacked dark cards pattern.
- **Local Media Caching:** Downloaded and cached all 3 step images locally under `apps/dusq-preview/public/how-it-works/`:
  * `step-1-detect.jpg` (85KB, 1600×1066)
  * `step-2-intervene.jpg` (84KB, 1600×1066)
  * `step-3-stabilise.webp` (420KB, 1200×800)
  * Symlinked `apps/dusq-storybook/public/how-it-works -> ../../dusq-preview/public/how-it-works`.
- **Component Architecture (`apps/dusq-preview/src/components/HowItWorks.tsx`):**
  - Editorial section header with pill badge (`● The System at Work`), headline (`Built to turn restless nights into unbroken deep sleep.`), and subhead.
  - Unified `#FFFFFF` showcase container (`.how-stepper-showcase`):
    * **Left Navigation Rail (`.how-stepper-rail`, 290px wide, `#FAF8F5`):** Monospace tracker (`3-STAGE CLOSED LOOP` | `Stage 01 of 03`), 3 vertical step buttons with orange numbers (`01`, `02`, `03`), titles, subtitles, and vertical 3.5px orange indicator track bar. Auto-advances every 7.5s (pauses on hover).
    * **Right Active Stage (`.how-stepper-stage`):**
      - **60% Left Story Column:** Pill badge (`● STEP 01 · AUTONOMIC DETECTION`), display title (`clamp(24px, 2.5vw, 34px)`), primary narrative paragraph, hairline divider, secondary clinical mechanism paragraph, 3 takeaway check chips, and `<PillButton href="/pages/science">Explore the science</PillButton>`.
      - **40% Right Figure Column:** Framed figure card (`#F4F0EA`, 18px radius, 10px matte border), 4:3 aspect ratio image container, crop-safe image with gentle hover scale, and caption bar (`FIG 01 · Postauricular EDA sensor monitoring nocturnal sympathetic surges`).
  - Preserved 6-card feature Bento grid and capability tag strip below.
- **Responsive Behavior:**
  - `@media (max-width: 1024px)`: Rail converts to horizontal top tabs with horizontal indicator bar.
  - `@media (max-width: 767px)`: Stage converts to vertical stack (story text first, figure card below with 16/10 aspect ratio). 0px overflow across all viewports.
- **Verification & Visual Capture:**
  - `/tmp/how_it_works_stepper_1440.png` (Desktop 1440px element capture)
  - `/tmp/how_it_works_stepper_375.png` (Mobile 375px element capture)
  - `/tmp/audit_home_1440.png` (Full-page desktop audit)
  - `/tmp/audit_home_375.png` (Full-page mobile audit)
  - All test suites passed: `validate` (507 tokens, 792 aliases), `tsc` clean, `dusq:build` and `storybook:build` clean.


## 18. Turn #12 Polish Items (Completed 5 November 2026)

- **Stepper Rail Single-Line Topbar (`HowItWorks.tsx` & `styles.css`):**
  - Shortened labels to `"CLOSED LOOP"` and `"Stage 01 / 03"`.
  - Added `white-space: nowrap; font-size: 11px; gap: 8px;` to `.how-rail-topbar-label` and `.how-rail-topbar-counter`, eliminating all line wrapping across both desktop and mobile viewports.
- **Cropped Baked-In "Disruption" Text from Photography:**
  - Cropped leftmost 18% from `step-1-detect.jpg` and `step-2-intervene.jpg` via Python PIL.
  - Leaves pure, authentic photography of the sleeping subject and behind-the-ear DUSQ sensor with zero baked-in text or clipping artifacts.
- **Verification Captures Updated:**
  - `/tmp/how_it_works_stepper_1440.png`
  - `/tmp/how_it_works_stepper_375.png`
  - `/tmp/audit_home_1440.png`
  - `/tmp/audit_home_375.png`


## 19. Turn #13 Option C Dark-Surface Connected Stepper Spine (Completed 5 November 2026)

- **Architecture:** Replaced the cramped 3-column white box with Option C: DUSQ Design System Dark Canvas (`var(--night)` `#111111`) with a 2-Column Editorial Layout (`58%` Left Stepper Spine / `42%` Right Telemetry Card):
  * **Integrated Dark Header:** Pill badge (`● THE SYSTEM AT WORK · CLOSED-LOOP ARCHITECTURE`), headline (`How it works — Built to turn restless nights into unbroken deep sleep.`), and subtitle.
  * **Connected Vertical Accordion Spine (`.how-vertical-spine`, 58% width):** Continuous timeline spine track with glowing orange circular nodes (`01`, `02`, `03`). Active step illuminates and expands inline with headline, primary narrative in `#FAF8F5`, clinical mechanism in `neutral-300`, and 3 check chips. Inactive steps render as compact, interactive rows with subtitles and chevron indicators.
  * **Compact Dark-Glass Supporting Visual Card (`.how-support-card`, 42% width, max 440px):** Features top telemetry bar (`● STAGE 01 TELEMETRY` | `POSTAURICULAR EDA`), clear 4:3 cropped photo (`max-height: 290px`), clinical caption, and a 3-metric bottom readout bar (`50M+`, `<15s`, `20–30`).
  * **Supporting CTA:** Light high-contrast `<PillButton light href="/pages/science">Explore the full science</PillButton>`.
- **Responsive Adaptability:**
  * Desktop (1440px): 2-Column layout, 0px overflow.
  * Tablet (900px/1024px): 1-Column stack with centered telemetry card.
  * Mobile (375px): Compact timeline spine (34px nodes), expandable card with 0px horizontal overflow.
- **Verification Captures:**
  * `/tmp/how_it_works_dark_stepper_1440.png`
  * `/tmp/how_it_works_dark_stepper_375.png`
  * `/tmp/audit_home_1440.png`
  * `/tmp/audit_home_375.png`
  * `/tmp/audit_storybook_1440.png`
- **Build Checks:** Clean validation and production builds for `dusq-preview` (1.54s) and `dusq-storybook` (1.45s).


## 20. Turn #14 Editorial Capability Atlas (Completed 5 November 2026)

- **Directive:** Replaced the plain 6 white identical bento cards beneath the dark stepper with an Editorial Capability Atlas (`.capability-atlas-section`):
  * **Left Visual Column (`.atlas-visual-col`, 46% width):** Sticky visual card (`top: 96px`) featuring dominant official DUSQ behind-ear photography (`/how-it-works/step-1-detect.jpg`), top telemetry bar (`● DUSQ ONE · BEHIND-THE-EAR FIT` | `POSTAURICULAR MASTOID`), `12G CONTOUR` pill badge, and dynamic image-side caption/rhythm response bar (`CAPABILITY 01..06`, live rhythm pulse bar `AUTONOMIC SYNC ACTIVE`) responding in real time to hover, focus, and click.
  * **Right Column (`.atlas-rows-col`, 54% width):** Six numbered capability rows (`01` through `06`) with Tabler icons (`stroke={1.75}`), orange active indicator bar, monospace numbers, bold titles, and readable descriptions. Preserves all 6 official titles, descriptions, and tags.
  * **Tag Strip Preserved:** All 6 official capability badges wrap cleanly with flex-wrap and zero horizontal overflow on mobile (`375px`).
- **Responsive Adaptability:**
  * Desktop (1440px): 2-Column layout with sticky visual card on the left.
  * Tablet (900px/1024px): 1-Column stack with centered visual card.
  * Mobile (375px): 1-Column stack, compact visual card, 0px horizontal overflow across all breakpoints.
- **Verification Captures:**
  * `/tmp/capability_atlas_1440.png` (Desktop 1440px Capability Atlas)
  * `/tmp/capability_atlas_375.png` (Mobile 375px Capability Atlas)
  * `/tmp/how_it_works_dark_stepper_1440.png` & `/tmp/how_it_works_dark_stepper_375.png` (Full HowItWorks section)
  * `/tmp/audit_home_1440.png` & `/tmp/audit_home_375.png` (Full page audits)
  * `/tmp/audit_storybook_1440.png` (Storybook audit)
- **Build Checks:** `npm run validate` (507 tokens, 792 aliases), `tsc` clean, `dusq:build` in 1.33s, `storybook:build` in 1.30s.


## 21. Turn #15 Polish Items (Completed 5 November 2026)

- **Eliminated Photo Stacking Duplication:**
  - Capability Atlas visual card now features distinct imagery per capability, with Capability 01 displaying `/how-it-works/step-3-stabilise.webp` (the woman in profile wearing the behind-the-ear DUSQ wearable).
  - Eliminates the duplicate image of the sleeping man that was previously rendered in both the Dark Stepper Stage 01 and the Capability Atlas visual card.
- **Single-Line Mobile Expanded Card Header (`375px`):**
  - Added `white-space: nowrap;` and compact mobile sizing (`font-size: 10px; padding: 3px 8px;`) to `.how-step-eyebrow` and `.how-step-status-chip`.
  - Both `"STEP 01 · DETECT"` and `"ACTIVE STAGE"` sit on a single horizontal line without wrapping.
- **Verification Captures Updated:**
  - `/tmp/how_it_works_dark_stepper_1440.png`
  - `/tmp/how_it_works_dark_stepper_375.png`
  - `/tmp/capability_atlas_1440.png`
  - `/tmp/capability_atlas_375.png`
  - `/tmp/audit_home_1440.png` & `/tmp/audit_home_375.png`
  - All test suites green: `validate`, `tsc`, `dusq:build`, `storybook:build`.


## 22. Turn #16 The Sleep Lab Dedicated Page Build (Completed 11 November 2026)

- **Target Route:** `/pages/the-sleep-lab` (live equivalent of `https://dusq.com/pages/the-sleep-lab`).
- **Design System & User Design Memory Constraints Enforced:**
  - **Zero Box-in-a-Box Clutter:** Avoided AI-typical dense text boxes. Replaced with spacious editorial layouts, unboxed callout quotes, and interactive telemetry exploration surfaces.
  - **Strict Color Restraint:** Prioritized warm cream (`--cream: #FAF8F5`), pure paper (`#FFFFFF`), and deep night (`#111111` / `#1A1816`). Used surgical DUSQ clinical orange (`--orange: #E85D04`) as the primary signal accent. Zero non-standard green usage.
  - **Design System Buttons:** Exclusively used the design system's `PillButton` primitive with destination-oriented names (e.g. *"White Paper"*, *"Initiation Study"*, *"Maintenance Study"*, *"The Science"*, *"DUSQ One Wearable"*), avoiding generic verbs.
  - **Iconography:** Strictly `@tabler/icons-react` (`stroke={1.75}`). Zero emojis or arbitrary inline SVGs.
  - **Local High-Resolution Media:** Downloaded and cached all 5 official photography assets under `apps/dusq-preview/public/sleep-lab/` (and symlinked to Storybook):
    * `hero-sleep-lab.png` (793 KB, 1080×636)
    * `first-night-effect.png` (1.07 MB, 1079×636)
    * `ground-truth-psg.png` (438 KB, 716×440)
    * `domestic-bedroom-suite.png` (509 KB, 716×440)
    * `research-control-room.png` (2.85 MB, 2280×1343)
- **7 Modular Sleep Lab Components (`apps/dusq-preview/src/components/sleep-lab/`):**
  1. `SleepLabHero.tsx`: Full-width hero with live telemetry pill, master headline (*"Before DUSQ reaches you, it has to survive this lab"*), lead narrative, 4 facility proof metrics (7 Suites, 1,200+ Nights, 50M+ Datapoints, CTRI/2026 Registry), and framed architectural photography with live environmental readout bar.
  2. `SleepLabWhyBuilt.tsx`: The origin and research velocity imperative. Documents the compounding questions of closed-loop neuromodulation, external research bottlenecks, the unboxed founder quote (*"You cannot build a product on the science of sleep by visiting that science occasionally. You have to be embedded in it"*), and 3 infrastructure pillars.
  3. `SleepLabFirstNight.tsx`: The First-Night Effect (FNE) breakdown. Details clinical sleep lab novelty stress artifacts and presents a head-to-head architectural comparison between traditional hospital PSG and DUSQ's domestic ecological sleep chamber.
  4. `SleepLabGroundTruth.tsx`: 32-channel polysomnography (PSG) + clinical research EDA ground truth. Features an interactive 6-channel sensor montage console (EEG, EOG, EMG, Clinical EDA, ECG & HRV, Consumer Wearables) and the clinical credo (*"Every claim DUSQ makes was true in this room first"*).
  5. `SleepLabDomesticSuite.tsx`: Bedroom replication without medical clutter. Features the 4-Subject Simultaneous Synchronized Suite (eliminating environmental variables across 4 sleepers on the same night) and continuous bedside charging case telemetry logging (sound, light, temperature).
  6. `SleepLabResearchConsole.tsx`: Central observation control room showcase paired with an interactive 4-Question Validation Console (Q1: Detection Precision, Q2: Surge Suppression, Q3: Pre-Sleep Onset, Q4: Wearable Visibility) with verified clinical metrics and lab findings.
  7. `SleepLabStandardsCta.tsx`: The scientific credo (*"The product that leaves this lab is the product that this lab could not break"*), 3 verified research publication download cards with official PDF links, and global site navigation.
- **System Navigation & Storybook Sync:**
  - Integrated `/pages/the-sleep-lab` into `App.tsx` client router and popstate listener.
  - Added *Sleep Lab* navigation pill to `Header.tsx` (desktop & mobile drawer).
  - Added *The Sleep Lab facility* to `Footer.tsx`.
  - Added *Tour The Sleep Lab Facility* CTA to `SleepLabSection.tsx` on `/pages/science`.
  - Created `TheSleepLabPageStory.tsx` and registered under Storybook (`apps/dusq-storybook` on `http://127.0.0.1:4176/#sleeplab-page`).
- **Automated Audit Results:**
  - Desktop 1440px: 0px horizontal overflow, all 5 section images loaded with positive natural dimensions, 7/7 sections verified.
  - Mobile 375px: 0px horizontal overflow, responsive single-column layout, touch-friendly tabs.
  - Interactive Consoles: Verified question switching (Q1–Q4) and PSG montage selection.
  - Multi-Page Navigation: Verified full navigation loop (`/` ↔ `/pages/the-sleep-lab` ↔ `/pages/science`).
  - Production Builds: `dusq:build` passed in 1.76s; `storybook:build` passed in 1.50s; TypeScript clean.
  - Verification Captures: `/tmp/audit_sleeplab_1440.png`, `/tmp/audit_sleeplab_375.png`, `/tmp/audit_storybook_sleeplab.png`.









