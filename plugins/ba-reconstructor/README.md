# BA Design System Reconstructor (Figma Plugin)

1-click plugin that reconstructs any live website or web page built with the **BA Design System** into native, auto-layout Figma artboards while preserving atomic component instances and design tokens.

---

## ⚡ How It Works

```
┌──────────────────────────────────────┐
│       FIGMA PLUGIN UI PANEL          │
│  [ Website Live URL / Local Path ]   │
│  [ Toggle: Same File vs Library ]    │
│  [ ⚡ Replicate in Figma ]           │
└──────────────────┬───────────────────┘
                   │
                   ▼ (POST /extract)
┌──────────────────────────────────────┐
│  LOCAL PLAYWRIGHT EXTRACTOR BRIDGE   │
│  • Loads React SPA at 1440×900       │
│  • Enforces BA Design System guard   │
│  • Extracts AST & Component props    │
└──────────────────┬───────────────────┘
                   │
                   ▼ (AST JSON)
┌──────────────────────────────────────┐
│  FIGMA SANDBOX (code.js)             │
│  • Instantiates BA component sets    │
│  • Binds Figma Variable tokens       │
│  • Builds responsive Auto-Layout     │
└──────────────────────────────────────┘
```

---

## 🚀 Quick Setup & Usage

### 1. Start the Local Extractor Bridge
In your workspace terminal:
```bash
npm run bridge
```
The bridge listens on `http://localhost:4040` ready to inspect live URLs and SPAs.

### 2. Import Plugin into Figma
1. In Figma, open menu: **`Plugins > Development > Import plugin from manifest...`**
2. Choose [`plugins/ba-reconstructor/manifest.json`](file:///Users/shubhamaryasingh/Building/design-system/va-design-system/plugins/ba-reconstructor/manifest.json).

### 3. Replicate in 1-Click
1. Right-click on the Figma canvas: **`Plugins > Development > BA Design System Reconstructor`**.
2. Enter the website URL or click one of the quick presets (e.g. `consumers/Gradient-Creator/index.html` or `http://localhost:5173`).
3. Leave **"Components in This File"** ON if your open Figma file has the BA component library, or toggle OFF if using an external Team Library.
4. Click **`⚡ Replicate in Figma`**.
5. Watch the real-time activity log as it extracts the live DOM, binds variables, and generates the layout on your canvas in seconds!
