import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  ProgressBar,
  ProgressPie,
  ProgressDonut,
  Loader,
  Loaders,
  SegmentedChild,
  StepperChild,
  SegmentedProgress,
  Stepper
} from "../src/index.ts";

test("ProgressBar renders linear track, fill and legend", () => {
  const html = renderToString(React.createElement(ProgressBar, { Type: "In Progress", value: 45 }));
  assert.ok(html.includes('data-type="In Progress"'));
  assert.ok(html.includes('width:45%'));
  assert.ok(html.includes('45%'));
});

test("ProgressPie renders conic gradient with legend", () => {
  const html = renderToString(React.createElement(ProgressPie, { Type: "Warning", value: 32 }));
  assert.ok(html.includes('data-type="Warning"'));
  assert.ok(html.includes('conic-gradient'));
  assert.ok(html.includes('32%'));
});

test("ProgressDonut renders SVG donut ring and center legend", () => {
  const html = renderToString(React.createElement(ProgressDonut, { Type: "Error", value: 32 }));
  assert.ok(html.includes('data-type="Error"'));
  assert.ok(html.includes('figma-progress-donut__svg'));
  assert.ok(html.includes('32%'));
});

test("Loaders render Circular, Bar, and Skeleton variants", () => {
  const circ = renderToString(React.createElement(Loader, { Type: "Circular" }));
  assert.ok(circ.includes('figma-loader--circular'));

  const bar = renderToString(React.createElement(Loader, { Type: "Bar" }));
  assert.ok(bar.includes('figma-loader--bar'));

  const skel = renderToString(React.createElement(Loaders, { Type: "Skeleton" }));
  assert.ok(skel.includes('figma-loader--skeleton'));
});

test("SegmentedChild and StepperChild render stage titles, states and progress bars", () => {
  const seg = renderToString(React.createElement(SegmentedChild, { Type: "In Progress", title: "Details", body: "Pending approval" }));
  assert.ok(seg.includes('figma-segmented-child'));
  assert.ok(seg.includes('Details'));
  assert.ok(seg.includes('Pending approval'));

  const step = renderToString(React.createElement(StepperChild, { Type: "Completed", title: "Setup", body: "Completed step" }));
  assert.ok(step.includes('figma-stepper-child'));
  assert.ok(step.includes('Setup'));
  assert.ok(step.includes('Completed step'));
});
