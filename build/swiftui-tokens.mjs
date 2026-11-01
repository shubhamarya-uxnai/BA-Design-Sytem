import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = join(root, "source/collections");
const destination = join(root, "packages/swiftui/Sources/BADesignSystem/Resources/tokens.json");
const files = (await readdir(source)).filter(name => name.endsWith(".json")).sort();
const collections = await Promise.all(files.map(async name => JSON.parse(await readFile(join(source, name), "utf8"))));
const output = {
  source: "source/collections",
  collections: Object.fromEntries(collections.map(({ collection }) => [collection.name, {
    defaultMode: collection.modes.find(mode => mode.modeId === collection.defaultModeId)?.name,
    modes: collection.modes.map(mode => mode.name)
  }])),
  tokens: collections.flatMap(({ collection, variables }) => variables.map(variable => ({
    id: variable.id,
    collection: collection.name,
    name: variable.name,
    type: variable.resolvedType,
    values: Object.fromEntries(collection.modes.filter(mode => mode.modeId in variable.valuesByMode)
      .map(mode => [mode.name, variable.valuesByMode[mode.modeId]]))
  })))
};
await mkdir(resolve(destination, ".."), { recursive: true });
await writeFile(destination, JSON.stringify(output, null, 2) + "\n");
console.log(`Generated ${output.tokens.length} BA tokens for SwiftUI`);
