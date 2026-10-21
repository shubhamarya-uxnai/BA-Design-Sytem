import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: "/BA-Design-Sytem/",
  plugins: [react(), {
    name: "figma-contract-asset",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "assets/figma-contract.json", source: readFileSync(resolve(root, "../../dist/figma-contract.json")) });
    },
  }],
  build: { outDir: resolve(root, "../../site"), emptyOutDir: true },
});
