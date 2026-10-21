import test from "node:test";
import assert from "node:assert/strict";
import contract from "../../../dist/figma-contract.json" with { type: "json" };

test("Figma contract retains every Button, Icon Button, and Input Field variant", () => {
  assert.equal(contract.button.variants.length, 24);
  assert.equal(contract.iconButton.variants.length, 24);
  assert.equal(contract.input.variants.length, 8);
});
