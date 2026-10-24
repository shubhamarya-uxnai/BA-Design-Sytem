# Gradient Studio — Reverse Design & Figma Builder

This directory contains the reverse-designed Figma system and plugin for **Gradient Studio** (`consumers/Gradient-Creator`).

## Files

- [`manifest.json`](./manifest.json): Official Figma plugin manifest (`id: ba-gradient-studio-builder`).
- [`code.js`](./code.js): Plugin API implementation generating the 1440×900 studio artboard, Auto-Layout control panels, and modals.
- [`console-runner.js`](./console-runner.js): Standalone script ready to be pasted directly into Figma Desktop Developer Console (`Cmd+Option+I`).

## Quick Execution

### Option 1: Figma Console (1-Click)
1. Open Figma Desktop on the **BA Design System** file.
2. Press `Cmd + Option + I` to open Developer Tools -> `Console`.
3. Paste the contents of [`console-runner.js`](./console-runner.js) and press Enter.

### Option 2: Figma Plugin
1. Go to `Plugins > Development > Import plugin from manifest...`
2. Select [`manifest.json`](./manifest.json).
3. Run `Build Gradient Studio in Figma`.
