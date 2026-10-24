// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=25-98
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=Icon

import figma from "figma"

/**
 * Figma Code Connect mapping for Icon component.
 * Connects the Material Design System icon library in Figma (Page 25:98)
 * to the @ba-design-system/react Icon component, resolving the correct
 * Material Symbols glyph name dynamically for any icon placed or swapped.
 */
const iconName = figma.selectedInstance.name || "search"

export default {
  id: "Icon",
  imports: ['import { Icon } from "./index";'],
  example: figma.code`<Icon name="${iconName}" iconSet="symbols" />`,
  metadata: { nestable: true },
}
