# Token mapping

This package mirrors the current Figma variable architecture instead of inventing a second naming system.

## Collections currently exported

| Figma collection | Modes | Local source |
| --- | --- | --- |
| Typography | Mode 1 | `source/collections/typography.json` |
| Screen Size Switch | Mobile, Tablet, Desktop | `source/collections/screen-size-switch.json` |
| Color Themes | Warm, Cool | `source/collections/color-themes.json` |
| Primitive Color Tokens | Value | `source/collections/primitive-color-tokens.json` |
| Lanuguage Collection | Mode 1 | `source/collections/lanuguage-collection.json` |
| Language Switch | English, Arabic, Hindi | `source/collections/language-switch.json` |
| Font Size Control | 1X, 1.2X, 1.4X, 1.6X, 1.8X, 2X | `source/collections/font-size-control.json` |
| Contrast Control | Standard, Medium, High | `source/collections/contrast-control.json` |
| Space | Default | `source/collections/space.json` |
| Semantic Color Tokens | Light, Dark | `source/collections/semantic-color-tokens.json` |

The separator collection is also retained in the export manifest, even though it has no variables.

## Generated CSS naming

Each Figma variable becomes a namespaced CSS custom property with the `--ba-` prefix (and a `--va-` alias for backward compatibility):

```text
Figma:  Semantic Color Tokens / Background / Neutral / Page Default
CSS:    --ba-semantic-color-tokens-background-neutral-page-default
Alias:  --va-semantic-color-tokens-background-neutral-page-default
```

Variable aliases become CSS `var(...)` references to the target variable's generated name. This preserves the mapping chain across collections such as Semantic Color Tokens → Contrast Control → Primitive Color Tokens.

## Mode selectors

The build emits a collection's default mode on `:root`. Other modes use these selectors:

| Collection | Attribute | Example |
| --- | --- | --- |
| Screen Size Switch | `data-screen` | `[data-screen="tablet"]` |
| Color Themes | `data-temperature` | `[data-temperature="cool"]` |
| Language Switch | `lang` | `[lang="ar"]` |
| Font Size Control | `data-text-scale` | `[data-text-scale="1.4x"]` |
| Contrast Control | `data-contrast` | `[data-contrast="high"]` |
| Semantic Color Tokens | `data-theme` | `[data-theme="dark"]` |

The source snapshot is intentionally lossless. If a future consumer needs a different framework adapter, it can consume `dist/tokens.json` without having to scrape Figma again.

## Component snapshots

`source/specs/buttons.json`, `source/specs/icon-buttons.json`, and `source/specs/text-styles.json` are compact snapshots of the current Figma structures. The Python generator resolves their Figma variable aliases through `dist/tokens.json`; it does not duplicate token values.

Figma font-weight variables are string labels because the design system needs to represent regular and italic variants. The web adapter therefore emits the equivalent numeric CSS weight and records the originating Typography token in `dist/components.json`.

Input Field snapshots preserve the nested `Input Container`, editable `Input`, leading/trailing icon instances, hidden `Button` insertion point, hover overlay, and focus ring. The web output replaces the embedded Figma icon instances with Material Symbols slots and keeps the nested button insertion point available to consumers.
