# DUSQ design system implementation

2 November 2026. Local exploratory system in branch `codex/dusq-design-system`, separated from BA `main`.

## Implemented

- Kept BA's existing variable collections and alias model. Consolidated the warm neutral ladder under `neutral/*`, redirected aliases from the prior cool/neutral ladders, and removed those duplicate primitives. Changed neutral/0 to `#FAF8F5`, neutral/900 to `#1A1816`, and neutral/950 to `#111111`.
- Mapped `Color Themes/primary/*` to existing orange primitives in both modes. The primary CTA semantic fill uses neutral/900 in Light and neutral/0 in Dark. Existing status families remain distinct.
- Set `Typography` font-family tokens to Display = Plus Jakarta Sans, Title = Helvetica Neue, Body = Arial. Existing font-size and text-scale token values remain unchanged.
- Updated all existing source text styles with candidate font sizes and line heights. Added Legend/Medium at 12 px; Legend/Small remains 10 px. The generated CSS still reads font-family and size tokens. Mobile size differences are emitted as style-level overrides at 767 px and below.
- Added [a local preview page](preview/dusq.html) with images linked directly from `dusq.com`; imagery is not copied into the repository.

## Validation

- `npm run build`, `npm run components`, and `npm run validate` pass. 507 variables compile; 792 aliases resolve; 21 text styles are generated.
- Minimum neutral ladder ratios: +400 = 3.298:1, +500 = 4.52:1, +700 = 8.318:1. Day text/page = 14.4:1; night text/page = 17.81:1; CTA pair = 16.7:1.
- The preview was visually inspected in the browser at desktop size. The two remote images loaded.

## Remaining before calling this production ready

- The website's actual CSS uses Helvetica Neue most broadly, with Arial and limited Plus Jakarta Sans usage. This system's assignment of Plus Jakarta Sans to Display is a design decision requested for consistency, not a claim of exact website parity.
- A production web build needs a confirmed license and font delivery strategy for Helvetica Neue. Plus Jakarta Sans currently loads from Google Fonts in the preview; the production delivery choice remains open.
- BA's button, input, and browser component specs include direct text settings or consume Typography tokens. Review their generated styles and map them to the DUSQ text-style roles for complete system-wide typography parity.
- Check small-screen layout, 2X text reflow, focus states, and semantic contrast across all Light/Dark and contrast-control modes before release.
