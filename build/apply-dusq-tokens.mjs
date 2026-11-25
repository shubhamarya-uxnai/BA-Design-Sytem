#!/usr/bin/env node
import { existsSync } from "node:fs";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, "..");

const LADDER_STEPS = [
  "0", "50", "100", "150", "200", "250", "300", "350", "400", "450",
  "500", "550", "600", "650", "700", "750", "800", "850", "900", "950"
];

const SECONDARY_STEPS = [
  "0", "100", "200", "300", "400", "500", "600", "700", "800", "900"
];

const RADIUS_NAMES = [
  "Corner radius/S",
  "Corner radius/M",
  "Corner radius/L",
  "Corner radius/XL"
];

const WARM_LADDER_IDS = {
  "0": "VariableID:2062:820",
  "50": "VariableID:2113:820",
  "100": "VariableID:2058:822",
  "150": "VariableID:2113:821",
  "200": "VariableID:2058:823",
  "250": "VariableID:2113:822",
  "300": "VariableID:2058:824",
  "350": "VariableID:2113:823",
  "400": "VariableID:2058:825",
  "450": "VariableID:2113:824",
  "500": "VariableID:2058:826",
  "550": "VariableID:2113:825",
  "600": "VariableID:2058:827",
  "650": "VariableID:2113:826",
  "700": "VariableID:2058:828",
  "750": "VariableID:2113:827",
  "800": "VariableID:2058:829",
  "850": "VariableID:2113:828",
  "900": "VariableID:2058:830",
  "950": "VariableID:2058:831"
};

const BASE_NEUTRAL_IDS = Object.fromEntries(
  LADDER_STEPS.map((step, index) => [step, `VariableID:2108:${840 + index}`])
);

const COLOR_HEX = (c) => {
  if (!c || typeof c !== "object") return null;
  const h = (n) => Math.round((n || 0) * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${h(c.r)}${h(c.g)}${h(c.b)}`;
};

const approxColorEqual = (a, b, tol = 0.002) =>
  a && b &&
  typeof a === "object" && typeof b === "object" &&
  Math.abs((a.r ?? 0) - (b.r ?? 0)) <= tol &&
  Math.abs((a.g ?? 0) - (b.g ?? 0)) <= tol &&
  Math.abs((a.b ?? 0) - (b.b ?? 0)) <= tol &&
  Math.abs((a.a ?? 1) - (b.a ?? 1)) <= tol;

const readJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));
const writeJson = async (filePath, data) => writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

/**
 * Extract the canonical BA -> DUSQ token & style patch from this workspace's `source/` files.
 */
export async function buildDusqTokenPatch(rootDir = ROOT) {
  const sourceDir = join(rootDir, "source");
  const primCol = await readJson(join(sourceDir, "collections", "primitive-color-tokens.json"));
  const themesCol = await readJson(join(sourceDir, "collections", "color-themes.json"));
  const screenCol = await readJson(join(sourceDir, "collections", "screen-size-switch.json"));
  const spaceCol = await readJson(join(sourceDir, "collections", "space.json"));
  const typoCol = await readJson(join(sourceDir, "collections", "typography.json"));
  const textStylesSpec = await readJson(join(sourceDir, "specs", "text-styles.json"));

  const primByName = new Map(primCol.variables.map((v) => [v.name, v]));
  const themesByName = new Map(themesCol.variables.map((v) => [v.name, v]));
  const screenByName = new Map(screenCol.variables.map((v) => [v.name, v]));
  const spaceById = new Map(spaceCol.variables.map((v) => [v.id, v]));
  const typoByName = new Map(typoCol.variables.map((v) => [v.name, v]));

  const primModeId = primCol.collection.modes.find((m) => m.name === "Value")?.modeId || primCol.collection.defaultModeId;
  const warmModeId = themesCol.collection.modes.find((m) => m.name === "Warm")?.modeId || "138:0";
  const coolModeId = themesCol.collection.modes.find((m) => m.name === "Cool")?.modeId || "22:0";
  const typoModeId = typoCol.collection.modes[0]?.modeId || typoCol.collection.defaultModeId;

  const mobileModeId = screenCol.collection.modes.find((m) => m.name === "Mobile")?.modeId || "3:4";
  const tabletModeId = screenCol.collection.modes.find((m) => m.name === "Tablet")?.modeId || "2166:1";
  const desktopModeId = screenCol.collection.modes.find((m) => m.name === "Desktop")?.modeId || "33:0";

  const baseNeutralLadder = LADDER_STEPS.map((step) => {
    const v = primByName.get(`neutral/${step}`);
    if (!v) throw new Error(`Missing primitive variable neutral/${step} in source.`);
    const value = v.valuesByMode[primModeId];
    return {
      id: v.id || BASE_NEUTRAL_IDS[step],
      step,
      name: v.name,
      legacyBaName: `warm/${step}`,
      description: v.description ?? "",
      value,
      hex: COLOR_HEX(value)
    };
  });

  const warmStoneLadder = LADDER_STEPS.map((step) => {
    const v = primByName.get(`warm/${step}`);
    if (!v) throw new Error(`Missing primitive variable warm/${step} in source.`);
    const value = v.valuesByMode[primModeId];
    return {
      id: v.id || WARM_LADDER_IDS[step],
      step,
      name: v.name,
      legacyBaName: `neutral/${step}`,
      description: v.description ?? "",
      value,
      hex: COLOR_HEX(value)
    };
  });

  const orangeLadder = SECONDARY_STEPS.map((step, idx) => {
    const v = primByName.get(`orange/${step}`);
    if (!v) throw new Error(`Missing primitive variable orange/${step} in source.`);
    const value = v.valuesByMode[primModeId];
    return {
      id: v.id || `VariableID:2109:${850 + idx}`,
      step,
      name: v.name,
      description: v.description ?? "",
      value,
      hex: COLOR_HEX(value)
    };
  });

  const primaryThemes = SECONDARY_STEPS.map((step) => {
    const v = themesByName.get(`primary/${step}`);
    if (!v) throw new Error(`Missing Color Themes variable primary/${step} in source.`);
    return {
      id: v.id,
      step,
      name: v.name,
      description: v.description ?? "",
      targets: {
        Warm: {
          modeId: warmModeId,
          targetName: `orange/${step}`,
          id: v.valuesByMode[warmModeId]?.id
        },
        Cool: {
          modeId: coolModeId,
          targetName: `orange/${step}`,
          id: v.valuesByMode[coolModeId]?.id
        }
      }
    };
  });

  const secondaryThemes = SECONDARY_STEPS.map((step) => {
    const v = themesByName.get(`secondary/${step}`);
    if (!v) throw new Error(`Missing Color Themes variable secondary/${step} in source.`);
    return {
      id: v.id,
      step,
      name: v.name,
      description: v.description ?? "",
      targets: {
        Warm: {
          modeId: warmModeId,
          targetName: `neutral/${step}`,
          id: v.valuesByMode[warmModeId]?.id
        },
        Cool: {
          modeId: coolModeId,
          targetName: `neutral/${step}`,
          id: v.valuesByMode[coolModeId]?.id
        }
      }
    };
  });

  const baseThemes = LADDER_STEPS.map((step) => {
    const v = themesByName.get(`base/${step}`);
    if (!v) throw new Error(`Missing Color Themes variable base/${step} in source.`);
    return {
      id: v.id,
      step,
      name: v.name,
      description: v.description ?? "",
      targets: {
        Warm: {
          modeId: warmModeId,
          targetName: `neutral/${step}`,
          id: v.valuesByMode[warmModeId]?.id
        },
        Cool: {
          modeId: coolModeId,
          targetName: `neutral/${step}`,
          id: v.valuesByMode[coolModeId]?.id
        }
      }
    };
  });

  const cornerRadii = RADIUS_NAMES.map((name) => {
    const v = screenByName.get(name);
    if (!v) throw new Error(`Missing Screen Size Switch variable ${name} in source.`);
    return {
      id: v.id,
      name: v.name,
      description: v.description ?? "",
      valuesByMode: {
        Mobile: {
          modeId: mobileModeId,
          spaceName: spaceById.get(v.valuesByMode[mobileModeId]?.id)?.name || "",
          id: v.valuesByMode[mobileModeId]?.id
        },
        Tablet: {
          modeId: tabletModeId,
          spaceName: spaceById.get(v.valuesByMode[tabletModeId]?.id)?.name || "",
          id: v.valuesByMode[tabletModeId]?.id
        },
        Desktop: {
          modeId: desktopModeId,
          spaceName: spaceById.get(v.valuesByMode[desktopModeId]?.id)?.name || "",
          id: v.valuesByMode[desktopModeId]?.id
        }
      }
    };
  });

  const typographyVars = ["Font Family/Display", "Font Family/Body", "Font Family/Title"].map((name) => {
    const v = typoByName.get(name);
    if (!v) throw new Error(`Missing Typography variable ${name} in source.`);
    return {
      id: v.id,
      name: v.name,
      resolvedType: v.resolvedType,
      description: v.description ?? "",
      value: v.valuesByMode[typoModeId]
    };
  });

  const totalMutatedVars =
    baseNeutralLadder.length +
    warmStoneLadder.length +
    orangeLadder.length +
    primaryThemes.length +
    secondaryThemes.length +
    baseThemes.length +
    cornerRadii.length +
    typographyVars.length;

  return {
    schemaVersion: "1.0.0",
    targetBrand: "DUSQ",
    sourceBrand: "BA Design System",
    collections: {
      primitiveColorTokens: {
        id: primCol.collection.id,
        name: primCol.collection.name,
        modeName: "Value",
        modeId: primModeId
      },
      colorThemes: {
        id: themesCol.collection.id,
        name: themesCol.collection.name,
        modes: { Warm: warmModeId, Cool: coolModeId }
      },
      screenSizeSwitch: {
        id: screenCol.collection.id,
        name: screenCol.collection.name,
        modes: { Mobile: mobileModeId, Tablet: tabletModeId, Desktop: desktopModeId }
      },
      space: {
        id: spaceCol.collection.id,
        name: spaceCol.collection.name,
        modeId: spaceCol.collection.defaultModeId
      },
      typography: {
        id: typoCol.collection.id,
        name: typoCol.collection.name,
        modeName: "Mode 1",
        modeId: typoModeId
      }
    },
    counts: {
      primitiveBaseNeutralVars: baseNeutralLadder.length,
      primitiveWarmStoneVars: warmStoneLadder.length,
      orangeReferenceVars: orangeLadder.length,
      colorThemeAliasVars: primaryThemes.length + secondaryThemes.length + baseThemes.length,
      cornerRadiiVars: cornerRadii.length,
      typographyVars: typographyVars.length,
      totalMutatedVars,
      textStyles: textStylesSpec.styles.length
    },
    primitives: {
      baseNeutralLadder,
      warmStoneLadder,
      orangeLadder
    },
    colorThemes: {
      primary: primaryThemes,
      secondary: secondaryThemes,
      base: baseThemes
    },
    cornerRadii,
    typography: typographyVars,
    textStylesSpec
  };
}

/**
 * Compile a self-contained Figma Plugin API script (top-level `await` + `return`) that migrates
 * a duplicated BA Design System Figma file to DUSQ tokens & text styles idempotently.
 */
export function generateFigmaRunnerScript(patch) {
  const payload = {
    collections: patch.collections,
    primitives: patch.primitives,
    colorThemes: patch.colorThemes,
    cornerRadii: patch.cornerRadii,
    typography: patch.typography,
    textStyles: patch.textStylesSpec.styles
  };

  return `// Auto-generated by build/apply-dusq-tokens.mjs
// Transforms a BA Design System Figma file (or copy) to DUSQ Design System tokens & text styles.
// Compatible with Figma MCP \`use_figma\`, \`figma_execute\`, and async Plugin API runners.

const PATCH = ${JSON.stringify(payload, null, 2)};

const idSuffix = (id) => {
  const parts = String(id || "").split(":");
  return parts.length >= 2 ? parts.slice(-2).join(":") : String(id || "");
};

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const allVars = await figma.variables.getLocalVariablesAsync();

const findCollection = (meta) =>
  collections.find((c) => c.name === meta.name) ||
  collections.find((c) => c.id === meta.id) ||
  collections.find((c) => c.id.endsWith(idSuffix(meta.id)));

const primCol = findCollection(PATCH.collections.primitiveColorTokens);
const themesCol = findCollection(PATCH.collections.colorThemes);
const screenCol = findCollection(PATCH.collections.screenSizeSwitch);
const spaceCol = findCollection(PATCH.collections.space);
const typoCol = findCollection(PATCH.collections.typography);

if (!primCol || !themesCol || !typoCol) {
  throw new Error(
    "Missing required BA Design System variable collections in Figma file: " +
    JSON.stringify({
      primitiveColorTokens: !!primCol,
      colorThemes: !!themesCol,
      screenSizeSwitch: !!screenCol,
      space: !!spaceCol,
      typography: !!typoCol
    })
  );
}

const getModeId = (col, preferredName, preferredId) =>
  col.modes.find((m) => m.name === preferredName)?.modeId ||
  col.modes.find((m) => m.modeId === preferredId)?.modeId ||
  col.modes[0]?.modeId;

const primModeId = getModeId(primCol, "Value", PATCH.collections.primitiveColorTokens.modeId);
const warmModeId = getModeId(themesCol, "Warm", PATCH.collections.colorThemes.modes.Warm);
const coolModeId = getModeId(themesCol, "Cool", PATCH.collections.colorThemes.modes.Cool);
const typoModeId = getModeId(typoCol, "Mode 1", PATCH.collections.typography.modeId);

const varsIn = (col) => col ? allVars.filter((v) => v.variableCollectionId === col.id) : [];
const indexCollection = (col) => {
  const list = varsIn(col);
  return {
    list,
    byId: new Map(list.map((v) => [v.id, v])),
    bySuffix: new Map(list.map((v) => [idSuffix(v.id), v])),
    byName: new Map(list.map((v) => [v.name, v]))
  };
};

const primIdx = indexCollection(primCol);
const themesIdx = indexCollection(themesCol);
const screenIdx = indexCollection(screenCol);
const spaceIdx = indexCollection(spaceCol);
const typoIdx = indexCollection(typoCol);

const warnings = [];
let primitivesRenamed = 0;
let primitivesUpdated = 0;
let themeAliasesUpdated = 0;
let cornerRadiiUpdated = 0;
let typographyVarsUpdated = 0;
let textStylesUpdated = 0;
let textStylesCreated = 0;

// ---------------------------------------------------------------------------
// 1. Disambiguate BA neutral/* <-> warm/* ladders safely before renaming
// ---------------------------------------------------------------------------
const resolveByAnyKey = (idx, id, names) => {
  if (!idx) return null;
  if (id && idx.byId.has(id)) return idx.byId.get(id);
  if (id && idx.bySuffix.has(idSuffix(id))) return idx.bySuffix.get(idSuffix(id));
  for (const name of names) {
    if (name && idx.byName.has(name)) return idx.byName.get(name);
  }
  return null;
};

const baseStepTargets = new Map();
for (const entry of PATCH.primitives.baseNeutralLadder) {
  const baseVar = resolveByAnyKey(themesIdx, null, [\`base/\${entry.step}\`]);
  const warmVal = baseVar?.valuesByMode?.[warmModeId];
  let resolved = null;
  if (warmVal && typeof warmVal === "object" && warmVal.type === "VARIABLE_ALIAS") {
    resolved = primIdx.byId.get(warmVal.id) || null;
  }
  if (!resolved) {
    resolved = resolveByAnyKey(primIdx, entry.id, []);
  }
  if (!resolved) {
    resolved = resolveByAnyKey(primIdx, null, [entry.name, entry.legacyBaName]);
  }
  if (resolved) baseStepTargets.set(entry.step, resolved);
}

const usedBaseIds = new Set([...baseStepTargets.values()].map((v) => v.id));
const warmStepTargets = new Map();
for (const entry of PATCH.primitives.warmStoneLadder) {
  let resolved = resolveByAnyKey(primIdx, entry.id, []);
  if (resolved && usedBaseIds.has(resolved.id)) resolved = null;
  if (!resolved) {
    for (const candidateName of [entry.legacyBaName, entry.name]) {
      const candidate = primIdx.byName.get(candidateName);
      if (candidate && !usedBaseIds.has(candidate.id)) {
        resolved = candidate;
        break;
      }
    }
  }
  if (resolved) warmStepTargets.set(entry.step, resolved);
}

// Phase A: temporary prefix avoids name collision during neutral/* <-> warm/* swap
for (const entry of PATCH.primitives.baseNeutralLadder) {
  const v = baseStepTargets.get(entry.step);
  if (v && v.name !== entry.name) {
    v.name = \`__dusq_tmp_neutral/\${entry.step}\`;
  }
}
for (const entry of PATCH.primitives.warmStoneLadder) {
  const v = warmStepTargets.get(entry.step);
  if (v && v.name !== entry.name) {
    v.name = \`__dusq_tmp_warm/\${entry.step}\`;
  }
}

// Phase B: final names, colors, and descriptions
for (const entry of PATCH.primitives.baseNeutralLadder) {
  const v = baseStepTargets.get(entry.step);
  if (!v) {
    warnings.push(\`Missing Primitive base neutral variable for step \${entry.step}\`);
    continue;
  }
  if (v.name !== entry.name) {
    v.name = entry.name;
    primitivesRenamed++;
  }
  v.setValueForMode(primModeId, entry.value);
  if (entry.description) v.description = entry.description;
  primitivesUpdated++;
}

for (const entry of PATCH.primitives.warmStoneLadder) {
  const v = warmStepTargets.get(entry.step);
  if (!v) {
    warnings.push(\`Missing Primitive warm stone variable for step \${entry.step}\`);
    continue;
  }
  if (v.name !== entry.name) {
    v.name = entry.name;
    primitivesRenamed++;
  }
  v.setValueForMode(primModeId, entry.value);
  if (entry.description) v.description = entry.description;
  primitivesUpdated++;
}

// Ensure orange/0..900 ladder matches DUSQ values
const liveOrangeByStep = new Map();
for (const entry of PATCH.primitives.orangeLadder) {
  let v = resolveByAnyKey(primIdx, entry.id, [entry.name]);
  if (!v) {
    v = figma.variables.createVariable(entry.name, primCol, "COLOR");
    v.scopes = [];
    warnings.push(\`Created missing primitive variable \${entry.name}\`);
  }
  v.setValueForMode(primModeId, entry.value);
  liveOrangeByStep.set(entry.step, v);
  primitivesUpdated++;
}

// ---------------------------------------------------------------------------
// 2. Update Color Themes aliases (primary, secondary, and base ladders)
// ---------------------------------------------------------------------------
for (const entry of PATCH.colorThemes.primary) {
  const themeVar = resolveByAnyKey(themesIdx, entry.id, [entry.name]);
  const targetOrange = liveOrangeByStep.get(entry.step);
  if (!themeVar || !targetOrange) {
    warnings.push(\`Skipped theme alias \${entry.name}\`);
    continue;
  }
  const alias = { type: "VARIABLE_ALIAS", id: targetOrange.id };
  themeVar.setValueForMode(warmModeId, alias);
  themeVar.setValueForMode(coolModeId, alias);
  if (entry.description) themeVar.description = entry.description;
  themeAliasesUpdated++;
}

for (const entry of PATCH.colorThemes.secondary) {
  const themeVar = resolveByAnyKey(themesIdx, entry.id, [entry.name]);
  const targetNeutral = baseStepTargets.get(entry.step);
  if (!themeVar || !targetNeutral) {
    warnings.push(\`Skipped secondary alias \${entry.name}\`);
    continue;
  }
  const alias = { type: "VARIABLE_ALIAS", id: targetNeutral.id };
  themeVar.setValueForMode(warmModeId, alias);
  themeVar.setValueForMode(coolModeId, alias);
  if (entry.description) themeVar.description = entry.description;
  themeAliasesUpdated++;
}

if (Array.isArray(PATCH.colorThemes.base)) {
  for (const entry of PATCH.colorThemes.base) {
    const themeVar = resolveByAnyKey(themesIdx, entry.id, [entry.name]);
    const targetNeutral = baseStepTargets.get(entry.step);
    if (!themeVar || !targetNeutral) {
      warnings.push(\`Skipped base alias \${entry.name}\`);
      continue;
    }
    const alias = { type: "VARIABLE_ALIAS", id: targetNeutral.id };
    themeVar.setValueForMode(warmModeId, alias);
    themeVar.setValueForMode(coolModeId, alias);
    if (entry.description) themeVar.description = entry.description;
    themeAliasesUpdated++;
  }
}

// ---------------------------------------------------------------------------
// 3. Update Corner Radii in Screen Size Switch
// ---------------------------------------------------------------------------
if (screenCol && spaceCol && Array.isArray(PATCH.cornerRadii)) {
  const mobileModeId = getModeId(screenCol, "Mobile", PATCH.collections.screenSizeSwitch?.modes?.Mobile);
  const tabletModeId = getModeId(screenCol, "Tablet", PATCH.collections.screenSizeSwitch?.modes?.Tablet);
  const desktopModeId = getModeId(screenCol, "Desktop", PATCH.collections.screenSizeSwitch?.modes?.Desktop);

  for (const entry of PATCH.cornerRadii) {
    const radiusVar = resolveByAnyKey(screenIdx, entry.id, [entry.name]);
    if (!radiusVar) {
      warnings.push(\`Missing Screen Size Switch variable \${entry.name}\`);
      continue;
    }

    const modes = [
      { modeId: mobileModeId, spec: entry.valuesByMode.Mobile },
      { modeId: tabletModeId, spec: entry.valuesByMode.Tablet },
      { modeId: desktopModeId, spec: entry.valuesByMode.Desktop }
    ];

    for (const m of modes) {
      if (!m.modeId || !m.spec) continue;
      const targetSpace = resolveByAnyKey(spaceIdx, m.spec.id, [m.spec.spaceName]);
      if (targetSpace) {
        radiusVar.setValueForMode(m.modeId, { type: "VARIABLE_ALIAS", id: targetSpace.id });
      } else {
        warnings.push(\`Missing Space variable for \${entry.name} (\${m.spec.spaceName})\`);
      }
    }
    cornerRadiiUpdated++;
  }
}

// ---------------------------------------------------------------------------
// 4. Safely load available fonts, then update Typography variables & Text Styles
// ---------------------------------------------------------------------------
const availableFonts = await figma.listAvailableFontsAsync();
const loadedFontKeys = new Set();

const resolveFont = (family, style = "Regular") => {
  const exact = availableFonts.find(
    (f) => f.fontName.family === family && f.fontName.style === style
  );
  if (exact) return exact.fontName;
  const ci = availableFonts.find(
    (f) =>
      f.fontName.family.toLowerCase() === family.toLowerCase() &&
      f.fontName.style.toLowerCase().replace(/\\s+/g, "") === style.toLowerCase().replace(/\\s+/g, "")
  );
  if (ci) return ci.fontName;
  const sameFamily =
    availableFonts.find((f) => f.fontName.family.toLowerCase() === family.toLowerCase() && f.fontName.style === "Regular") ||
    availableFonts.find((f) => f.fontName.family.toLowerCase() === family.toLowerCase());
  if (sameFamily) {
    warnings.push(\`Font style fallback for \${family} \${style} -> \${sameFamily.fontName.family} \${sameFamily.fontName.style}\`);
    return sameFamily.fontName;
  }
  const fallback =
    availableFonts.find((f) => f.fontName.family === "Inter" && f.fontName.style === "Regular") ||
    availableFonts[0]?.fontName;
  warnings.push(\`Font family unavailable in Figma: \${family} \${style} -> fallback \${fallback?.family} \${fallback?.style}\`);
  return fallback;
};

const ensureFontLoaded = async (fontName) => {
  if (!fontName) return;
  const key = \`\${fontName.family}::\${fontName.style}\`;
  if (loadedFontKeys.has(key)) return;
  await figma.loadFontAsync(fontName);
  loadedFontKeys.add(key);
};

for (const tv of PATCH.typography) {
  const v = resolveByAnyKey(typoIdx, tv.id, [tv.name]);
  if (!v) {
    warnings.push(\`Missing Typography variable \${tv.name}\`);
    continue;
  }
  await ensureFontLoaded(resolveFont(tv.value, "Regular"));
  v.setValueForMode(typoModeId, tv.value);
  typographyVarsUpdated++;
}

const localTextStyles = await figma.getLocalTextStylesAsync();
const stylesByName = new Map(localTextStyles.map((s) => [s.name, s]));

for (const spec of PATCH.textStyles) {
  let style = stylesByName.get(spec.name);
  let created = false;
  if (!style) {
    style = figma.createTextStyle();
    style.name = spec.name;
    created = true;
  }
  if (style.fontName?.family) {
    const existingAvail = availableFonts.find(
      (f) => f.fontName.family === style.fontName.family && f.fontName.style === style.fontName.style
    );
    if (existingAvail) await ensureFontLoaded(existingAvail.fontName);
  }
  const targetFont = resolveFont(spec.fontName.family, spec.fontName.style);
  await ensureFontLoaded(targetFont);
  style.fontName = targetFont;
  style.fontSize = spec.fontSize;
  if (spec.lineHeight) style.lineHeight = spec.lineHeight;
  if (spec.letterSpacing) style.letterSpacing = spec.letterSpacing;
  if (spec.textCase) style.textCase = spec.textCase;
  if (spec.textDecoration) style.textDecoration = spec.textDecoration;
  if (typeof spec.paragraphIndent === "number") style.paragraphIndent = spec.paragraphIndent;
  if (typeof spec.paragraphSpacing === "number") style.paragraphSpacing = spec.paragraphSpacing;
  if (typeof spec.description === "string") style.description = spec.description;
  if (created) textStylesCreated++;
  else textStylesUpdated++;
}

return {
  collectionsMatched: {
    primitiveColorTokens: primCol.name,
    colorThemes: themesCol.name,
    screenSizeSwitch: screenCol?.name || null,
    space: spaceCol?.name || null,
    typography: typoCol.name
  },
  primitivesUpdated,
  primitivesRenamed,
  themeAliasesUpdated,
  cornerRadiiUpdated,
  typographyVarsUpdated,
  textStylesUpdated,
  textStylesCreated,
  warnings
};
`;
}

/**
 * Emit `dist/dusq-token-patch.json` and `dist/figma-apply-dusq-tokens.js` from `rootDir/source/`.
 */
export async function emitDusqMigrationArtifacts(rootDir = ROOT) {
  const patch = await buildDusqTokenPatch(rootDir);
  const distDir = join(rootDir, "dist");
  await mkdir(distDir, { recursive: true });
  const patchPath = join(distDir, "dusq-token-patch.json");
  const scriptPath = join(distDir, "figma-apply-dusq-tokens.js");
  await writeJson(patchPath, patch);
  await writeFile(scriptPath, generateFigmaRunnerScript(patch), "utf8");
  return { patch, patchPath, scriptPath };
}

/**
 * Locate variable collections and optional text-styles file inside a target BA workspace,
 * direct collections folder, or combined JSON file.
 */
async function resolveTargetLayout(targetPath) {
  const resolved = resolve(targetPath);
  if (!existsSync(resolved)) {
    throw new Error(`Target path does not exist: ${resolved}`);
  }

  if (resolved.endsWith(".json")) {
    return { kind: "json-file", filePath: resolved };
  }

  const repoCollections = join(resolved, "source", "collections");
  if (existsSync(repoCollections)) {
    return {
      kind: "directory",
      rootDir: resolved,
      collectionsDir: repoCollections,
      textStylesPath: join(resolved, "source", "specs", "text-styles.json")
    };
  }

  if (existsSync(join(resolved, "primitive-color-tokens.json"))) {
    return {
      kind: "directory",
      rootDir: resolve(resolved, ".."),
      collectionsDir: resolved,
      textStylesPath: join(resolved, "..", "specs", "text-styles.json")
    };
  }

  throw new Error(
    `Could not locate BA Design System collections inside ${resolved} (expected source/collections/*.json or collections/*.json).`
  );
}

function findCollectionVariable(col, id, fallbackNames = []) {
  if (!col || !Array.isArray(col.variables)) return null;
  if (id) {
    const byId = col.variables.find((v) => v.id === id);
    if (byId) return byId;
  }
  for (const name of fallbackNames) {
    const byName = col.variables.find((v) => v.name === name);
    if (byName) return byName;
  }
  return null;
}

function patchCollectionVariables(primCol, themesCol, typoCol, patch, screenCol = null, spaceCol = null) {
  const primModeId = primCol.collection.modes.find((m) => m.name === "Value")?.modeId || primCol.collection.defaultModeId;
  const warmModeId = themesCol.collection.modes.find((m) => m.name === "Warm")?.modeId || "138:0";
  const coolModeId = themesCol.collection.modes.find((m) => m.name === "Cool")?.modeId || "22:0";
  const typoModeId = typoCol.collection.modes[0]?.modeId || typoCol.collection.defaultModeId;

  const primById = new Map(primCol.variables.map((v) => [v.id, v]));
  const themesByName = new Map(themesCol.variables.map((v) => [v.name, v]));

  // Disambiguate baseNeutralLadder vs warmStoneLadder using Color Themes base/* -> Warm alias when IDs differ
  const baseTargets = new Map();
  for (const entry of patch.primitives.baseNeutralLadder) {
    const baseThemeVar = themesByName.get(`base/${entry.step}`);
    const aliasId = baseThemeVar?.valuesByMode?.[warmModeId]?.id;
    let target = (aliasId && primById.get(aliasId)) || findCollectionVariable(primCol, entry.id, [entry.name, entry.legacyBaName]);
    if (!target) throw new Error(`Missing base neutral primitive variable for step ${entry.step}`);
    baseTargets.set(entry.step, target);
  }

  const baseIdSet = new Set([...baseTargets.values()].map((v) => v.id));
  const warmTargets = new Map();
  for (const entry of patch.primitives.warmStoneLadder) {
    let target = primById.get(entry.id);
    if (target && baseIdSet.has(target.id)) target = null;
    if (!target) {
      target = primCol.variables.find(
        (v) => !baseIdSet.has(v.id) && (v.name === entry.legacyBaName || v.name === entry.name)
      );
    }
    if (!target) throw new Error(`Missing warm stone primitive variable for step ${entry.step}`);
    warmTargets.set(entry.step, target);
  }

  let primitivesUpdated = 0;
  for (const entry of patch.primitives.baseNeutralLadder) {
    const v = baseTargets.get(entry.step);
    v.name = entry.name;
    v.description = entry.description;
    v.valuesByMode[primModeId] = { ...entry.value };
    primitivesUpdated++;
  }

  for (const entry of patch.primitives.warmStoneLadder) {
    const v = warmTargets.get(entry.step);
    v.name = entry.name;
    v.description = entry.description;
    v.valuesByMode[primModeId] = { ...entry.value };
    primitivesUpdated++;
  }

  const orangeByStep = new Map();
  for (const entry of patch.primitives.orangeLadder) {
    const v = findCollectionVariable(primCol, entry.id, [entry.name]);
    if (!v) throw new Error(`Missing orange primitive variable ${entry.name}`);
    v.description = entry.description;
    v.valuesByMode[primModeId] = { ...entry.value };
    orangeByStep.set(entry.step, v);
    primitivesUpdated++;
  }

  let themeAliasesUpdated = 0;
  for (const entry of patch.colorThemes.primary) {
    const v = findCollectionVariable(themesCol, entry.id, [entry.name]);
    const targetOrange = orangeByStep.get(entry.step);
    if (!v || !targetOrange) throw new Error(`Missing Color Themes variable ${entry.name}`);
    v.description = entry.description;
    v.valuesByMode[warmModeId] = { type: "VARIABLE_ALIAS", id: targetOrange.id };
    v.valuesByMode[coolModeId] = { type: "VARIABLE_ALIAS", id: targetOrange.id };
    themeAliasesUpdated++;
  }

  for (const entry of patch.colorThemes.secondary) {
    const v = findCollectionVariable(themesCol, entry.id, [entry.name]);
    const targetNeutral = baseTargets.get(entry.step);
    if (!v || !targetNeutral) throw new Error(`Missing Color Themes variable ${entry.name}`);
    v.description = entry.description;
    v.valuesByMode[warmModeId] = { type: "VARIABLE_ALIAS", id: targetNeutral.id };
    v.valuesByMode[coolModeId] = { type: "VARIABLE_ALIAS", id: targetNeutral.id };
    themeAliasesUpdated++;
  }

  if (Array.isArray(patch.colorThemes.base)) {
    for (const entry of patch.colorThemes.base) {
      const v = findCollectionVariable(themesCol, entry.id, [entry.name]);
      const targetNeutral = baseTargets.get(entry.step);
      if (!v || !targetNeutral) throw new Error(`Missing Color Themes variable ${entry.name}`);
      v.description = entry.description;
      v.valuesByMode[warmModeId] = { type: "VARIABLE_ALIAS", id: targetNeutral.id };
      v.valuesByMode[coolModeId] = { type: "VARIABLE_ALIAS", id: targetNeutral.id };
      themeAliasesUpdated++;
    }
  }

  let cornerRadiiUpdated = 0;
  if (screenCol && spaceCol && Array.isArray(patch.cornerRadii)) {
    const spaceByName = new Map(spaceCol.variables.map((v) => [v.name, v]));
    const mobileModeId = screenCol.collection.modes.find((m) => m.name === "Mobile")?.modeId || "3:4";
    const tabletModeId = screenCol.collection.modes.find((m) => m.name === "Tablet")?.modeId || "2166:1";
    const desktopModeId = screenCol.collection.modes.find((m) => m.name === "Desktop")?.modeId || "33:0";

    for (const entry of patch.cornerRadii) {
      const v = findCollectionVariable(screenCol, entry.id, [entry.name]);
      if (!v) throw new Error(`Missing Screen Size Switch variable ${entry.name}`);
      v.description = entry.description;

      const setModeAlias = (modeId, spec) => {
        if (!spec) return;
        const target = (spec.id && spaceCol.variables.find((sv) => sv.id === spec.id)) ||
                       (spec.spaceName && spaceByName.get(spec.spaceName));
        if (target) {
          v.valuesByMode[modeId] = { type: "VARIABLE_ALIAS", id: target.id };
        }
      };

      setModeAlias(mobileModeId, entry.valuesByMode.Mobile);
      setModeAlias(tabletModeId, entry.valuesByMode.Tablet);
      setModeAlias(desktopModeId, entry.valuesByMode.Desktop);
      cornerRadiiUpdated++;
    }
  }

  let typographyVarsUpdated = 0;
  for (const tv of patch.typography) {
    const v = findCollectionVariable(typoCol, tv.id, [tv.name]);
    if (!v) throw new Error(`Missing Typography variable ${tv.name}`);
    v.description = tv.description;
    v.valuesByMode[typoModeId] = tv.value;
    typographyVarsUpdated++;
  }

  return { primitivesUpdated, themeAliasesUpdated, cornerRadiiUpdated, typographyVarsUpdated };
}

/**
 * Apply the DUSQ token & text-style migration to a local BA Design System directory or JSON export.
 */
export async function applyDusqTokensToDirectory(targetPath, { rootDir = ROOT } = {}) {
  const patch = await buildDusqTokenPatch(rootDir);
  const layout = await resolveTargetLayout(targetPath);

  if (layout.kind === "json-file") {
    const data = await readJson(layout.filePath);
    const list = Array.isArray(data) ? data : data.collections;
    if (!Array.isArray(list)) {
      throw new Error(`Unsupported JSON bundle structure in ${layout.filePath}`);
    }
    const primCol = list.find((c) => c.collection?.name === "Primitive Color Tokens");
    const themesCol = list.find((c) => c.collection?.name === "Color Themes");
    const screenCol = list.find((c) => c.collection?.name === "Screen Size Switch");
    const spaceCol = list.find((c) => c.collection?.name === "Space");
    const typoCol = list.find((c) => c.collection?.name === "Typography");
    if (!primCol || !themesCol || !typoCol) {
      throw new Error(`JSON bundle ${layout.filePath} must include Primitive Color Tokens, Color Themes, and Typography.`);
    }
    const summary = patchCollectionVariables(primCol, themesCol, typoCol, patch, screenCol, spaceCol);
    await writeJson(layout.filePath, data);
    return { target: layout.filePath, ...summary, textStylesCount: 0, totalAliasesValidated: 0 };
  }

  const primPath = join(layout.collectionsDir, "primitive-color-tokens.json");
  const themesPath = join(layout.collectionsDir, "color-themes.json");
  const screenPath = join(layout.collectionsDir, "screen-size-switch.json");
  const spacePath = join(layout.collectionsDir, "space.json");
  const typoPath = join(layout.collectionsDir, "typography.json");

  const [primCol, themesCol, screenCol, spaceCol, typoCol] = await Promise.all([
    readJson(primPath),
    readJson(themesPath),
    existsSync(screenPath) ? readJson(screenPath) : null,
    existsSync(spacePath) ? readJson(spacePath) : null,
    readJson(typoPath)
  ]);

  const summary = patchCollectionVariables(primCol, themesCol, typoCol, patch, screenCol, spaceCol);

  const writes = [
    writeJson(primPath, primCol),
    writeJson(themesPath, themesCol),
    writeJson(typoPath, typoCol)
  ];
  if (screenCol && existsSync(screenPath)) writes.push(writeJson(screenPath, screenCol));
  if (spaceCol && existsSync(spacePath)) writes.push(writeJson(spacePath, spaceCol));
  await Promise.all(writes);

  let textStylesCount = 0;
  if (layout.textStylesPath && existsSync(layout.textStylesPath)) {
    const existingTextStyles = await readJson(layout.textStylesPath);
    const mergedTextStyles = {
      source: {
        ...(existingTextStyles.source || {}),
        ...patch.textStylesSpec.source
      },
      styles: patch.textStylesSpec.styles
    };
    await writeJson(layout.textStylesPath, mergedTextStyles);
    textStylesCount = mergedTextStyles.styles.length;
  }

  const check = await verifyDusqTokens(targetPath, { rootDir });
  if (!check.ok) {
    throw new Error(`Post-migration verification failed:\n${JSON.stringify(check.mismatches, null, 2)}`);
  }

  return {
    target: layout.collectionsDir,
    ...summary,
    textStylesCount,
    totalAliasesValidated: check.aliasesValidated
  };
}

/**
 * Verify that all 97 DUSQ token entries, aliases, and text styles match the DUSQ specification.
 */
export async function verifyDusqTokens(targetPath = ROOT, { rootDir = ROOT } = {}) {
  const patch = await buildDusqTokenPatch(rootDir);
  const layout = await resolveTargetLayout(targetPath);

  if (layout.kind === "json-file") {
    throw new Error("--verify currently checks collection directories.");
  }

  const files = (await readdir(layout.collectionsDir)).filter((f) => f.endsWith(".json")).sort();
  const entries = await Promise.all(files.map((f) => readJson(join(layout.collectionsDir, f))));
  const allVariables = entries.flatMap((e) => e.variables || []);
  const ids = new Set(allVariables.map((v) => v.id));
  const aliases = allVariables.flatMap((v) =>
    Object.values(v.valuesByMode || {}).filter((val) => val?.type === "VARIABLE_ALIAS")
  );
  const unresolved = aliases.filter((a) => !ids.has(a.id));

  const primCol = entries.find((e) => e.collection?.name === "Primitive Color Tokens");
  const themesCol = entries.find((e) => e.collection?.name === "Color Themes");
  const screenCol = entries.find((e) => e.collection?.name === "Screen Size Switch");
  const spaceCol = entries.find((e) => e.collection?.name === "Space");
  const typoCol = entries.find((e) => e.collection?.name === "Typography");

  const mismatches = [];
  if (unresolved.length) {
    mismatches.push({ type: "unresolved_aliases", count: unresolved.length, sample: unresolved.slice(0, 5) });
  }

  const primModeId = primCol?.collection.modes.find((m) => m.name === "Value")?.modeId || primCol?.collection.defaultModeId;
  const warmModeId = themesCol?.collection.modes.find((m) => m.name === "Warm")?.modeId || "138:0";
  const coolModeId = themesCol?.collection.modes.find((m) => m.name === "Cool")?.modeId || "22:0";
  const typoModeId = typoCol?.collection.modes[0]?.modeId || typoCol?.collection.defaultModeId;

  const mobileModeId = screenCol?.collection.modes.find((m) => m.name === "Mobile")?.modeId || "3:4";
  const tabletModeId = screenCol?.collection.modes.find((m) => m.name === "Tablet")?.modeId || "2166:1";
  const desktopModeId = screenCol?.collection.modes.find((m) => m.name === "Desktop")?.modeId || "33:0";

  const primByName = new Map((primCol?.variables || []).map((v) => [v.name, v]));
  const themesByName = new Map((themesCol?.variables || []).map((v) => [v.name, v]));
  const screenByName = new Map((screenCol?.variables || []).map((v) => [v.name, v]));
  const spaceById = new Map((spaceCol?.variables || []).map((v) => [v.id, v]));
  const typoByName = new Map((typoCol?.variables || []).map((v) => [v.name, v]));

  let checked = 0;
  for (const entry of [...patch.primitives.baseNeutralLadder, ...patch.primitives.warmStoneLadder, ...patch.primitives.orangeLadder]) {
    checked++;
    const actual = primByName.get(entry.name);
    if (!actual || !approxColorEqual(actual.valuesByMode?.[primModeId], entry.value)) {
      mismatches.push({ type: "primitive_mismatch", name: entry.name, expected: entry.hex, actual: COLOR_HEX(actual?.valuesByMode?.[primModeId]) });
    }
  }

  for (const entry of patch.colorThemes.primary) {
    checked++;
    const actual = themesByName.get(entry.name);
    const orangeVar = primByName.get(`orange/${entry.step}`);
    if (
      !actual ||
      !orangeVar ||
      actual.valuesByMode?.[warmModeId]?.id !== orangeVar.id ||
      actual.valuesByMode?.[coolModeId]?.id !== orangeVar.id
    ) {
      mismatches.push({ type: "theme_primary_mismatch", name: entry.name });
    }
  }

  for (const entry of patch.colorThemes.secondary) {
    checked++;
    const actual = themesByName.get(entry.name);
    const neutralVar = primByName.get(`neutral/${entry.step}`);
    if (
      !actual ||
      !neutralVar ||
      actual.valuesByMode?.[warmModeId]?.id !== neutralVar.id ||
      actual.valuesByMode?.[coolModeId]?.id !== neutralVar.id
    ) {
      mismatches.push({ type: "theme_secondary_mismatch", name: entry.name });
    }
  }

  if (Array.isArray(patch.colorThemes.base)) {
    for (const entry of patch.colorThemes.base) {
      checked++;
      const actual = themesByName.get(entry.name);
      const neutralVar = primByName.get(`neutral/${entry.step}`);
      if (
        !actual ||
        !neutralVar ||
        actual.valuesByMode?.[warmModeId]?.id !== neutralVar.id ||
        actual.valuesByMode?.[coolModeId]?.id !== neutralVar.id
      ) {
        mismatches.push({ type: "theme_base_mismatch", name: entry.name });
      }
    }
  }

  if (screenCol && spaceCol && Array.isArray(patch.cornerRadii)) {
    for (const entry of patch.cornerRadii) {
      checked++;
      const actual = screenByName.get(entry.name);
      if (!actual) {
        mismatches.push({ type: "corner_radius_missing", name: entry.name });
        continue;
      }
      const modesToCheck = [
        { modeId: mobileModeId, name: "Mobile", spec: entry.valuesByMode.Mobile },
        { modeId: tabletModeId, name: "Tablet", spec: entry.valuesByMode.Tablet },
        { modeId: desktopModeId, name: "Desktop", spec: entry.valuesByMode.Desktop }
      ];
      for (const m of modesToCheck) {
        const actualAlias = actual.valuesByMode?.[m.modeId];
        const actualTargetName = spaceById.get(actualAlias?.id)?.name;
        if (actualAlias?.id !== m.spec.id && actualTargetName !== m.spec.spaceName) {
          mismatches.push({
            type: "corner_radius_mode_mismatch",
            name: `${entry.name} (${m.name})`,
            expected: m.spec.spaceName,
            actual: actualTargetName
          });
        }
      }
    }
  }

  for (const tv of patch.typography) {
    checked++;
    const actual = typoByName.get(tv.name);
    if (!actual || actual.valuesByMode?.[typoModeId] !== tv.value) {
      mismatches.push({ type: "typography_mismatch", name: tv.name, expected: tv.value, actual: actual?.valuesByMode?.[typoModeId] });
    }
  }

  let textStylesChecked = 0;
  if (layout.textStylesPath && existsSync(layout.textStylesPath)) {
    const actualTS = await readJson(layout.textStylesPath);
    const actualByName = new Map((actualTS.styles || []).map((s) => [s.name, s]));
    for (const expectedStyle of patch.textStylesSpec.styles) {
      textStylesChecked++;
      const actualStyle = actualByName.get(expectedStyle.name);
      if (
        !actualStyle ||
        actualStyle.fontName?.family !== expectedStyle.fontName?.family ||
        actualStyle.fontSize !== expectedStyle.fontSize
      ) {
        mismatches.push({ type: "text_style_mismatch", name: expectedStyle.name });
      }
    }
  }

  return {
    ok: mismatches.length === 0,
    checked,
    textStylesChecked,
    aliasesValidated: aliases.length,
    mismatches
  };
}

function printHelp() {
  console.log(`BA -> DUSQ Token Migration Engine

Usage:
  npm run tokens:apply-dusq                    Generate dist/dusq-token-patch.json and dist/figma-apply-dusq-tokens.js
  node build/apply-dusq-tokens.mjs <path>      Apply DUSQ tokens & text styles into a local BA Design System directory or JSON export
  node build/apply-dusq-tokens.mjs --verify    Verify current workspace (or --verify <path>) matches DUSQ tokens & text styles
`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    process.exit(0);
  }

  if (args.includes("--verify")) {
    const target = args.find((a) => !a.startsWith("-")) || ROOT;
    const res = await verifyDusqTokens(target);
    if (!res.ok) {
      console.error("DUSQ token verification failed:", JSON.stringify(res.mismatches, null, 2));
      process.exit(1);
    }
    console.log(
      `Verified ${res.checked} DUSQ variables, ${res.textStylesChecked} text styles, and ${res.aliasesValidated} aliases cleanly.`
    );
    process.exit(0);
  }

  const targetArg = args.find((a) => !a.startsWith("-"));
  if (!targetArg || args.includes("--emit")) {
    const { patch, patchPath, scriptPath } = await emitDusqMigrationArtifacts(ROOT);
    console.log(
      `Generated DUSQ migration artifacts (${patch.counts.totalMutatedVars} variables, ${patch.counts.textStyles} text styles):`
    );
    console.log(`  - ${patchPath}`);
    console.log(`  - ${scriptPath}`);
  }

  if (targetArg) {
    const res = await applyDusqTokensToDirectory(targetArg);
    console.log(
      `Applied DUSQ tokens to ${res.target}: ${res.primitivesUpdated} primitives, ${res.themeAliasesUpdated} theme aliases, ${res.cornerRadiiUpdated} corner radii, ${res.typographyVarsUpdated} typography vars, ${res.textStylesCount} text styles (${res.totalAliasesValidated} aliases validated).`
    );
  }
}
