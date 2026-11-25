> Historical proposal. The accepted implementation and current status are in [DUSQ_IMPLEMENTATION.md](DUSQ_IMPLEMENTATION.md). Some proposed details below were superseded by the user's font-family and legend decisions.

# Revised DUSQ token proposal

2 November 2026. Proposal only; DUSQ has not supplied official token files. This replaces the earlier ink/stone/ember proposal. Reuse BA's existing primitive IDs and semantic architecture in the isolated branch.

## Existing system and cross-mapping

BA has 20-step `neutral`, `cool`, and `warm` primitive ladders; 10-step orange, blue, green, red, purple, teal, and warm-green ladders. `Color Themes` maps `base` to warm/cool, `primary` to warm-green/blue, `secondary` to red/teal, and `warning` to orange. In the current snapshot, neutral semantic page, card, text, border, and chart-grid values resolve through **cool**, including via `Contrast Control`. Changing warm alone would not update those roles.

## One neutral ladder

Use the existing warm ladder as DUSQ's sole `neutral` group. Rename its variables while preserving IDs, repoint aliases from the old neutral and cool ladders, then retire those redundant groups from the DUSQ branch after dependency validation. Keep existing warm values at steps 50–850. Change only:

| Step | Old warm | Proposed neutral | Source |
| --- | --- | --- | --- |
| 0 | `#FBF9F7` | `#FAF8F5` | Warm off-white, approximate |
| 900 | `#231D19` | `#1A1816` | Computed site control color |
| 950 | `#100C09` | `#111111` | Computed site text color |

WCAG contrast checked across **all available pairs** in this resulting 20-step ladder:

| Separation | Requirement | Lowest result |
| --- | --- | --- |
| +400 | ≥3:1 | 3.30:1 (550→950) |
| +500 | ≥4.5:1 | 4.52:1 (450→950) |
| +700 | ≥7:1 | 8.32:1 (250→950) |

The +500 margin is narrow: rerun checks after any hex change. Step rules alone do not validate every semantic foreground/background pairing.

## Primary, status, and semantic roles

Use the **existing orange** ladder for the DUSQ warm brand accent; map both `Color Themes/primary` modes to it. Current orange passes its own step rule: worst +400 3.40:1, +500 4.62:1, +700 8.53:1. Its `400` value `#CF6D13` is a candidate, not a verified DUSQ brand hex. Do not add amber or ember primitives.

Keep the CTA black/white as observed on the site. This means `Background/Primary/Default` for buttons should resolve to neutral/900 in Light and neutral/0 in Dark, even though `Color Themes/primary` is orange for accents. Inspect all component consumers before changing that broad semantic role. Keep red/error, green/success, orange/warning, and existing chart families; warning and brand orange must be distinguished by label/icon and context, not color alone.

| Existing semantic role | Light / Day target | Dark / Bedtime target |
| --- | --- | --- |
| `Background/Neutral/Page` | neutral/50 | neutral/950 |
| `Background/Neutral/Default` | neutral/0 | neutral/900 |
| `Background/Neutral/Raised` | neutral/100 | neutral/800 |
| `Background/Neutral/Shallow` | neutral/200 | neutral/700 |
| `Foreground/Neutral/Default` | neutral/900 | neutral/0 |
| `Foreground/Neutral/Subtle` | neutral/700 | neutral/200 |
| `Foreground/Inverse/Default` | neutral/0 | neutral/900 |
| `border/subtle` | neutral/250 | neutral/600 |
| `border/default` | neutral/500 | neutral/400 |
| `border/strong` | neutral/650 | neutral/250 |
| `chart/grid` | neutral/150 | neutral/700 |
| `chart/label` | neutral/650 | neutral/250 |

Repoint both `Color Themes/base` modes and every related `Contrast Control` Standard/Medium/High alias. Keep BA's Light/Dark modes technically; Day/Bedtime are provisional product labels. Review disabled, hover, pressed, chart, and primary/secondary roles separately before changing them.

## Fonts: live-site check and BA text styles

The DUSQ homepage does **not** use only Helvetica Neue. A computed-style audit found Helvetica Neue stacks across most custom content (263 sampled leaf elements), Arial stacks in theme and navigation elements (177), a second Helvetica Neue fallback stack in FAQ content (29), and Plus Jakarta Sans in four product/shipping elements. The hero and section headings use `"Helvetica Neue", sans-serif`. These are CSS declarations, not proof that each font file loaded on every device. The logo is artwork and should not be approximated with a font.

For a coherent DUSQ system, propose Helvetica Neue for editorial and interface text styles, with `Helvetica, Arial, sans-serif` fallbacks. Preserve Plus Jakarta Sans only if the product/shipping module is deliberately retained as a separate visual treatment; otherwise normalize that module through the same text styles. Confirm the approved font and license before shipping. **Do not change `source/collections/typography.json`, `font-size-control.json`, or other text tokens.** Their existing family and size values remain BA data; DUSQ text styles override them at the style layer.

BA has 20 Figma-derived text styles in `source/specs/text-styles.json`: Title (DM Sans), Heading (DM Sans), Body (Inter), Label (Inter), and Legend (Inter). Those are the editable source styles; `dist/text-styles.css` is generated. Current styles have no mobile/desktop modes. Responsive variation therefore needs breakpoint-specific style overrides or a separate style variant for mobile, without editing token values.

### Proposed changes to existing text styles

Every row below changes the **style** `fontName.family` to Helvetica Neue. Keep the style names and IDs. Percentages are Figma line-height values. Values shown are 1X; text scaling must still be verified in the consumer layer.

| Existing style | Mobile size / line height | Desktop size / line height | Weight |
| --- | --- | --- | --- |
| Title/Large | 40 / 105% | 60 / 105% | Regular |
| Title/Medium | 36 / 110% | 48 / 110% | Regular |
| Title/Small | 32 / 115% | 40 / 115% | Regular |
| Heading/Large | 28 / 115% | 36 / 115% | Medium |
| Heading/Medium | 24 / 120% | 28 / 120% | Medium |
| Heading/Small | 20 / 125% | 24 / 125% | Medium |
| Body/XS | 14 / 150% | 14 / 150% | Regular |
| Body/Small | 16 / 150% | 16 / 150% | Regular |
| Body/Medium | 18 / 150% | 18 / 150% | Regular |
| Body/Large | 20 / 150% | 22 / 150% | Regular |
| Body/Emphasis/Small | 16 / 150% | 16 / 150% | Medium |
| Body/Emphasis/Medium | 18 / 150% | 18 / 150% | Medium |
| Body/Emphasis/Large | 20 / 150% | 22 / 150% | Medium |
| Body/Italic/Small | 16 / 150% | 16 / 150% | Italic |
| Body/Italic/Medium | 18 / 150% | 18 / 150% | Italic |
| Label/Small | 12 / 140% | 12 / 140% | Regular |
| Label/Medium | 12 / 140% | 12 / 140% | Regular |
| Label/Large | 14 / 140% | 14 / 140% | Regular |
| Label/Emphasis | 14 / 140% | 14 / 140% | Medium |
| Legend/Small | 12 / 140% | 12 / 140% | Regular |

The source has 20 styles (including Legend/Small); retain all of them. Data figures need a dedicated style or deliberate use of Title/Medium; the existing style set has no data-number role. The exact responsive breakpoints and style names for mobile variants are an implementation decision, because one Figma text style cannot contain two sizes by breakpoint.

### Quick feasibility run: additional work required

A read-only audit matched all **20 proposed rows to all 20 source style names**, found **zero unresolved aliases** in the current token graph, and confirmed that the 21 font-size control values can remain intact. However, the current `build/generate_components.py` **does not emit the family or size stored in each text style**: it derives the family from `Typography/Font Family/Title|Body` and derives size from `Typography/Font Sizes/{style.fontSize}`. Changing only `source/specs/text-styles.json` would therefore leave generated CSS on BA's family tokens, and a proposed 18 px Body/Medium is available as a token but its mobile/desktop variant would not be generated. To meet your requirement, change the text-style generator to emit style-owned font family, size, line height, and responsive overrides while leaving all Typography and Font Size Control token values unchanged. Figma text styles also need separate mobile/desktop variants or a documented breakpoint pairing.

Button and input-field specs carry their own font names/sizes, and `source/browser-components.css` directly consumes Typography family/size tokens. Those component surfaces need style bindings or DUSQ-scoped overrides if the goal is consistent typography across the whole system. The homepage's Plus Jakarta Sans product module is another explicit choice to resolve. The current BA font files contain The Seasons, not a bundled Helvetica Neue webfont, so fallback rendering and font licensing must be checked before claiming exact visual parity.

## Migration checks

1. Preserve primitive IDs while renaming; remap all aliases before deleting duplicate groups. Check unresolved IDs in the compiled token graph.
2. Rebuild generated CSS/JSON and text-style CSS; never hand-edit `dist`. Check all +400/+500/+700 pairs and real semantic foreground/background pairs in Light/Dark and Standard/Medium/High contrast.
3. Review `Background/Primary/*` and `Foreground/Primary/*` consumers before changing CTA mappings. Compare actual components to DUSQ website screenshots.

No source tokens have yet been changed.
