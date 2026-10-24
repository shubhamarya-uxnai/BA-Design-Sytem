// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=28-88
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=Chip

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Primary: "Primary",
  Success: "Success",
  Error: "Error",
})
const style = figma.selectedInstance.getEnum("Style", {
  Filled: "Filled",
  Ghost: "Ghost",
})
const chip = figma.selectedInstance.getString("chip")
const showIcon = figma.selectedInstance.getBoolean("Icon")
const iconInstance = figma.selectedInstance.getInstanceSwap("icon")

export default {
  id: "Chip",
  imports: ['import { Chip, Icon } from "./index";'],
  example: figma.code`<Chip${figma.helpers.react.renderProp(
    "Type",
    type,
  )}${figma.helpers.react.renderProp(
    "Style",
    style,
  )}${figma.helpers.react.renderProp(
    "chip",
    chip,
  )}${figma.helpers.react.renderProp(
    "Icon",
    showIcon,
  )}${figma.helpers.react.renderProp(
    "icon",
    iconInstance,
  )}/>`,
  metadata: { nestable: true },
}
