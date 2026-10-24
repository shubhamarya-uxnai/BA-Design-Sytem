// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4133-4920
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=ProgressBar

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  "Not Started": "Not Started",
  "In Progress": "In Progress",
  Error: "Error",
  Warning: "Warning",
  Success: "Success",
})
const legend = figma.selectedInstance.getBoolean("Legend")

export default {
  id: "ProgressBar",
  imports: ['import { ProgressBar } from "./index";'],
  example: figma.code`<ProgressBar${figma.helpers.react.renderProp(
    "Type",
    type,
  )}${figma.helpers.react.renderProp("Legend", legend)}/>`,
  metadata: { nestable: true },
}
