# VA Design System

## Shared browser release: v0.1.0

Gradient Creator, Color Palette Visualizer, and Acoustic Matrix load the shared stylesheet from:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/shubhamarya-uxnai/BA-Design-Sytem@v0.1.0/dist/consumer.css">
```

`npm run check` rebuilds this bundle, including the central compatibility adapter for existing `ds-*` markup. Its legacy layout sources and token reference are under `source/compat/`; emitted compatibility values resolve through BA variables. Consumer repositories retain application layout, behavior, and font assets. Local copies of the old shared system have been removed from consumers. This pinned release requires a consumer version change to adopt future BA releases; it does not automatically follow main.

Token foundation for the Bunny Are design system.

This package is intentionally token-first. It does not create a parallel Figma file. The source snapshot in `source/collections/` is the current Figma variable export; the generated token and component files in `dist/` are derived from that snapshot and can be rebuilt at any time.

## Source of truth

- Figma file: [BA Design System](https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System)
- Figma file key: `TeshjuZ2KBKj4xhK9r2OHU`
- Export manifest: `source/manifest.json`
- One JSON file per Figma variable collection: `source/collections/`

The export preserves each variable's Figma id, collection, modes, resolved type, scopes, raw mode values, and variable aliases. Aliases are not flattened, so the design-token relationships remain inspectable and can be regenerated rather than becoming duplicated hardcoded values.

## Build

From this directory:

```bash
npm run build
```

The build has no external dependencies and writes:

- `dist/tokens.json` — machine-readable token inventory and alias relationships.
- `dist/tokens.css` — CSS custom properties with mode selectors.

The first component layer is generated separately with the Python script:

```bash
npm run components
```

It reads the current Figma component snapshots in `source/specs/` and writes:

- `dist/components.css` — Buttons and Icon Button layout, state, color, focus, and icon mappings.
- `dist/text-styles.css` — the 20 current Text Styles mapped to Typography variables.
- `dist/input-fields.css` — Input Field states, internal control structure, optional Button/dropdown slot, and Material icon slots.
- `dist/components.json` — variant counts and source-to-token mapping metadata.
- `dist/index.css` — convenience entry point importing all generated CSS.

Input Fields retain the important internal composition from Figma. Use the leading and trailing slots for Google Material Symbols, and put a complete button or dropdown control inside `va-input-field__button-slot`; do not replace that slot with a hardcoded final icon.

The generated [input-field.example.html](dist/input-field.example.html) shows the expected structure and loads Google Material Symbols Rounded from the official Google Fonts stylesheet.

Example button markup uses the exported Figma variant axes:

```html
<button class="va-button"
  data-size="large"
  data-type="primary"
  data-hover="false"
  data-enabled="true"
  data-pressed="false">
  <span class="va-button__icon" aria-hidden="true"></span>
  <span class="va-button__label">Button</span>
</button>
```

Text styles are available as classes such as `.va-text-title-large`, `.va-text-body-emphasis-medium`, `.va-text-label-small`, and `.va-text-legend-small`.

The CSS exposes the Figma modes through data attributes. For example:

```html
<html data-theme="dark" data-screen="desktop" data-temperature="cool">
```

The default Figma mode for every collection is emitted on `:root`; non-default modes are emitted under collection-specific selectors documented in `MAPPING.md`.

## Working agreement

1. Update or re-export the relevant source collection when Figma tokens change.
2. Keep aliases as aliases; do not replace them with copied values unless the design decision is intentional.
3. Run `npm run build` and review both generated files.
4. Run `npm run components` when component or text-style snapshots change.
5. Add later component families one at a time on top of these stable token names.

The initial component layer now covers Buttons, Icon Button, and Text Styles. Larger component families remain intentionally deferred so they can be added incrementally without losing context.
