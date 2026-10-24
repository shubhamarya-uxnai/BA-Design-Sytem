// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4149-6078
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=Button

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
const button = figma.selectedInstance.getString("Button")
const enabled = figma.selectedInstance.getBoolean("Enabled")
const leadingIcon = figma.selectedInstance.getBoolean("Leading Icon")
const tailingIcon = figma.selectedInstance.getBoolean("Tailing Icon")
const leadingIconInstance = figma.selectedInstance.getInstanceSwap("leading-icon")
const tailingIconInstance = figma.selectedInstance.getInstanceSwap("tailing-icon")

export default {
  id: "Button",
  imports: ['import { Button, Icon } from "./index";'],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    "Type",
    type,
  )}${figma.helpers.react.renderProp(
    "Size",
    size,
  )}${figma.helpers.react.renderProp(
    "Button",
    button,
  )}${figma.helpers.react.renderProp(
    "Enabled",
    enabled,
  )}${figma.helpers.react.renderProp(
    "Leading Icon",
    leadingIcon,
  )}${figma.helpers.react.renderProp(
    "Tailing Icon",
    tailingIcon,
  )}${figma.helpers.react.renderProp(
    "leading-icon",
    leadingIconInstance,
  )}${figma.helpers.react.renderProp(
    "tailing-icon",
    tailingIconInstance,
  )}/>`,
  metadata: { nestable: true },
}
