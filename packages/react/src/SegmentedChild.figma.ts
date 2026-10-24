// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4133-5027
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=SegmentedChild

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Default: "Default",
  "In Progress": "In Progress",
  Completed: "Completed",
  Error: "Error",
  Warning: "Warning",
})
const description = figma.selectedInstance.getBoolean("Description")
const icon = figma.selectedInstance.getBoolean("Icon")
const title = figma.selectedInstance.getString("title")
const body = figma.selectedInstance.getString("body")

export default {
  id: "SegmentedChild",
  imports: ['import { SegmentedChild } from "./index";'],
  example: figma.code`<SegmentedChild${figma.helpers.react.renderProp(
    "Type",
    type,
  )}${figma.helpers.react.renderProp(
    "Description",
    description,
  )}${figma.helpers.react.renderProp(
    "Icon",
    icon,
  )}${figma.helpers.react.renderProp(
    "title",
    title,
  )}${figma.helpers.react.renderProp("body", body)}/>`,
  metadata: { nestable: true },
}
