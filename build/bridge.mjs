#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 4040;

const BA_SIGNATURES = [
  "@ba-design-system",
  "--ba-",
  "data-ba-version",
  "data-ba-component",
  "BA Design System",
  "figma-components",
  "figma-button",
  "figma-icon-button",
  "figma-input",
  "consumer.css",
  "Gradient Studio",
  "Glyph Studio",
  "createStudioEngine",
  "Color-Palette-Visualizer",
  "Glyph-Studio",
  "music-composer"
];

const KNOWN_BA_COLORS = [
  "rgb(8, 12, 23)",
  "rgb(17, 18, 25)",
  "rgb(23, 26, 36)",
  "rgb(36, 40, 56)",
  "rgb(50, 56, 82)",
  "rgb(112, 163, 217)",
  "rgb(255, 111, 190)",
  "rgb(61, 220, 151)",
  "rgb(233, 234, 242)",
  "rgb(142, 149, 173)",
  "rgb(95, 102, 128)",
  "rgb(16, 12, 9)",
  "rgb(63, 51, 41)",
  "rgb(154, 131, 109)",
  "rgb(251, 249, 247)",
  "rgb(194, 185, 175)",
  "rgb(35, 29, 25)",
  "rgb(98, 148, 81)",
  "rgb(127, 171, 112)",
  "rgb(125, 140, 255)",
  "rgb(73, 179, 116)",
  "rgb(215, 43, 51)",
  "rgb(220, 136, 137)"
];

async function resolveNavigableUrl(target) {
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return { url: target, cleanup: null };
  }

  let cleanPath = target.replace(/^file:\/\//, "");
  if (!path.isAbsolute(cleanPath)) {
    cleanPath = path.resolve(ROOT, cleanPath);
    if (!fs.existsSync(cleanPath)) {
      cleanPath = path.resolve(ROOT, "..", target);
    }
  }

  if (!fs.existsSync(cleanPath)) {
    throw new Error(`Local path does not exist: ${target}`);
  }

  const stat = fs.statSync(cleanPath);
  let baseDir = stat.isDirectory() ? cleanPath : path.dirname(cleanPath);
  let entryFile = stat.isDirectory() ? "index.html" : path.basename(cleanPath);

  const ephemeralServer = http.createServer((req, res) => {
    let reqPath = req.url.split("?")[0];
    if (reqPath === "/" || reqPath === "") reqPath = "/" + entryFile;
    const filePath = path.join(baseDir, reqPath);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { "Access-Control-Allow-Origin": "*" });
      return res.end("Not found");
    }
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".mjs": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".ttf": "font/ttf",
      ".otf": "font/otf",
      ".woff2": "font/woff2"
    };
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Access-Control-Allow-Origin": "*"
    });
    fs.createReadStream(filePath).pipe(res);
  });

  const ephemeralPort = 4045 + Math.floor(Math.random() * 500);
  await new Promise((resolve) => ephemeralServer.listen(ephemeralPort, resolve));

  return {
    url: `http://localhost:${ephemeralPort}/`,
    cleanup: () => ephemeralServer.close()
  };
}

export async function extractPageToFigmaAST(targetInput, viewport = { width: 1440, height: 900 }) {
  const { url, cleanup } = await resolveNavigableUrl(targetInput);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport });

    await page.goto(url, { waitUntil: "networkidle", timeout: 25000 }).catch(async () => {
      await page.waitForLoadState("domcontentloaded");
    });
    await page.waitForTimeout(2000);

    const pageHtml = await page.content();
    const matched = BA_SIGNATURES.filter((sig) => pageHtml.includes(sig));
    if (matched.length === 0) {
      throw new Error(
        "CONVERSION REJECTED: The target page does not use the BA Design System. " +
        "Per design system integrity requirements, only designs built with the BA Design System can be converted to Figma."
      );
    }

    const { sceneAST, audit } = await page.evaluate(async (knownColors) => {
      const TOKEN_MAP = {
        // Standard Cool Dark Tokens
        "rgb(8, 12, 23)": { name: "Background/Neutral/Page", token: "--background", variableId: "VariableID:4148:1645" },
        "rgb(17, 18, 25)": { name: "Background/Neutral/Default", token: "--card", variableId: "VariableID:4148:1646" },
        "rgb(23, 26, 36)": { name: "Background/Neutral/Raised", token: "--secondary", variableId: "VariableID:4148:1647" },
        "rgb(36, 40, 56)": { name: "border/default", token: "--border", variableId: "VariableID:4148:1613" },
        "rgb(50, 56, 82)": { name: "Background/Neutral/Shallow", token: "--input", variableId: "VariableID:4148:1648" },
        "rgb(112, 163, 217)": { name: "Background/Primary/Default", token: "--primary", variableId: "VariableID:4148:1650" },
        "rgb(255, 111, 190)": { name: "Background/Primary/Raised", token: "--highlight", variableId: "VariableID:4148:1651" },
        "rgb(61, 220, 151)": { name: "status/success/surface", token: "--success", variableId: "VariableID:4148:1624" },
        "rgb(233, 234, 242)": { name: "Foreground/Neutral/Default", token: "--foreground", variableId: "VariableID:4148:1658" },
        "rgb(142, 149, 173)": { name: "Foreground/Neutral/Subtle", token: "--muted-foreground", variableId: "VariableID:4148:1659" },
        "rgb(95, 102, 128)": { name: "Foreground/Neutral/Subtle", token: "--subtle-foreground", variableId: "VariableID:4148:1659" },

        // Studio Warm Dark Theme mappings
        "rgb(16, 12, 9)": { name: "Background/Neutral/Page", token: "--background", variableId: "VariableID:4148:1645" },
        "rgb(63, 51, 41)": { name: "Background/Neutral/Raised", token: "--card", variableId: "VariableID:4148:1647" },
        "rgb(154, 131, 109)": { name: "border/default", token: "--border", variableId: "VariableID:4148:1613" },
        "rgb(251, 249, 247)": { name: "Foreground/Neutral/Default", token: "--foreground", variableId: "VariableID:4148:1658" },
        "rgb(194, 185, 175)": { name: "Foreground/Neutral/Subtle", token: "--muted-foreground", variableId: "VariableID:4148:1659" },
        "rgb(35, 29, 25)": { name: "Foreground/Inverse/Default", token: "--foreground-inverse", variableId: "VariableID:4148:1665" },
        "rgb(98, 148, 81)": { name: "Background/Primary/Default", token: "--primary", variableId: "VariableID:4148:1650" },
        "rgb(127, 171, 112)": { name: "border/Primary", token: "--border-primary", variableId: "VariableID:4148:1615" },
        "rgb(125, 140, 255)": { name: "Background/Primary/Default", token: "--primary", variableId: "VariableID:4148:1650" },
        "rgb(73, 179, 116)": { name: "status/success/surface", token: "--success", variableId: "VariableID:4148:1624" },
        "rgb(215, 43, 51)": { name: "status/error/surface", token: "--destructive", variableId: "VariableID:4148:1616" },
        "rgb(220, 136, 137)": { name: "status/error/border", token: "--border-destructive", variableId: "VariableID:4148:1619" }
      };

      const detectedIconsSet = new Set();
      const unmappedColorsMap = new Map();
      const unmappedFontsSet = new Set();

      function parseRgb(str) {
        if (!str || str === "transparent" || str === "rgba(0, 0, 0, 0)") return null;
        const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (!match) return null;
        return {
          r: parseInt(match[1], 10) / 255,
          g: parseInt(match[2], 10) / 255,
          b: parseInt(match[3], 10) / 255,
          a: match[4] !== undefined ? parseFloat(match[4]) : 1
        };
      }

      function rgbToHex(rgbStr) {
        const p = parseRgb(rgbStr);
        if (!p) return null;
        const toH = (n) => Math.round(n * 255).toString(16).padStart(2, "0");
        return `#${toH(p.r)}${toH(p.g)}${toH(p.b)}`;
      }

      function recordColorAudit(colorStr) {
        if (!colorStr || colorStr === "transparent" || colorStr === "rgba(0, 0, 0, 0)") return;
        if (!knownColors.includes(colorStr) && !TOKEN_MAP[colorStr]) {
          const hex = rgbToHex(colorStr);
          if (hex) {
            unmappedColorsMap.set(colorStr, { color: colorStr, hex, count: (unmappedColorsMap.get(colorStr)?.count || 0) + 1 });
          }
        }
      }

      // Detect effective dark canvas background
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
      let effectiveBgStr = "rgb(16, 12, 9)";
      if (bodyBg && bodyBg !== "transparent" && bodyBg !== "rgba(0, 0, 0, 0)") {
        effectiveBgStr = bodyBg;
      } else if (htmlBg && htmlBg !== "transparent" && htmlBg !== "rgba(0, 0, 0, 0)") {
        effectiveBgStr = htmlBg;
      }

      function extractNode(el, depth = 0) {
        if (!el || el.nodeType !== Node.ELEMENT_NODE) return null;
        if (depth > 14) return null;

        const tag = el.tagName.toLowerCase();
        if (tag === "script" || tag === "style" || tag === "noscript") return null;

        const cs = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const cls = typeof el.className === "string" ? el.className : "";
        const isSpacer = cls.includes("spacer");

        if (!isSpacer && (rect.width <= 0 || rect.height <= 0 || cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0")) {
          return null;
        }

        // Logo dot (15x15)
        if (cls.includes("dot") && (rect.width <= 24 || rect.height <= 24)) {
          return {
            type: "FRAME",
            name: "brand.dot",
            width: 15,
            height: 15,
            cornerRadius: 5,
            fill: parseRgb("rgb(125, 140, 255)") || { r: 0.49, g: 0.55, b: 1, a: 1 },
            children: []
          };
        }

        // Flex spacer
        if (cls.includes("spacer")) {
          return {
            type: "FRAME",
            name: "spacer",
            layoutMode: "HORIZONTAL",
            flexGrow: 1,
            width: Math.max(Math.round(rect.width), 10),
            height: 10,
            fill: null,
            children: []
          };
        }

        // Dedicated Icon Detection (Material Symbols / Icons)
        const isIconEl =
          cls.includes("material-symbols") ||
          cls.includes("material-icons") ||
          (cls.includes("icon") && (tag === "span" || tag === "i" || tag === "svg") && !cls.includes("figma-icon-button"));

        if (isIconEl) {
          let iconName = el.innerText.trim() || el.getAttribute("aria-label") || el.getAttribute("data-icon") || "";
          if (!iconName && typeof el.className === "string") {
            const match = el.className.match(/bx[s]?-([a-z0-9-]+)/);
            if (match) iconName = match[1];
          }
          if (iconName) detectedIconsSet.add(iconName);
          return {
            type: "ICON",
            name: `Icon / ${iconName || "generic"}`,
            iconName: iconName || "expand_more",
            width: Math.max(Math.round(rect.width), 16),
            height: Math.max(Math.round(rect.height), 16),
            color: parseRgb(cs.color) || { r: 0.9, g: 0.9, b: 0.95, a: 1 }
          };
        }

        // Toggle Switch Detection
        if (tag === "label" && cls.includes("figma-selection")) {
          const labelEl = el.querySelector(".figma-selection__label");
          const labelText = labelEl ? labelEl.innerText.trim() : (el.innerText.trim() || "Toggle");
          const inputEl = el.querySelector("input[type='checkbox']");
          const isChecked = inputEl ? inputEl.checked : true;

          return {
            type: "FRAME",
            name: `Toggle / ${labelText}`,
            layoutMode: "HORIZONTAL",
            counterAxisAlignItems: "CENTER",
            itemSpacing: 8,
            width: Math.round(rect.width),
            height: Math.max(Math.round(rect.height), 24),
            fill: null,
            children: [
              {
                type: "FRAME",
                name: "switch-track",
                layoutMode: "HORIZONTAL",
                primaryAxisAlignItems: isChecked ? "MAX" : "MIN",
                counterAxisAlignItems: "CENTER",
                padding: [2, 2, 2, 2],
                width: 36,
                height: 20,
                cornerRadius: 10,
                fill: isChecked ? parseRgb("rgb(61, 220, 151)") : parseRgb("rgb(50, 56, 82)"),
                children: [
                  {
                    type: "FRAME",
                    name: "switch-knob",
                    width: 16,
                    height: 16,
                    cornerRadius: 8,
                    fill: { r: 1, g: 1, b: 1, a: 1 },
                    children: []
                  }
                ]
              },
              {
                type: "TEXT",
                characters: labelText,
                fontSize: 13,
                fontWeight: "400",
                fontFamily: "Inter",
                color: parseRgb(cs.color) || { r: 0.9, g: 0.9, b: 0.95, a: 1 },
                textAlign: "LEFT"
              }
            ]
          };
        }

        // Range Slider (<input type="range">)
        if (tag === "input" && el.type === "range") {
          const min = parseFloat(el.min) || 0;
          const max = parseFloat(el.max) || 100;
          const val = parseFloat(el.value) || 50;
          const pct = Math.max(0, Math.min(1, (val - min) / (max - min || 1)));
          const trackWidth = Math.max(Math.round(rect.width), 100);
          const knobX = Math.round(pct * (trackWidth - 16));

          return {
            type: "FRAME",
            name: `Slider [${val}]`,
            layoutMode: "HORIZONTAL",
            counterAxisAlignItems: "CENTER",
            width: trackWidth,
            height: Math.max(Math.round(rect.height), 18),
            flexGrow: parseFloat(cs.flexGrow) || 0,
            fill: null,
            children: [
              {
                type: "FRAME",
                name: "track",
                layoutMode: "HORIZONTAL",
                primaryAxisAlignItems: "MIN",
                counterAxisAlignItems: "CENTER",
                width: trackWidth,
                height: 4,
                cornerRadius: 2,
                fill: parseRgb("rgb(50, 56, 82)") || { r: 0.2, g: 0.22, b: 0.32, a: 1 },
                children: [
                  {
                    type: "FRAME",
                    name: "filled-bar",
                    width: Math.max(knobX, 4),
                    height: 4,
                    cornerRadius: 2,
                    fill: parseRgb("rgb(112, 163, 217)") || { r: 0.44, g: 0.64, b: 0.85, a: 1 },
                    children: []
                  }
                ]
              }
            ]
          };
        }

        // Color Picker (<input type="color">)
        if (tag === "input" && el.type === "color") {
          return {
            type: "FRAME",
            name: `ColorSwatch [${el.value}]`,
            width: Math.round(rect.width) || 42,
            height: Math.round(rect.height) || 30,
            cornerRadius: Math.round(parseFloat(cs.borderRadius) || 6),
            fill: parseRgb(el.value) || parseRgb("rgb(23, 26, 36)"),
            borderWidth: 1,
            borderColor: parseRgb("rgb(50, 56, 82)"),
            children: []
          };
        }

        // Select Dropdown (<select>)
        if (tag === "select") {
          const selectedText = el.options && el.selectedIndex >= 0 && el.options[el.selectedIndex]
            ? el.options[el.selectedIndex].text
            : el.value || "Select";
          return {
            type: "FRAME",
            name: `Select / ${selectedText}`,
            layoutMode: "HORIZONTAL",
            primaryAxisAlignItems: "SPACE_BETWEEN",
            counterAxisAlignItems: "CENTER",
            width: Math.round(rect.width),
            height: Math.max(Math.round(rect.height), 32),
            padding: [6, 10, 6, 12],
            cornerRadius: Math.round(parseFloat(cs.borderRadius) || 6),
            fill: parseRgb(cs.backgroundColor) || parseRgb("rgb(23, 26, 36)"),
            borderWidth: Math.round(parseFloat(cs.borderWidth) || 1),
            borderColor: parseRgb(cs.borderColor) || parseRgb("rgb(50, 56, 82)"),
            children: [
              {
                type: "TEXT",
                characters: selectedText,
                fontSize: parseFloat(cs.fontSize) || 13,
                fontWeight: cs.fontWeight || "400",
                fontFamily: "Inter",
                color: parseRgb(cs.color) || { r: 0.9, g: 0.9, b: 0.95, a: 1 },
                textAlign: "LEFT"
              },
              {
                type: "ICON",
                name: "Icon / expand_more",
                iconName: "expand_more",
                width: 16,
                height: 16,
                color: parseRgb(cs.color) || { r: 0.7, g: 0.7, b: 0.8, a: 1 }
              }
            ]
          };
        }

        // Color Swatch Button (.palbtn)
        if (cls.includes("palbtn")) {
          return {
            type: "FRAME",
            name: "palbtn",
            width: Math.round(rect.width) || 27,
            height: Math.round(rect.height) || 20,
            cornerRadius: 5,
            fill: parseRgb(cs.backgroundColor) || { r: 1, g: 1, b: 1, a: 0.2 },
            borderWidth: 1,
            borderColor: { r: 1, g: 1, b: 1, a: 0.2 },
            children: []
          };
        }

        // Component detection
        const isBaButton =
          (cls.includes("figma-button") ||
          el.getAttribute("data-ba-component") === "Button" ||
          (tag === "button" && !cls.includes("figma-icon-button"))) &&
          !cls.includes("preset-pick") &&
          !cls.includes("palbtn") &&
          !el.querySelector("canvas");

        const isBaIconButton =
          cls.includes("figma-icon-button") ||
          el.getAttribute("data-ba-component") === "IconButton" ||
          (tag === "button" && (cls.includes("icon") || Math.abs(rect.width - rect.height) < 8 && rect.width <= 52));

        const isBaInput =
          cls.includes("figma-input") ||
          el.getAttribute("data-ba-component") === "InputField" ||
          tag === "input" && (el.type === "text" || el.type === "number");

        const isCanvas = tag === "canvas";

        recordColorAudit(cs.backgroundColor);
        recordColorAudit(cs.color);

        // 1. BA BUTTON COMPONENT
        if (isBaButton) {
          const labelEl = el.querySelector(".figma-label");
          const rawText = labelEl ? labelEl.innerText.trim() : (el.innerText ? el.innerText.trim() : "");
          const bgRgb = cs.backgroundColor;
          let variant = "Default";
          if (bgRgb.includes("112, 163, 217") || bgRgb.includes("0, 83, 208") || cls.includes("primary")) {
            variant = "Primary";
          } else if (bgRgb === "transparent" || bgRgb === "rgba(0, 0, 0, 0)" || cls.includes("ghost")) {
            variant = "Ghost";
          }
          const size = rect.height >= 34 ? "Large" : "Small";
          const variantId = el.getAttribute("data-figma-variant") || null;

          const iconEl = el.querySelector("svg, .material-symbols-rounded, [class*='icon'], i");
          let hasLeadingIcon = false;
          let hasTailingIcon = false;
          let iconName = null;

          if (iconEl) {
            iconName = iconEl.innerText.trim() || iconEl.getAttribute("aria-label") || iconEl.getAttribute("data-icon") || "";
            if (!iconName && iconEl.className && typeof iconEl.className === "string") {
              const match = iconEl.className.match(/bx[s]?-([a-z0-9-]+)/);
              if (match) iconName = match[1];
            }
            if (iconName) detectedIconsSet.add(iconName);

            if (el.lastElementChild === iconEl && rawText) {
              hasTailingIcon = true;
            } else {
              hasLeadingIcon = true;
            }
          }

          return {
            type: "BA_COMPONENT",
            component: "Button",
            variantId,
            name: rawText ? `Button / ${rawText}` : `Button / ${variant} / ${size}`,
            props: {
              Type: variant,
              Size: size,
              Button: rawText || "Button",
              Enabled: !el.disabled ? "True" : "False",
              hasLeadingIcon,
              hasTailingIcon,
              iconName
            },
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          };
        }

        // 2. BA ICON BUTTON COMPONENT
        if (isBaIconButton) {
          let iconName = el.innerText.trim();
          if (!iconName) {
            iconName = el.getAttribute("aria-label") || el.getAttribute("title") || "";
          }
          if (!iconName) {
            const iconEl = el.querySelector("svg, .material-symbols-rounded, [class*='icon'], i");
            if (iconEl) {
              iconName = iconEl.innerText.trim() || iconEl.getAttribute("aria-label") || "";
              if (!iconName && iconEl.className && typeof iconEl.className === "string") {
                const match = iconEl.className.match(/bx[s]?-([a-z0-9-]+)/);
                if (match) iconName = match[1];
              }
            }
          }
          if (!iconName) iconName = "settings";
          detectedIconsSet.add(iconName);

          const size = rect.height >= 36 ? "Large" : "Small";
          return {
            type: "BA_COMPONENT",
            component: "IconButton",
            name: `IconButton / ${size} / ${iconName}`,
            props: {
              Type: "Default",
              Size: size,
              Icon: iconName,
              Enabled: !el.disabled ? "True" : "False"
            },
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          };
        }

        // 3. BA INPUT FIELD COMPONENT
        if (isBaInput) {
          return {
            type: "BA_COMPONENT",
            component: "InputField",
            name: "InputField",
            props: {
              Active: document.activeElement === el ? "True" : "False",
              Label: el.getAttribute("placeholder") || "Input",
              input: el.value || ""
            },
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          };
        }

        // 4. CANVAS / GRAPHIC SNAPSHOT
        if (isCanvas) {
          let dataUrl = "";
          try {
            dataUrl = el.toDataURL("image/png");
          } catch (_) {}
          return {
            type: "IMAGE_CANVAS",
            name: "Canvas Viewport Snapshot",
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            dataUrl
          };
        }

        // 5. UNIFIED PARAGRAPH / NOTICE TEXT CHECK
        const isNoticeOrParagraph =
          (tag === "p" || cls.includes("notice") || cls.includes("mini") || cls.includes("tmeta")) &&
          el.querySelectorAll("input, select, button, canvas").length === 0;

        if (isNoticeOrParagraph) {
          const rawText = el.innerText ? el.innerText.trim() : "";
          if (rawText.length > 0 && !el.querySelector(".material-symbols-rounded, .icon")) {
            const fontFam = cs.fontFamily || "Inter";
            const isInter = fontFam.toLowerCase().includes("inter");
            if (!isInter) unmappedFontsSet.add(fontFam.split(",")[0].replace(/['"]/g, ""));

            const hasContainerStyle =
              (parseFloat(cs.paddingTop) > 4) ||
              (parseFloat(cs.borderWidth) > 0) ||
              (cs.backgroundColor && cs.backgroundColor !== "transparent" && cs.backgroundColor !== "rgba(0, 0, 0, 0)");

            if (!hasContainerStyle) {
              return {
                type: "TEXT",
                characters: rawText,
                fontSize: parseFloat(cs.fontSize) || 12,
                fontWeight: cs.fontWeight || "400",
                fontFamily: fontFam,
                isUnmappedFont: !isInter,
                color: parseRgb(cs.color) || { r: 0.9, g: 0.9, b: 0.95, a: 1 },
                textAlign: cs.textAlign.toUpperCase() === "CENTER" ? "CENTER" : "LEFT"
              };
            }
          }
        }

        // 6. AUTO-LAYOUT CONTAINER
        const display = cs.display;
        const isFlex = display === "flex" || display === "inline-flex";
        const isGrid = display === "grid" || display === "inline-grid";

        let layoutMode = "VERTICAL";
        let layoutWrap = "NO_WRAP";

        if (isFlex && cs.flexDirection.includes("row")) {
          layoutMode = "HORIZONTAL";
        } else if (isGrid) {
          const cols = cs.gridTemplateColumns ? cs.gridTemplateColumns.split(/\s+/).filter(Boolean) : [];
          if (cols.length > 1) {
            layoutMode = "HORIZONTAL";
          }
        }

        // Multi-column or wrapping row detection
        if (
          cls.includes("presets") ||
          cls.includes("palrow") ||
          cls.includes("swatches") ||
          cs.flexWrap === "wrap" ||
          (isGrid && cs.gridTemplateColumns && cs.gridTemplateColumns.split(/\s+/).filter(Boolean).length > 1)
        ) {
          layoutMode = "HORIZONTAL";
          layoutWrap = "WRAP";
        }

        // Geometry-based row detection (e.g. 3-column studio grid)
        if (layoutMode === "VERTICAL" && el.children.length >= 2) {
          const r0 = el.children[0].getBoundingClientRect();
          const r1 = el.children[1].getBoundingClientRect();
          if (Math.abs(r0.top - r1.top) < 18 && r1.left >= r0.right - 8) {
            layoutMode = "HORIZONTAL";
          }
        }

        // Specific overrides for studio containers
        if (cls.includes("topbar") || cls.includes("hkeys") || cls.includes("transport") || tag === "summary" || cls.includes("btnrow") || cls.includes("statline") || cls.includes("two") || tag === "kbd") {
          layoutMode = "HORIZONTAL";
        }

        let counterAxisAlignItems = "MIN";
        if (cs.alignItems.includes("center")) counterAxisAlignItems = "CENTER";
        else if (cs.alignItems.includes("flex-end") || cs.alignItems.includes("end")) counterAxisAlignItems = "MAX";

        let primaryAxisAlignItems = "MIN";
        if (cs.justifyContent.includes("space-between")) primaryAxisAlignItems = "SPACE_BETWEEN";
        else if (cs.justifyContent.includes("center")) primaryAxisAlignItems = "CENTER";
        else if (cs.justifyContent.includes("flex-end") || cs.justifyContent.includes("end")) primaryAxisAlignItems = "MAX";

        if (tag === "summary" || cls.includes("topbar") || cls.includes("transport") || cls.includes("statline") || cls.includes("hkeys") || tag === "kbd") {
          counterAxisAlignItems = "CENTER";
        }
        if (tag === "summary" || cls.includes("statline")) {
          primaryAxisAlignItems = "SPACE_BETWEEN";
        }
        if (tag === "kbd") {
          primaryAxisAlignItems = "CENTER";
        }

        const gapVal = parseFloat(cs.gap) || parseFloat(cs.rowGap) || parseFloat(cs.columnGap) || (cls.includes("hkeys") ? 6 : 0);
        const pt = parseFloat(cs.paddingTop) || 0;
        const pr = parseFloat(cs.paddingRight) || 0;
        const pb = parseFloat(cs.paddingBottom) || 0;
        const pl = parseFloat(cs.paddingLeft) || 0;
        const radius = parseFloat(cs.borderRadius) || 0;

        let bgColor = parseRgb(cs.backgroundColor);
        let boundToken = null;
        let isUnmappedColor = false;
        let unmappedHex = null;

        if (cs.backgroundColor && cs.backgroundColor !== "transparent" && cs.backgroundColor !== "rgba(0, 0, 0, 0)") {
          if (TOKEN_MAP[cs.backgroundColor]) {
            boundToken = TOKEN_MAP[cs.backgroundColor];
          } else {
            isUnmappedColor = true;
            unmappedHex = rgbToHex(cs.backgroundColor);
          }
        }

        const borderWidth = parseFloat(cs.borderWidth) || 0;
        const borderColor = borderWidth > 0 ? parseRgb(cs.borderColor) : null;
        let boundBorderToken = null;
        if (borderWidth > 0 && cs.borderColor && TOKEN_MAP[cs.borderColor]) {
          boundBorderToken = TOKEN_MAP[cs.borderColor];
        }

        // Traverse childNodes (preserves inline text nodes next to elements)
        const children = [];
        for (const childNode of el.childNodes) {
          if (childNode.nodeType === Node.ELEMENT_NODE) {
            const parsedChild = extractNode(childNode, depth + 1);
            if (parsedChild) children.push(parsedChild);
          } else if (childNode.nodeType === Node.TEXT_NODE) {
            const rawText = childNode.textContent ? childNode.textContent.trim() : "";
            if (rawText.length > 0) {
              const fontFam = cs.fontFamily || "Inter";
              const isInter = fontFam.toLowerCase().includes("inter");
              if (!isInter) unmappedFontsSet.add(fontFam.split(",")[0].replace(/['"]/g, ""));
              children.push({
                type: "TEXT",
                characters: rawText,
                fontSize: parseFloat(cs.fontSize) || 12,
                fontWeight: cs.fontWeight,
                fontFamily: fontFam,
                isUnmappedFont: !isInter,
                color: parseRgb(cs.color) || { r: 0.9, g: 0.9, b: 0.95, a: 1 },
                boundToken: TOKEN_MAP[cs.color] || null,
                textAlign: cs.textAlign.toUpperCase() === "CENTER" ? "CENTER" : "LEFT"
              });
            }
          }
        }

        return {
          type: "FRAME",
          name: `${tag}${cls ? "." + cls.split(" ")[0] : ""}`,
          layoutMode,
          layoutWrap,
          primaryAxisAlignItems,
          counterAxisAlignItems,
          itemSpacing: Math.round(gapVal),
          padding: [Math.round(pt), Math.round(pr), Math.round(pb), Math.round(pl)],
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          flexGrow: parseFloat(cs.flexGrow) || 0,
          cornerRadius: Math.round(radius),
          fill: bgColor,
          boundToken,
          borderWidth: Math.round(borderWidth),
          borderColor,
          boundBorderToken,
          isUnmappedColor,
          unmappedHex,
          children
        };
      }

      const rootEl = document.querySelector("#root") || document.body;
      const rootAST = extractNode(rootEl);

      // Ensure root artboard has effective dark background
      if (rootAST && !rootAST.fill) {
        rootAST.fill = parseRgb(effectiveBgStr);
        rootAST.boundToken = TOKEN_MAP[effectiveBgStr] || { name: "--ba-background", token: "--background" };
      }

      return {
        sceneAST: rootAST,
        audit: {
          detectedIcons: Array.from(detectedIconsSet),
          unmappedColors: Array.from(unmappedColorsMap.values()),
          unmappedFonts: Array.from(unmappedFontsSet)
        }
      };
    }, KNOWN_BA_COLORS);

    const pageTitle = await page.title();
    await browser.close();
    if (cleanup) cleanup();

    return {
      success: true,
      title: pageTitle,
      viewport,
      target: targetInput,
      scene: sceneAST,
      audit
    };
  } catch (err) {
    if (browser) await browser.close();
    if (cleanup) cleanup();
    throw err;
  }
}

export function startBridgeServer() {
  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }

    const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);

    if (req.method === "GET" && parsedUrl.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          status: "ok",
          system: "BA Design System Bridge",
          port: PORT,
          timestamp: new Date().toISOString()
        })
      );
    }

    if (req.method === "GET" && parsedUrl.pathname === "/extract") {
      const targetUrl = parsedUrl.searchParams.get("url");
      if (!targetUrl) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Missing 'url' query parameter" }));
      }
      try {
        console.log(`[Bridge GET] Extracting URL: ${targetUrl}`);
        const result = await extractPageToFigmaAST(targetUrl);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(result));
      } catch (err) {
        console.error(`[Bridge Error] ${err.message}`);
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: err.message }));
      }
    }

    if (req.method === "POST" && parsedUrl.pathname === "/extract") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        try {
          const payload = JSON.parse(body || "{}");
          if (!payload.url) {
            res.writeHead(400, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Missing 'url' parameter" }));
          }

          console.log(`[Bridge] Extracting URL: ${payload.url}`);
          const result = await extractPageToFigmaAST(payload.url, payload.viewport);
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(result));
        } catch (err) {
          console.error(`[Bridge Error] ${err.message}`);
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Endpoint not found" }));
  });

  server.listen(PORT, () => {
    console.log(`\n========================================================================`);
    console.log(`  ⚡ BA DESIGN SYSTEM — FIGMA EXTRACTOR BRIDGE LISTENING ON :${PORT}   `);
    console.log(`========================================================================`);
    console.log(`  Health Check: http://localhost:${PORT}/health`);
    console.log(`  Ready to receive requests from BA Reconstructor Figma Plugin.\n`);
  });

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2];
  if (arg === "extract" || arg === "replicate") {
    const target = process.argv[3] || "http://localhost:5173";
    console.log(`Extracting: ${target}...`);
    extractPageToFigmaAST(target)
      .then((res) => {
        const outPath = path.resolve(ROOT, "dist/extracted-scene.json");
        fs.writeFileSync(outPath, JSON.stringify(res, null, 2));
        console.log(`✓ Extraction complete! Saved scene AST to: ${outPath}`);
        console.log(`✓ Scene Root: ${res.scene?.name} (${res.scene?.width} × ${res.scene?.height})`);
        console.log(`✓ Root Fill:`, res.scene?.fill);
        console.log(`✓ Detected ${res.audit?.detectedIcons?.length || 0} icons:`, res.audit?.detectedIcons);
        process.exit(0);
      })
      .catch((err) => {
        console.error("❌ Extraction failed:", err.message);
        process.exit(1);
      });
  } else {
    startBridgeServer();
  }
}
