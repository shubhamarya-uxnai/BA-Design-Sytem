// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4158-7549
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=InputField

import figma from "figma"

const label = figma.selectedInstance.getString("label")
const input = figma.selectedInstance.getString("input")
const showLabel = figma.selectedInstance.getBoolean("Label")
const hasButton = figma.selectedInstance.getBoolean("Button")
const leadingIcon = figma.selectedInstance.getBoolean("Leading Icon")
const trailingIcon = figma.selectedInstance.getBoolean("Tailing Icon")
const leadingIconInstance = figma.selectedInstance.getInstanceSwap("leading-icon")
const trailingIconInstance = figma.selectedInstance.getInstanceSwap("tailing-icon")
const active = figma.selectedInstance.getBoolean("Active")
const error = figma.selectedInstance.getBoolean("Error")
export default {
  id: "InputField",
  imports: ['import { InputField, Icon } from "./index";'],
  example: figma.code`<InputField${figma.helpers.react.renderProp(
    "label",
    label,
  )}${figma.helpers.react.renderProp(
    "input",
    input,
  )}${figma.helpers.react.renderProp(
    "Active",
    active,
  )}${figma.helpers.react.renderProp(
    "Error",
    error,
  )}${figma.helpers.react.renderProp(
    "Button",
    hasButton,
  )}${figma.helpers.react.renderProp(
    "Leading Icon",
    leadingIcon,
  )}${figma.helpers.react.renderProp(
    "Tailing Icon",
    trailingIcon,
  )}${figma.helpers.react.renderProp(
    "leading-icon",
    leadingIconInstance,
  )}${figma.helpers.react.renderProp(
    "tailing-icon",
    trailingIconInstance,
  )}${figma.helpers.react.renderProp(
    "Label",
    showLabel,
  )}/>`,
  metadata: { nestable: true },
}

