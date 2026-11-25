import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  ROOT,
  applyDusqTokensToDirectory,
  buildDusqTokenPatch,
  emitDusqMigrationArtifacts,
  verifyDusqTokens
} from "../../../build/apply-dusq-tokens.mjs";

const COLLECTION_FILES = [
  "color-themes.json",
  "contrast-control.json",
  "font-size-control.json",
  "language-switch.json",
  "lanuguage-collection.json",
  "primitive-color-tokens.json",
  "screen-size-switch.json",
  "semantic-color-tokens.json",
  "separator.json",
  "space.json",
  "typography.json"
];

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

test("buildDusqTokenPatch captures all 97 BA->DUSQ variable deltas and 21 text styles", async () => {
  const patch = await buildDusqTokenPatch(ROOT);
  assert.equal(patch.primitives.baseNeutralLadder.length, 20);
  assert.equal(patch.primitives.warmStoneLadder.length, 20);
  assert.equal(patch.primitives.orangeLadder.length, 10);
  assert.equal(patch.colorThemes.primary.length, 10);
  assert.equal(patch.colorThemes.secondary.length, 10);
  assert.equal(patch.colorThemes.base.length, 20);
  assert.equal(patch.cornerRadii.length, 4);
  assert.equal(patch.typography.length, 3);
  assert.equal(patch.counts.totalMutatedVars, 97);
  assert.equal(patch.textStylesSpec.styles.length, 21);
});

test("emitDusqMigrationArtifacts produces valid patch JSON and async Figma Plugin API runner", async () => {
  const { patchPath, scriptPath } = await emitDusqMigrationArtifacts(ROOT);
  assert.ok(existsSync(patchPath));
  assert.ok(existsSync(scriptPath));

  const runnerSource = await readFile(scriptPath, "utf8");
  assert.doesNotThrow(() => new AsyncFunction(runnerSource));
  assert.match(runnerSource, /getLocalVariableCollectionsAsync/);
  assert.match(runnerSource, /VARIABLE_ALIAS/);
  assert.match(runnerSource, /__dusq_tmp_neutral/);
  assert.match(runnerSource, /getLocalTextStylesAsync/);
});

test("applyDusqTokensToDirectory migrates original BA HEAD files cleanly and idempotently", async () => {
  const tmpRoot = await mkdtemp(join(tmpdir(), "ba-to-dusq-test-"));
  try {
    const tmpCollections = join(tmpRoot, "source", "collections");
    const tmpSpecs = join(tmpRoot, "source", "specs");
    await mkdir(tmpCollections, { recursive: true });
    await mkdir(tmpSpecs, { recursive: true });

    for (const file of COLLECTION_FILES) {
      const content = execSync(`git show HEAD:source/collections/${file}`, { cwd: ROOT, encoding: "utf8" });
      await writeFile(join(tmpCollections, file), content, "utf8");
    }
    const headTextStyles = execSync("git show HEAD:source/specs/text-styles.json", {
      cwd: ROOT,
      encoding: "utf8"
    });
    await writeFile(join(tmpSpecs, "text-styles.json"), headTextStyles, "utf8");

    const preVerify = await verifyDusqTokens(tmpRoot);
    assert.equal(preVerify.ok, false, "Original BA HEAD files should fail DUSQ verification before migration");

    const res1 = await applyDusqTokensToDirectory(tmpRoot);
    assert.equal(res1.primitivesUpdated, 50);
    assert.equal(res1.themeAliasesUpdated, 40);
    assert.equal(res1.cornerRadiiUpdated, 4);
    assert.equal(res1.typographyVarsUpdated, 3);
    assert.equal(res1.textStylesCount, 21);
    assert.equal(res1.totalAliasesValidated, 792);

    const postVerify = await verifyDusqTokens(tmpRoot);
    assert.equal(postVerify.ok, true, JSON.stringify(postVerify.mismatches));
    assert.equal(postVerify.checked, 97);
    assert.equal(postVerify.textStylesChecked, 21);

    for (const rel of [
      "source/collections/primitive-color-tokens.json",
      "source/collections/color-themes.json",
      "source/collections/screen-size-switch.json",
      "source/collections/typography.json",
      "source/specs/text-styles.json"
    ]) {
      const actual = await readJson(join(tmpRoot, rel));
      const expected = await readJson(join(ROOT, rel));
      assert.deepStrictEqual(actual, expected, `${rel} after BA->DUSQ migration must match workspace source/`);
    }

    // Idempotency: re-applying to already-migrated workspace must stay exact
    const res2 = await applyDusqTokensToDirectory(tmpRoot);
    assert.equal(res2.primitivesUpdated, 50);
    assert.equal(res2.themeAliasesUpdated, 40);
    assert.equal(res2.cornerRadiiUpdated, 4);
    for (const rel of [
      "source/collections/primitive-color-tokens.json",
      "source/collections/color-themes.json",
      "source/collections/screen-size-switch.json",
      "source/collections/typography.json",
      "source/specs/text-styles.json"
    ]) {
      assert.deepStrictEqual(await readJson(join(tmpRoot, rel)), await readJson(join(ROOT, rel)));
    }
  } finally {
    await rm(tmpRoot, { recursive: true, force: true });
  }
});

test("applyDusqTokensToDirectory resolves neutral<->warm ladders even when BA VariableIDs are regenerated", async () => {
  const tmpRoot = await mkdtemp(join(tmpdir(), "ba-rekeyed-test-"));
  try {
    const tmpCollections = join(tmpRoot, "source", "collections");
    const tmpSpecs = join(tmpRoot, "source", "specs");
    await mkdir(tmpCollections, { recursive: true });
    await mkdir(tmpSpecs, { recursive: true });

    const rekey = (id) => String(id).replace("VariableID:", "VariableID:9999");

    for (const file of COLLECTION_FILES) {
      const raw = execSync(`git show HEAD:source/collections/${file}`, { cwd: ROOT, encoding: "utf8" });
      const data = JSON.parse(raw);
      for (const v of data.variables || []) {
        v.id = rekey(v.id);
        for (const val of Object.values(v.valuesByMode || {})) {
          if (val && typeof val === "object" && val.type === "VARIABLE_ALIAS" && val.id) {
            val.id = rekey(val.id);
          }
        }
      }
      await writeFile(join(tmpCollections, file), JSON.stringify(data, null, 2), "utf8");
    }

    await applyDusqTokensToDirectory(tmpRoot);
    const verified = await verifyDusqTokens(tmpRoot);
    assert.equal(verified.ok, true, JSON.stringify(verified.mismatches));

    // Re-running after rename must still pass verification cleanly
    await applyDusqTokensToDirectory(tmpRoot);
    const verifiedAgain = await verifyDusqTokens(tmpRoot);
    assert.equal(verifiedAgain.ok, true, JSON.stringify(verifiedAgain.mismatches));
  } finally {
    await rm(tmpRoot, { recursive: true, force: true });
  }
});
