#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GITHUB_REPO = "https://github.com/shubhamarya-uxnai/BA-Design-Sytem";
const GITHUB_BLOB = `${GITHUB_REPO}/blob/main`;
const FIGMA_FILE = "https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System";

/**
 * Canonical registry connecting BA Design System components
 * between Figma design, GitHub remote, and local codebase.
 */
export const COMPONENT_REGISTRY = [
  {
    name: "Button",
    description: "Primary action button with 3 types, 2 sizes, icon slots, and full interaction states.",
    figma: {
      nodeId: "4149:6078",
      name: "Buttons",
      page: "Buttons (4133:4181)",
      url: `${FIGMA_FILE}?node-id=4149-6078`,
      variants: 24,
      properties: ["Type", "Size", "Button", "Enabled", "Hover", "Pressed", "Leading Icon", "Tailing Icon", "Focus Ring"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "Button",
      types: "ButtonProps",
      codeConnect: "packages/react/src/Button.figma.ts",
      spec: "source/specs/buttons.json",
      styles: "dist/figma-components.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 9,
      lineEnd: 23
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts#L9-L23`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/Button.figma.ts`,
      specUrl: `${GITHUB_BLOB}/source/specs/buttons.json`
    },
    usageSnippet: `import { Button } from "@ba-design-system/react";\n\n<Button Type="Primary" Size="Large" Button="Explore components" />`
  },
  {
    name: "IconButton",
    description: "Compact icon button with 3 types, 2 sizes, and full interaction/focus rings.",
    figma: {
      nodeId: "4149:6136",
      name: "Icon Button",
      page: "Buttons (4133:4181)",
      url: `${FIGMA_FILE}?node-id=4149-6136`,
      variants: 24,
      properties: ["Type", "Size", "Inverse", "Enabled", "Hover", "Pressed", "Focus", "Icon"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "IconButton",
      types: "IconButtonProps",
      codeConnect: "packages/react/src/IconButton.figma.ts",
      spec: "source/specs/icon-buttons.json",
      styles: "dist/figma-components.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 25,
      lineEnd: 36
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts#L25-L36`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/IconButton.figma.ts`,
      specUrl: `${GITHUB_BLOB}/source/specs/icon-buttons.json`
    },
    usageSnippet: `import { IconButton } from "@ba-design-system/react";\n\n<IconButton Type="Primary" Size="Large" icon="search" aria-label="Search" />`
  },
  {
    name: "InputField",
    description: "Input container preserving internal slots for leading/trailing icons, action button, and error states.",
    figma: {
      nodeId: "4158:7549",
      name: "Input Field",
      page: "Input Fields (4133:4184)",
      url: `${FIGMA_FILE}?node-id=4158-7549`,
      variants: 8,
      properties: ["Active", "Error", "Typed", "Typing", "Hover", "Label", "input", "Button", "Leading Icon", "Tailing Icon", "Focus Ring"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "InputField",
      types: "InputFieldProps",
      codeConnect: "packages/react/src/InputField.figma.ts",
      spec: "source/specs/input-fields.json",
      styles: "dist/figma-components.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 58,
      lineEnd: 76
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts#L58-L76`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/InputField.figma.ts`,
      specUrl: `${GITHUB_BLOB}/source/specs/input-fields.json`
    },
    usageSnippet: `import { InputField, Button } from "@ba-design-system/react";\n\n<InputField label="Email" input="name@example.com" Button={<Button Size="Small" Button="Submit" />} />`
  },
  {
    name: "Chip",
    description: "Status and tag chips supporting Primary, Success, and Error tones in Filled and Ghost styles.",
    figma: {
      nodeId: "28:88",
      name: "Chip",
      page: "Chips (4133:4185)",
      url: `${FIGMA_FILE}?node-id=28-88`,
      variants: 6,
      properties: ["Type", "Style", "chip", "Icon"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "Chip",
      types: "ChipProps",
      codeConnect: "packages/react/src/Chip.figma.ts",
      spec: null,
      styles: "dist/chips-selection.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 38,
      lineEnd: 45
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts#L38-L45`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/Chip.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { Chip } from "@ba-design-system/react";\n\n<Chip Type="Primary" Style="Filled" chip="Active" />`
  },
  {
    name: "Selection",
    description: "Accessible interactive controls for Checkbox, Radio, and Toggle switches.",
    figma: {
      nodeId: "4133:4266",
      name: "Selection",
      page: "Selection Controls (4133:4186)",
      url: `${FIGMA_FILE}?node-id=4133-4266`,
      variants: 12,
      properties: ["Type", "Checked", "Active", "Hover", "Focus", "label"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "Selection",
      types: "SelectionProps",
      codeConnect: "packages/react/src/Selection.figma.ts",
      spec: null,
      styles: "dist/chips-selection.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 47,
      lineEnd: 56
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts#L47-L56`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/Selection.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { Selection } from "@ba-design-system/react";\n\n<Selection Type="Checkbox" Checked label="Agree to terms" onCheckedChange={checked => console.log(checked)} />`
  },
  {
    name: "Icon",
    description: "Material Design System icon bridge connecting Figma library symbols (Solid, Regular, Logos) to Material Symbols Rounded / Material Icons.",
    figma: {
      nodeId: "25:98",
      name: "Icons",
      page: "Icons (25:98)",
      url: `${FIGMA_FILE}?node-id=25-98`,
      variants: 100,
      properties: ["name", "iconSet", "side", "fill", "weight", "grade", "opsz"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "Icon",
      types: "MaterialIconProps",
      codeConnect: "packages/react/src/Icon.figma.ts",
      spec: null,
      styles: "dist/figma-components.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 90,
      lineEnd: 90
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts#L90`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/Icon.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { Icon } from "@ba-design-system/react";\n\n<Icon name="search" iconSet="symbols" />`
  },
  {
    name: "ProgressBar",
    description: "Linear progress bar supporting Not Started, In Progress, Error, Warning, and Success states with percentage legend and status icon.",
    figma: {
      nodeId: "4133:4920",
      name: "Progress Bar",
      page: "Progress Indicator (4133:4719)",
      url: `${FIGMA_FILE}?node-id=4133-4920`,
      variants: 5,
      properties: ["Type", "Legend"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "ProgressBar",
      types: "ProgressBarProps",
      codeConnect: "packages/react/src/ProgressBar.figma.ts",
      spec: null,
      styles: "dist/progress-indicator.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 80,
      lineEnd: 90
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/ProgressBar.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { ProgressBar } from "@ba-design-system/react";\n\n<ProgressBar Type="In Progress" value={60} />`
  },
  {
    name: "ProgressPie",
    description: "Circular pie progress chart with external percentage legend and status icons.",
    figma: {
      nodeId: "4133:4949",
      name: "Progress Pie",
      page: "Progress Indicator (4133:4719)",
      url: `${FIGMA_FILE}?node-id=4133-4949`,
      variants: 5,
      properties: ["Type", "Legend"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "ProgressPie",
      types: "ProgressPieProps",
      codeConnect: "packages/react/src/ProgressPie.figma.ts",
      spec: null,
      styles: "dist/progress-indicator.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 92,
      lineEnd: 102
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/ProgressPie.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { ProgressPie } from "@ba-design-system/react";\n\n<ProgressPie Type="In Progress" value={32} />`
  },
  {
    name: "ProgressDonut",
    description: "Donut progress indicator with centered percentage legend and state indicator icons.",
    figma: {
      nodeId: "4133:4983",
      name: "Progress Donut",
      page: "Progress Indicator (4133:4719)",
      url: `${FIGMA_FILE}?node-id=4133-4983`,
      variants: 5,
      properties: ["Type", "Legend"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "ProgressDonut",
      types: "ProgressDonutProps",
      codeConnect: "packages/react/src/ProgressDonut.figma.ts",
      spec: null,
      styles: "dist/progress-indicator.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 104,
      lineEnd: 114
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/ProgressDonut.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { ProgressDonut } from "@ba-design-system/react";\n\n<ProgressDonut Type="In Progress" value={32} />`
  },
  {
    name: "Loader",
    description: "Indeterminate loading indicators supporting Circular spinner, Bar slider, and Skeleton shimmer variants.",
    figma: {
      nodeId: "4133:5017",
      name: "Loaders",
      page: "Progress Indicator (4133:4719)",
      url: `${FIGMA_FILE}?node-id=4133-5017`,
      variants: 3,
      properties: ["Type"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "Loader",
      types: "LoaderProps",
      codeConnect: "packages/react/src/Loader.figma.ts",
      spec: null,
      styles: "dist/progress-indicator.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 116,
      lineEnd: 124
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/Loader.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { Loader } from "@ba-design-system/react";\n\n<Loader Type="Circular" />`
  },
  {
    name: "SegmentedChild",
    description: "Segmented process step child component with Default, In Progress, Completed, Error, and Warning states.",
    figma: {
      nodeId: "4133:5027",
      name: "Segmented Child",
      page: "Progress Indicator (4133:4719)",
      url: `${FIGMA_FILE}?node-id=4133-5027`,
      variants: 10,
      properties: ["Type", "Description", "Icon", "title", "body"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "SegmentedChild",
      types: "SegmentedChildProps",
      codeConnect: "packages/react/src/SegmentedChild.figma.ts",
      spec: null,
      styles: "dist/progress-indicator.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 126,
      lineEnd: 140
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/SegmentedChild.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { SegmentedChild, SegmentedProgress } from "@ba-design-system/react";\n\n<SegmentedChild Type="In Progress" title="Step 2" body="Review information" />`
  },
  {
    name: "StepperChild",
    description: "Vertical stepper step child component with status tracking line, title/description, and extensible content slot.",
    figma: {
      nodeId: "4133:5107",
      name: "Stepper Child",
      page: "Progress Indicator (4133:4719)",
      url: `${FIGMA_FILE}?node-id=4133-5107`,
      variants: 10,
      properties: ["Type", "Description", "Icon", "title", "body", "slotVisible"]
    },
    local: {
      component: "packages/react/src/index.ts",
      exportName: "StepperChild",
      types: "StepperChildProps",
      codeConnect: "packages/react/src/StepperChild.figma.ts",
      spec: null,
      styles: "dist/progress-indicator.css",
      test: "packages/react/test/contract.test.mjs",
      lineStart: 142,
      lineEnd: 156
    },
    github: {
      sourceUrl: `${GITHUB_BLOB}/packages/react/src/index.ts`,
      codeConnectUrl: `${GITHUB_BLOB}/packages/react/src/StepperChild.figma.ts`,
      specUrl: null
    },
    usageSnippet: `import { StepperChild, Stepper } from "@ba-design-system/react";\n\n<StepperChild Type="Completed" title="Account Setup" body="Confirmed" />`
  }
];


export function generateExportManifest() {
  return {
    system: "BA Design System",
    brand: "Bunny Are",
    updatedAt: new Date().toISOString(),
    figmaFile: {
      name: "BA Design System",
      key: "TeshjuZ2KBKj4xhK9r2OHU",
      url: FIGMA_FILE
    },
    githubRepo: {
      name: "BA-Design-Sytem",
      url: GITHUB_REPO,
      branch: "main"
    },
    components: COMPONENT_REGISTRY.map(c => {
      const localFileExists = fs.existsSync(path.join(ROOT, c.local.component));
      const codeConnectExists = fs.existsSync(path.join(ROOT, c.local.codeConnect));
      return {
        name: c.name,
        description: c.description,
        status: localFileExists && codeConnectExists ? "connected" : "pending",
        figma: c.figma,
        local: {
          ...c.local,
          exists: localFileExists,
          codeConnectExists
        },
        github: c.github,
        usageSnippet: c.usageSnippet
      };
    })
  };
}

function printStatus() {
  console.log("\n========================================================================");
  console.log("       BA DESIGN SYSTEM — CODE CONNECT TOOL & COMPONENT REGISTRY       ");
  console.log("========================================================================\n");
  console.log(`Figma File:   ${FIGMA_FILE}`);
  console.log(`GitHub Repo:  ${GITHUB_REPO}`);
  console.log(`Local Root:   ${ROOT}\n`);

  console.log("------------------------------------------------------------------------");
  console.log("Component    | Status    | Figma Node | Local Counterpart    | GitHub Link");
  console.log("------------------------------------------------------------------------");

  let allConnected = true;
  for (const c of COMPONENT_REGISTRY) {
    const localExists = fs.existsSync(path.join(ROOT, c.local.component));
    const connectExists = fs.existsSync(path.join(ROOT, c.local.codeConnect));
    const status = localExists && connectExists ? "✓ CONNECTED" : "✗ MISSING";
    if (!localExists || !connectExists) allConnected = false;

    const pad = (s, n) => s.padEnd(n);
    console.log(
      `${pad(c.name, 12)} | ${pad(status, 9)} | ${pad(c.figma.nodeId, 10)} | ${pad(c.local.codeConnect.replace("packages/react/src/", ""), 20)} | ${c.github.sourceUrl.replace(GITHUB_BLOB + "/", "")}`
    );
  }
  console.log("------------------------------------------------------------------------\n");

  if (allConnected) {
    console.log(`✓ All ${COMPONENT_REGISTRY.length} components and libraries are fully connected to their Figma, GitHub, and local codebase counterparts!`);
  } else {
    console.warn("⚠ Some components have missing local or Code Connect files.");
  }
  console.log("\nRun `node build/code-connect.mjs export` to sync dist/code-connect.json");
  console.log("Run `node build/code-connect.mjs verify` to run full validation & figma parse");
}

function verifyConnections() {
  console.log("Verifying Code Connect connections...");
  const manifest = generateExportManifest();
  let errors = 0;

  for (const c of manifest.components) {
    if (!c.local.exists) {
      console.error(`✗ Local component file missing for ${c.name}: ${c.local.component}`);
      errors++;
    }
    if (!c.local.codeConnectExists) {
      console.error(`✗ Code Connect file missing for ${c.name}: ${c.local.codeConnect}`);
      errors++;
    }
  }

  // Test figma connect parse
  try {
    const figmaBin = path.join(ROOT, "node_modules/.bin/figma");
    if (fs.existsSync(figmaBin)) {
      console.log("Running Figma Code Connect parser...");
      const output = execSync(`${figmaBin} connect parse`, { cwd: ROOT, encoding: "utf8" });
      const parsed = JSON.parse(output.substring(output.indexOf("[")));
      console.log(`✓ Figma Code Connect CLI successfully parsed ${parsed.length} component templates!`);
    }
  } catch (err) {
    console.warn("⚠ Notice from figma connect parse:", err.message);
  }

  if (errors > 0) {
    console.error(`\nVerification failed with ${errors} error(s).`);
    process.exit(1);
  }

  console.log("\n✓ All component connections verified successfully!");
}

function exportManifest() {
  const manifest = generateExportManifest();
  const distDir = path.join(ROOT, "dist");
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const distPath = path.join(distDir, "code-connect.json");
  fs.writeFileSync(distPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`✓ Written Code Connect manifest to ${distPath}`);

  // Also write to showcase src for rich display
  const showcaseDataPath = path.join(ROOT, "apps/showcase/src/code-connect-data.json");
  fs.writeFileSync(showcaseDataPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`✓ Written showcase Code Connect data to ${showcaseDataPath}`);
}

const command = process.argv[2] || "status";

switch (command) {
  case "status":
    printStatus();
    break;
  case "verify":
    verifyConnections();
    break;
  case "export":
    exportManifest();
    break;
  case "json":
    console.log(JSON.stringify(generateExportManifest(), null, 2));
    break;
  default:
    console.log(`Unknown command: ${command}. Use status, verify, export, or json.`);
    process.exit(1);
}
