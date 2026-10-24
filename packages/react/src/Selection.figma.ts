// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4133-4266
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=Selection

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Checkbox: "Checkbox",
  Radio: "Radio",
  Toggle: "Toggle",
})
const checked = figma.selectedInstance.getBoolean("Checked")
const active = figma.selectedInstance.getBoolean("Active")
const label = figma.selectedInstance.getString("label")

export default {
  id: "Selection",
  imports: ['import { Selection } from "./index";'],
  example: figma.code`<Selection${figma.helpers.react.renderProp(
    "Type",
    type,
  )}${figma.helpers.react.renderProp(
    "Checked",
    checked,
  )}${figma.helpers.react.renderProp(
    "Active",
    active,
  )}${figma.helpers.react.renderProp("label", label)}/>`,
  metadata: { nestable: true },
}
