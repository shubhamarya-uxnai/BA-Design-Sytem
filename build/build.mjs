import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(ROOT, "source");
const COLLECTIONS = join(SOURCE, "collections");
const DIST = join(ROOT, "dist");

const slugify = (value) => {
  const slug = String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return slug || "value";
};

const cssNameFor = (collectionName, variableName) =>
  `--ba-${slugify(collectionName)}-${String(variableName)
    .split("/")
    .map(slugify)
    .join("-")}`;

const legacyCssNameFor = (collectionName, variableName) =>
  `--va-${slugify(collectionName)}-${String(variableName)
    .split("/")
    .map(slugify)
    .join("-")}`;

const modeSlug = (modeName) => String(modeName)
  .trim()
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9.\-_]/g, "")
  .replace(/-+/g, "-");

const selectorFor = (collectionName, modeName) => {
  const collection = slugify(collectionName);
  const mode = modeSlug(modeName);
  const attribute = {
    "screen-size-switch": "screen",
    "color-themes": "temperature",
    "language-switch": "lang",
    "font-size-control": "text-scale",
    "contrast-control": "contrast",
    "semantic-color-tokens": "theme"
  }[collection];

  if (!attribute) return `:where([data-collection-mode="${collection}-${mode}"])`;
  if (attribute === "lang") {
    const language = { english: "en", arabic: "ar", hindi: "hi" }[mode] || mode;
    return `[lang="${language}"]`;
  }
  return `[data-${attribute}="${mode}"]`;
};

const isAlias = (value) =>
  value && typeof value === "object" && value.type === "VARIABLE_ALIAS" && typeof value.id === "string";

const lengthLike = (variable) => {
  const collection = String(variable?.collection?.name || "").toLowerCase();
  const name = String(variable?.name || "").toLowerCase();
  const scopes = new Set(variable?.scopes || []);
  if (scopes.has("OPACITY") || scopes.has("FONT_WEIGHT")) return false;
  if (collection === "font size control") return true;
  if (collection === "typography" && name.startsWith("font sizes/")) return true;
  if (name.includes("corner radius") || name.includes("stroke/") || name.includes("screen width") || name.includes("screen minimum height") || name.includes("presentation")) return true;
  return scopes.has("FONT_SIZE") || scopes.has("LINE_HEIGHT") || scopes.has("GAP") || scopes.has("WIDTH_HEIGHT") || scopes.has("CORNER_RADIUS") || scopes.has("STROKE_WEIGHT");
};

const numberValue = (value, variable) => {
  if (typeof value !== "number") return String(value);
  return lengthLike(variable) ? `${value}px` : String(value);
};

const colorValue = (value) => {
  if (!value || typeof value !== "object") return String(value);
  const r = Math.round((value.r ?? 0) * 255);
  const g = Math.round((value.g ?? 0) * 255);
  const b = Math.round((value.b ?? 0) * 255);
  const a = value.a ?? 1;
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(4))})` : `rgb(${r}, ${g}, ${b})`;
};

const cssValue = (value, variable, namesById, variablesById) => {
  if (isAlias(value)) {
    const reference = `var(${namesById.get(value.id) || `--ba-unresolved-${slugify(value.id)}`})`;
    const target = variablesById.get(value.id);
    return lengthLike(variable) && target && !lengthLike(target) ? `calc(${reference} * 1px)` : reference;
  }
  if (variable.resolvedType === "COLOR" && value && typeof value === "object" && "color" in value) {
    const color = cssValue(value.color, { resolvedType: "COLOR", scopes: [] }, namesById, variablesById);
    // Figma COLOR_OPACITY variables are normalized floats (0.08 = 8%), unlike
    // ordinary percentage-like token values. Keep aliases as CSS custom
    // properties, but normalize resolved numbers before emitting color-mix.
    const opacityValue = value.opacity ?? 1;
    const opacity = isAlias(opacityValue)
      ? `calc(${cssValue(opacityValue, { resolvedType: "FLOAT", scopes: [] }, namesById, variablesById)} * 100)`
      : typeof opacityValue === "number" && opacityValue <= 1
        ? String(opacityValue * 100)
        : cssValue(opacityValue, { resolvedType: "FLOAT", scopes: [] }, namesById, variablesById);
    return `color-mix(in srgb, ${color} ${opacity}%, transparent)`;
  }
  if (variable.resolvedType === "COLOR") return colorValue(value);
  if (variable.resolvedType === "FLOAT") return numberValue(value, variable);
  if (variable.resolvedType === "BOOLEAN") return value ? "true" : "false";
  if (variable.resolvedType === "STRING") return JSON.stringify(String(value ?? ""));
  return String(value ?? "");
};

const files = (await readdir(COLLECTIONS)).filter((file) => file.endsWith(".json")).sort();
const collections = await Promise.all(files.map(async (file) => JSON.parse(await readFile(join(COLLECTIONS, file), "utf8"))));
const variables = collections.flatMap((entry) => entry.variables.map((variable) => ({ ...variable, collection: entry.collection })));
const namesById = new Map(variables.map((variable) => [variable.id, cssNameFor(variable.collection.name, variable.name)]));
const legacyNamesById = new Map(variables.map((variable) => [variable.id, legacyCssNameFor(variable.collection.name, variable.name)]));
const variablesById = new Map(variables.map((variable) => [variable.id, variable]));
const tokenRecords = [];
const rules = new Map([":root", "@media (min-width: 768px)"].map((selector) => [selector, []]));

for (const variable of variables) {
  const cssName = namesById.get(variable.id);
  const legacyName = legacyNamesById.get(variable.id);
  const modeValues = {};
  for (const mode of variable.collection.modes) {
    if (!(mode.modeId in variable.valuesByMode)) continue;
    const raw = variable.valuesByMode[mode.modeId];
    modeValues[mode.name] = raw;
    const selector = mode.modeId === variable.collection.defaultModeId ? ":root" : selectorFor(variable.collection.name, mode.name);
    if (!rules.has(selector)) rules.set(selector, []);
    rules.get(selector).push(`  ${cssName}: ${cssValue(raw, variable, namesById, variablesById)};`);
    rules.get(selector).push(`  ${legacyName}: var(${cssName});`);
  }
  tokenRecords.push({
    id: variable.id,
    name: variable.name,
    collection: variable.collection.name,
    collectionId: variable.collection.id,
    resolvedType: variable.resolvedType,
    scopes: variable.scopes || [],
    cssVariable: cssName,
    legacyCssVariable: legacyName,
    valuesByMode: modeValues,
    description: variable.description || ""
  });
}

const header = `/* Generated from the current Figma token snapshot. Do not edit by hand. */\n/* Rebuild with: npm run build */\n`;
const css = header + [...rules.entries()]
  .filter(([, declarations]) => declarations.length)
  .map(([selector, declarations]) => `${selector} {\n${declarations.join("\n")}\n}`)
  .join("\n\n") + "\n";

const output = {
  generatedAt: new Date().toISOString(),
  source: "source/collections",
  count: tokenRecords.length,
  tokens: tokenRecords
};

await writeFile(join(DIST, "tokens.css"), css);
await writeFile(join(DIST, "tokens.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Generated ${tokenRecords.length} tokens from ${collections.length} collections.`);
