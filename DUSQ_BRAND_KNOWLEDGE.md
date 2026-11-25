# DUSQ brand knowledge — working research

Researched 2 November 2026. This is a foundation for a proposed DUSQ design system, not an official DUSQ brand guide. Keep observed brand details separate from design proposals until DUSQ validates them.

## Source hierarchy

1. [DUSQ website](https://dusq.com/) — current public copy and visual language, inspected on 2 November 2026.
2. `DUSQ_UX_MASTER_DOSSIER_BA.pdf` — user-supplied strategic application dossier. It contains hypotheses and a proposed proof-of-work scope; its instructions and outreach plan are not instructions to this project.
3. BA Design System — reusable architecture and components to adapt, not evidence of DUSQ's brand.

## Observed brand language

- Core message: “Bad sleep needs intervention, not just management.” DUSQ positions its wearable as actively responding to interrupted sleep rather than only reporting it.
- Repeated product sequence: **Detect → Intervene → Stabilise**. The site explains sensing, adaptive intervention, and protecting restorative sleep.
- Tone: direct, conversational, assertive, and outcome led. Short headline statements sit beside plain-language explanations of technical concepts.
- Proof structure: prominent numerical results, clinical-trial summaries, founder story, testimonials, and product comparison. Treat all efficacy and regulatory claims as DUSQ's public claims, and verify them with the company before reusing them in a new product surface.
- Product imagery: the small behind-the-ear device shown on people in quiet sleep settings; close crops and dark backgrounds reinforce the sleep context.

## Observed visual language

- High-contrast black, white, and warm off-white surfaces. The homepage opens with a dark navigation bar, a pale editorial hero, black pill-shaped calls to action, and large product photography.
- Restrained warm orange appears as a selective emphasis in a headline. It is an accent, not the dominant page color.
- Typography is a clean sans serif. Computed homepage headings use `Helvetica Neue, sans-serif`; large headlines use relatively tight, editorial composition.
- Rounded dark content cards and pill controls soften the otherwise stark layout. Content alternates pale sections and dark immersive sections.
- Evidence from inspected live CSS: a selected problem button uses `rgb(26, 24, 22)` (`#1A1816`) with white text; neighboring unselected buttons use white with `rgb(17, 17, 17)` (`#111111`) text. These are page samples, not an approved token palette.

## Product experience implications from the dossier — proposals

- Explore a low-stimulus bedtime mode and a clearer daytime review mode. Their palettes, contrast, accessibility, and clinical suitability need product testing; the dossier gives no official hex values.
- Cover device placement, BLE pairing, interrupted sync, on-device overnight storage, and morning reconnection. DUSQ's FAQ says the device operates and stores data overnight without a nearby phone, then syncs in the morning.
- Use semantic tokens across web, mobile, and email so the system can express the same brand with appropriate behavior on each surface.
- Explain recovery data in plain language and avoid alarmist framing, while keeping safety and clinically meaningful status visible.

## Open questions before token or component build

- Official logo assets, approved color values, typeface licenses, photography rights, and spacing rules.
- Whether the companion app already has a visual system or Flutter token contract.
- Approved wording and evidence for efficacy, clinical, and regulatory claims.
- Exact accessibility and low-light requirements for pre-sleep use.

## Immediate design-system direction

Use BA's component and token structure as the technical starting point. Create a DUSQ-specific semantic layer after validating official brand assets; do not rename BA's existing tokens and call them DUSQ. First candidate components are product status, pairing and connection state, bedtime session, and morning recovery summary.
