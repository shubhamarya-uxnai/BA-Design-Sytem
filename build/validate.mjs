import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const COLLECTIONS = join(ROOT, "source", "collections");
const files = (await readdir(COLLECTIONS)).filter((file) => file.endsWith(".json")).sort();
const entries = await Promise.all(files.map(async (file) => JSON.parse(await readFile(join(COLLECTIONS, file), "utf8"))));
const variables = entries.flatMap((entry) => entry.variables);
const ids = new Set(variables.map((variable) => variable.id));
const aliases = variables.flatMap((variable) => Object.values(variable.valuesByMode).filter((value) => value?.type === "VARIABLE_ALIAS"));
const unresolved = aliases.filter((alias) => !ids.has(alias.id));
const duplicateIds = variables.map((variable) => variable.id).filter((id, index, list) => list.indexOf(id) !== index);

if (unresolved.length || duplicateIds.length) {
  console.error(JSON.stringify({ unresolvedAliases: unresolved, duplicateIds: [...new Set(duplicateIds)] }, null, 2));
  process.exit(1);
}

console.log(`Validated ${variables.length} variables across ${entries.length} collections; ${aliases.length} aliases resolve locally.`);
