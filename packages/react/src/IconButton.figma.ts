// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4149-6136
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=IconButton

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Primary: "Primary",
  Default: "Default",
  Ghost: "Ghost",
})
const size = figma.selectedInstance.getEnum("Size", {
  Large: "Large",
  Small: "Small",
})
const enabled = figma.selectedInstance.getBoolean("Enabled")
const showIcon = figma.selectedInstance.getBoolean("Icon")
const icon = figma.selectedInstance.getInstanceSwap("icon")

export default {
  id: "IconButton",
  imports: ['import { IconButton, Icon } from "./index";'],
  example: figma.code`<IconButton${figma.helpers.react.renderProp(
    "Type",
    type,
  )}${figma.helpers.react.renderProp(
    "Size",
    size,
  )}${figma.helpers.react.renderProp(
    "Enabled",
    enabled,
  )}${figma.helpers.react.renderProp(
    "Icon",
    showIcon,
  )}${figma.helpers.react.renderProp(
    "icon",
    icon,
  )} aria-label="Action"/>`,
  metadata: { nestable: true },
}

