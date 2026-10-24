// url=https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=4133-5017
// source=https://github.com/shubhamarya-uxnai/BA-Design-Sytem/blob/main/packages/react/src/index.ts
// component=Loader

import figma from "figma"

const type = figma.selectedInstance.getEnum("Type", {
  Circular: "Circular",
  Bar: "Bar",
  Skeleton: "Skeleton",
})

export default {
  id: "Loader",
  imports: ['import { Loader } from "./index";'],
  example: figma.code`<Loader${figma.helpers.react.renderProp(
    "Type",
    type,
  )}/>`,
  metadata: { nestable: true },
}
