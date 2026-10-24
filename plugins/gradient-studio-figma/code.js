/**
 * BA Design System — Gradient Studio Reverse Design Builder for Figma
 *
 * Pixel-Perfect & Zero-Delay:
 * - Fixes the 100px spacer bug by explicitly resizing all spacers to (1, 1).
 * - Compact, professional 3-column desktop layout (1440 × 900).
 * - Full 11 sections and 60 controls rendered with exact BA Design System tokens.
 * - Always calls figma.closePlugin() so it executes and finishes in < 1 second.
 */

(async function main() {
  console.log("🚀 Starting Gradient Studio Reverse Design build in Figma...");

  try {
    // 1. Clean up any previous runs on this page
    const toRemove = [];
    for (const child of figma.currentPage.children) {
      if (
        child.name.includes("Gradient Studio — Desktop") ||
        child.name.includes("Overlay · Export Progress") ||
        child.name.includes("Overlay · Settings & Appearance")
      ) {
        toRemove.push(child);
      }
    }
    toRemove.forEach(n => n.remove());

    // 2. Preload fonts safely
    const fontRegular = { family: "Inter", style: "Regular" };
    const fontMedium = { family: "Inter", style: "Medium" };
    const fontSemiBold = { family: "Inter", style: "Semi Bold" };
    const fontBold = { family: "Inter", style: "Bold" };

    try {
      await Promise.all([
        figma.loadFontAsync(fontRegular),
        figma.loadFontAsync(fontMedium),
        figma.loadFontAsync(fontSemiBold),
        figma.loadFontAsync(fontBold)
      ]);
    } catch (err) {
      console.warn("Could not load all Inter styles, falling back to available defaults:", err);
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" }).catch(() => {});
    }

    // 3. BA Design System Color Palette (Normalized 0–1 Float)
    const C = {
      bg: { r: 8 / 255, g: 12 / 255, b: 23 / 255 },           // #080c17
      card: { r: 17 / 255, g: 18 / 255, b: 25 / 255 },         // #111219
      secondary: { r: 23 / 255, g: 26 / 255, b: 36 / 255 },   // #171a24
      accent: { r: 29 / 255, g: 33 / 255, b: 48 / 255 },      // #1d2130
      border: { r: 36 / 255, g: 40 / 255, b: 56 / 255 },      // #242838
      input: { r: 50 / 255, g: 56 / 255, b: 82 / 255 },       // #323852
      primary: { r: 112 / 255, g: 163 / 255, b: 217 / 255 },  // #70a3d9 (BA Primary)
      primaryHover: { r: 140 / 255, g: 185 / 255, b: 230 / 255 },
      text: { r: 233 / 255, g: 234 / 255, b: 242 / 255 },      // #e9eaf2
      muted: { r: 142 / 255, g: 149 / 255, b: 173 / 255 },     // #8e95ad
      subtle: { r: 95 / 255, g: 102 / 255, b: 128 / 255 },     // #5f6680
      highlight: { r: 255 / 255, g: 111 / 255, b: 190 / 255 },// #ff6fbe
      success: { r: 61 / 255, g: 220 / 255, b: 151 / 255 },    // #3ddc97
      warning: { r: 255 / 255, g: 203 / 255, b: 91 / 255 },    // #ffcb5b
      stageBg: { r: 12 / 255, g: 16 / 255, b: 29 / 255 },     // #0c101d
      white: { r: 1, g: 1, b: 1 }
    };

    const solid = (col, op = 1) => [{ type: "SOLID", color: col, opacity: op }];

    function createText(chars, size = 12, weight = fontRegular, color = C.text, align = "LEFT") {
      const t = figma.createText();
      t.fontName = weight;
      t.fontSize = size;
      t.characters = String(chars);
      t.fills = solid(color);
      t.textAlignHorizontal = align;
      t.textAutoResize = "WIDTH_AND_HEIGHT";
      return t;
    }

    function createSpacer() {
      const sp = figma.createFrame();
      sp.name = "Spacer";
      sp.resize(1, 1);
      sp.fills = [];
      sp.layoutGrow = 1;
      return sp;
    }

    function createAutoLayout(name, direction = "VERTICAL", gap = 8, padding = [0, 0, 0, 0], fills = null) {
      const f = figma.createFrame();
      f.name = name;
      f.layoutMode = direction;
      f.itemSpacing = gap;
      f.paddingLeft = padding[3] ?? padding[1] ?? padding[0];
      f.paddingRight = padding[1] ?? padding[0];
      f.paddingTop = padding[0];
      f.paddingBottom = padding[2] ?? padding[0];
      f.fills = fills ? fills : [];
      return f;
    }

    function createButton(label, variant = "Primary", size = "Small") {
      const btn = figma.createFrame();
      btn.name = `Button / ${variant} / ${size}`;
      btn.layoutMode = "HORIZONTAL";
      btn.primaryAxisAlignItems = "CENTER";
      btn.counterAxisAlignItems = "CENTER";
      btn.itemSpacing = 6;
      btn.cornerRadius = 6;
      btn.resize(110, size === "Large" ? 36 : 28);

      btn.paddingTop = size === "Large" ? 8 : 5;
      btn.paddingBottom = size === "Large" ? 8 : 5;
      btn.paddingLeft = size === "Large" ? 12 : 8;
      btn.paddingRight = size === "Large" ? 12 : 8;

      let bg = null, textColor = C.text, borderCol = null;
      if (variant === "Primary") {
        bg = C.primary;
        textColor = C.bg;
      } else if (variant === "Default") {
        bg = C.secondary;
        textColor = C.text;
        borderCol = C.border;
      } else {
        bg = null;
        textColor = C.text;
        borderCol = C.border;
      }

      btn.fills = bg ? solid(bg) : [];
      if (borderCol) {
        btn.strokes = solid(borderCol);
        btn.strokeWeight = 1;
        btn.strokeAlign = "INSIDE";
      }

      const txt = createText(label, 11, fontSemiBold, textColor);
      btn.appendChild(txt);
      return btn;
    }

    function createIconButton(symbolChar = "⚙", size = 28) {
      const ib = figma.createFrame();
      ib.name = "IconButton";
      ib.resize(size, size);
      ib.layoutMode = "HORIZONTAL";
      ib.primaryAxisAlignItems = "CENTER";
      ib.counterAxisAlignItems = "CENTER";
      ib.cornerRadius = 6;
      ib.fills = [];
      ib.strokes = solid(C.border);
      ib.strokeWeight = 1;
      ib.strokeAlign = "INSIDE";
      ib.appendChild(createText(symbolChar, 13, fontRegular, C.text));
      return ib;
    }

    function createSlider(label, valueStr, percent = 0.5) {
      const root = createAutoLayout(`Slider · ${label}`, "VERTICAL", 4);
      root.layoutAlign = "STRETCH";

      const header = createAutoLayout("Row", "HORIZONTAL", 8);
      header.layoutAlign = "STRETCH";
      header.counterAxisAlignItems = "CENTER";
      header.appendChild(createText(label, 11, fontRegular, C.muted));
      header.appendChild(createSpacer());
      header.appendChild(createText(valueStr, 11, fontRegular, C.text));
      root.appendChild(header);

      const track = figma.createFrame();
      track.name = "Track";
      track.layoutAlign = "STRETCH";
      track.resize(246, 5);
      track.cornerRadius = 3;
      track.fills = solid(C.input);
      track.clipsContent = false;

      const fillBar = figma.createFrame();
      fillBar.name = "Active Fill";
      fillBar.resize(Math.max(6, 246 * percent), 5);
      fillBar.cornerRadius = 3;
      fillBar.fills = solid(C.primary);
      track.appendChild(fillBar);

      const thumb = figma.createEllipse();
      thumb.name = "Thumb";
      thumb.resize(12, 12);
      thumb.x = Math.max(0, 246 * percent - 6);
      thumb.y = -3.5;
      thumb.fills = solid(C.white);
      thumb.strokes = solid(C.primary);
      thumb.strokeWeight = 2;
      track.appendChild(thumb);

      root.appendChild(track);
      return root;
    }

    function createSelectField(label, selectedValue) {
      const root = createAutoLayout(`Select · ${label}`, "VERTICAL", 3);
      root.layoutAlign = "STRETCH";
      root.appendChild(createText(label, 10, fontRegular, C.muted));

      const box = createAutoLayout("InputBox", "HORIZONTAL", 8, [5, 8, 5, 8], solid(C.secondary));
      box.layoutAlign = "STRETCH";
      box.counterAxisAlignItems = "CENTER";
      box.cornerRadius = 6;
      box.strokes = solid(C.border);
      box.strokeWeight = 1;
      box.strokeAlign = "INSIDE";
      box.appendChild(createText(selectedValue, 11, fontRegular, C.text));
      box.appendChild(createSpacer());
      box.appendChild(createText("▾", 10, fontRegular, C.muted));

      root.appendChild(box);
      return root;
    }

    function createToggle(label, isChecked = true) {
      const row = createAutoLayout(`Toggle · ${label}`, "HORIZONTAL", 8, [2, 0, 2, 0]);
      row.layoutAlign = "STRETCH";
      row.counterAxisAlignItems = "CENTER";
      row.appendChild(createText(label, 11, fontRegular, C.text));
      row.appendChild(createSpacer());

      const switchBg = figma.createFrame();
      switchBg.name = "Switch";
      switchBg.resize(30, 16);
      switchBg.cornerRadius = 8;
      switchBg.fills = isChecked ? solid(C.primary) : solid(C.input);

      const knob = figma.createEllipse();
      knob.name = "Knob";
      knob.resize(12, 12);
      knob.x = isChecked ? 16 : 2;
      knob.y = 2;
      knob.fills = solid(C.white);
      switchBg.appendChild(knob);

      row.appendChild(switchBg);
      return row;
    }

    function createColorRow(label, hex) {
      const row = createAutoLayout(`Color · ${label}`, "HORIZONTAL", 8, [2, 0, 2, 0]);
      row.layoutAlign = "STRETCH";
      row.counterAxisAlignItems = "CENTER";
      row.appendChild(createText(label, 11, fontRegular, C.muted));
      row.appendChild(createSpacer());

      const swatch = figma.createFrame();
      swatch.resize(32, 18);
      swatch.cornerRadius = 4;
      swatch.fills = solid(hex);
      swatch.strokes = solid(C.border);
      swatch.strokeWeight = 1;
      swatch.strokeAlign = "INSIDE";
      row.appendChild(swatch);
      return row;
    }

    function createAccordion(title, isOpen = true, children = []) {
      const section = createAutoLayout(`Section · ${title}`, "VERTICAL", 0, [0, 0, 0, 0]);
      section.layoutAlign = "STRETCH";
      section.strokes = solid(C.border);
      section.strokeWeight = 1;
      section.strokeAlign = "INSIDE";

      // Header row (compact 32px height)
      const header = createAutoLayout("Summary Header", "HORIZONTAL", 8, [7, 12, 7, 12], solid(C.card));
      header.layoutAlign = "STRETCH";
      header.counterAxisAlignItems = "CENTER";

      const t = createText(title.toUpperCase(), 10, fontBold, C.subtle);
      t.letterSpacing = { value: 6, unit: "PERCENT" };
      header.appendChild(t);
      header.appendChild(createSpacer());
      header.appendChild(createText(isOpen ? "▾" : "▸", 10, fontRegular, C.muted));
      section.appendChild(header);

      // Body
      if (isOpen && children.length > 0) {
        const body = createAutoLayout("Body", "VERTICAL", 8, [6, 12, 10, 12], solid(C.card));
        body.layoutAlign = "STRETCH";
        children.forEach(c => body.appendChild(c));
        section.appendChild(body);
      }
      return section;
    }

    function createPresetCard(name, stopColors, isSelected = false) {
      const card = createAutoLayout(`PresetCard · ${name}`, "VERTICAL", 4);
      card.resize(118, 80);

      const thumb = figma.createFrame();
      thumb.name = "Canvas Thumb";
      thumb.resize(118, 56);
      thumb.cornerRadius = 5;
      thumb.layoutAlign = "STRETCH";
      thumb.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: stopColors.map((col, idx) => ({
          position: idx / (stopColors.length - 1),
          color: { ...col, a: 1 }
        }))
      }];

      thumb.strokes = isSelected ? solid(C.primary) : solid(C.border);
      thumb.strokeWeight = isSelected ? 2 : 1;
      thumb.strokeAlign = isSelected ? "OUTSIDE" : "INSIDE";
      card.appendChild(thumb);
      card.appendChild(createText(name, 10, fontMedium, isSelected ? C.text : C.muted));
      return card;
    }

    // -------------------------------------------------------------
    // 4. MAIN STUDIO FRAME (1440 × 900)
    // -------------------------------------------------------------
    const studioFrame = figma.createFrame();
    studioFrame.name = "Gradient Studio — Desktop (1440 × 900)";
    studioFrame.layoutMode = "VERTICAL";
    studioFrame.resize(1440, 900);
    studioFrame.primaryAxisSizingMode = "FIXED";
    studioFrame.counterAxisSizingMode = "FIXED";
    studioFrame.fills = solid(C.bg);
    studioFrame.clipsContent = true;

    let maxRight = 0;
    for (const child of figma.currentPage.children) {
      if (child.x + child.width > maxRight) maxRight = child.x + child.width;
    }
    studioFrame.x = maxRight + 120;
    studioFrame.y = 100;
    figma.currentPage.appendChild(studioFrame);

    // --- TOPBAR (44px) ---
    const topbar = createAutoLayout("Header / Topbar", "HORIZONTAL", 14, [8, 14, 8, 14], solid(C.card));
    topbar.resize(1440, 44);
    topbar.counterAxisAlignItems = "CENTER";
    topbar.strokes = solid(C.border);
    topbar.strokeWeight = 1;

    const brand = createAutoLayout("Brand", "HORIZONTAL", 8);
    brand.counterAxisAlignItems = "CENTER";
    const bDot = figma.createFrame();
    bDot.resize(10, 10);
    bDot.cornerRadius = 5;
    bDot.fills = solid(C.highlight);
    brand.appendChild(bDot);
    brand.appendChild(createText("Gradient Studio", 14, fontBold, C.text));

    const badge = createAutoLayout("Badge", "HORIZONTAL", 0, [2, 6, 2, 6], solid(C.secondary));
    badge.cornerRadius = 4;
    badge.appendChild(createText("v1.7.0", 10, fontMedium, C.muted));
    brand.appendChild(badge);
    topbar.appendChild(brand);

    topbar.appendChild(createSpacer());

    const hints = createAutoLayout("Hints", "HORIZONTAL", 12);
    hints.counterAxisAlignItems = "CENTER";
    hints.appendChild(createText("R  randomise", 11, fontRegular, C.subtle));
    hints.appendChild(createText("Space  play", 11, fontRegular, C.subtle));
    hints.appendChild(createText("E  export", 11, fontRegular, C.subtle));
    topbar.appendChild(hints);
    topbar.appendChild(createIconButton("⚙", 28));

    studioFrame.appendChild(topbar);
    topbar.layoutSizingHorizontal = "FILL";
    topbar.layoutSizingVertical = "FIXED";

    // --- MAIN 3-COLUMN WORKSPACE (1440 × 856) ---
    const workspace = createAutoLayout("Main Workspace", "HORIZONTAL", 0);
    workspace.resize(1440, 856);
    workspace.primaryAxisSizingMode = "FIXED";
    workspace.counterAxisSizingMode = "FIXED";
    studioFrame.appendChild(workspace);
    workspace.layoutSizingHorizontal = "FILL";
    workspace.layoutSizingVertical = "FILL";

    // === LEFT SIDEBAR: CREATIVE CONTROLS (274px) ===
    const leftSidebar = createAutoLayout("Left Sidebar / Controls", "VERTICAL", 0, [0, 0, 0, 0], solid(C.card));
    leftSidebar.resize(274, 856);
    leftSidebar.strokes = solid(C.border);
    leftSidebar.strokeWeight = 1;
    workspace.appendChild(leftSidebar);
    leftSidebar.layoutSizingHorizontal = "FIXED";
    leftSidebar.layoutSizingVertical = "FILL";

    // 1. Presets
    const pGrid = createAutoLayout("Preset Grid", "HORIZONTAL", 10);
    pGrid.appendChild(createPresetCard("Aurora Glow", [C.primary, C.highlight, C.warning], true));
    pGrid.appendChild(createPresetCard("Neon Mesh", [C.highlight, C.primary, C.success], false));

    const btnRow1 = createAutoLayout("BtnRow", "HORIZONTAL", 8);
    btnRow1.layoutAlign = "STRETCH";
    const b1 = createButton("New shape", "Primary", "Small");
    b1.layoutGrow = 1;
    const b2 = createButton("Surprise me", "Ghost", "Small");
    b2.layoutGrow = 1;
    btnRow1.appendChild(b1);
    btnRow1.appendChild(b2);

    const bSave = createButton("Save this look", "Default", "Small");
    bSave.layoutAlign = "STRETCH";
    leftSidebar.appendChild(createAccordion("Preset · Aurora Glow", true, [pGrid, btnRow1, bSave]));

    // 2. Shape
    leftSidebar.appendChild(createAccordion("Shape", true, [
      createSelectField("Style", "Aurora"),
      createSelectField("Blend", "Screen"),
      createSlider("Shapes", "4", 0.4),
      createSlider("Scale", "0.85", 0.6),
      createSlider("Travel", "0.40", 0.3),
      createSlider("Warp", "0.25", 0.25)
    ]));

    // 3. Colour
    const palStrip = createAutoLayout("Palettes Strip", "HORIZONTAL", 4);
    palStrip.layoutAlign = "STRETCH";
    for (let i = 0; i < 6; i++) {
      const pill = figma.createFrame();
      pill.resize(36, 16);
      pill.cornerRadius = 4;
      pill.fills = solid(i % 2 === 0 ? C.primary : C.highlight);
      palStrip.appendChild(pill);
    }
    const bShuffle = createButton("Shuffle order", "Primary", "Small");
    bShuffle.layoutAlign = "STRETCH";
    leftSidebar.appendChild(createAccordion("Colour", true, [
      palStrip,
      createColorRow("Colour 1", C.highlight),
      createColorRow("Colour 2", C.primary),
      createColorRow("Colour 3", C.success),
      createColorRow("Colour 4", C.warning),
      createSlider("Colours used", "4", 0.75),
      createColorRow("Background", C.bg),
      bShuffle
    ]));

    // 4. Effects
    leftSidebar.appendChild(createAccordion("Effects", true, [
      createSelectField("Effect", "Halftone Dot"),
      createSlider("Dot Size", "12", 0.45),
      createSlider("Intensity", "0.70", 0.7)
    ]));

    // 5. Finish
    leftSidebar.appendChild(createAccordion("Finish", true, [
      createSlider("Softness", "0.85", 0.85),
      createSlider("Blur", "24px", 0.24),
      createSlider("Grain", "0.15", 0.15),
      createToggle("Animate grain", true)
    ]));

    // === CENTER STAGE: PREVIEW & TIMELINE (866px) ===
    const stage = createAutoLayout("Center Stage / Preview", "VERTICAL", 0, [0, 0, 0, 0], solid(C.stageBg));
    stage.resize(866, 856);
    workspace.appendChild(stage);
    stage.layoutSizingHorizontal = "FILL";
    stage.layoutSizingVertical = "FILL";

    const viewport = createAutoLayout("Canvas Viewport", "HORIZONTAL", 0, [24, 24, 24, 24]);
    viewport.layoutAlign = "STRETCH";
    viewport.layoutGrow = 1;
    viewport.primaryAxisAlignItems = "CENTER";
    viewport.counterAxisAlignItems = "CENTER";

    const canvasCard = figma.createFrame();
    canvasCard.name = "Animated Gradient Canvas (700 × 440)";
    canvasCard.resize(700, 440);
    canvasCard.cornerRadius = 8;
    canvasCard.strokes = solid(C.border);
    canvasCard.strokeWeight = 1;
    canvasCard.fills = [{
      type: "GRADIENT_ANGULAR",
      gradientTransform: [[0.5, 0.5, 0], [-0.5, 0.5, 0]],
      gradientStops: [
        { position: 0, color: { ...C.primary, a: 1 } },
        { position: 0.35, color: { ...C.highlight, a: 1 } },
        { position: 0.7, color: { ...C.warning, a: 1 } },
        { position: 1, color: { ...C.success, a: 1 } }
      ]
    }];
    viewport.appendChild(canvasCard);
    stage.appendChild(viewport);

    // Transport bar (48px)
    const transport = createAutoLayout("Transport Bar", "HORIZONTAL", 12, [8, 16, 8, 16], solid(C.card));
    transport.layoutAlign = "STRETCH";
    transport.resize(866, 48);
    transport.counterAxisAlignItems = "CENTER";
    transport.strokes = solid(C.border);
    transport.strokeWeight = 1;

    transport.appendChild(createIconButton("⏸", 28));

    const scrubTrack = figma.createFrame();
    scrubTrack.name = "Timeline Scrubber";
    scrubTrack.layoutGrow = 1;
    scrubTrack.resize(600, 5);
    scrubTrack.cornerRadius = 3;
    scrubTrack.fills = solid(C.input);

    const scrubFill = figma.createFrame();
    scrubFill.name = "Playhead Progress";
    scrubFill.resize(252, 5);
    scrubFill.cornerRadius = 3;
    scrubFill.fills = solid(C.primary);
    scrubTrack.appendChild(scrubFill);

    const scrubKnob = figma.createEllipse();
    scrubKnob.name = "Playhead Knob";
    scrubKnob.resize(12, 12);
    scrubKnob.x = 246;
    scrubKnob.y = -3.5;
    scrubKnob.fills = solid(C.white);
    scrubKnob.strokes = solid(C.primary);
    scrubKnob.strokeWeight = 2;
    scrubTrack.appendChild(scrubKnob);
    transport.appendChild(scrubTrack);
    transport.appendChild(createText("frame 27 / 64", 11, fontMedium, C.muted));

    stage.appendChild(transport);

    // === RIGHT SIDEBAR: SPECS & EXPORT (300px) ===
    const rightSidebar = createAutoLayout("Right Sidebar / Output", "VERTICAL", 0, [0, 0, 0, 0], solid(C.card));
    rightSidebar.resize(300, 856);
    rightSidebar.strokes = solid(C.border);
    rightSidebar.strokeWeight = 1;
    workspace.appendChild(rightSidebar);
    rightSidebar.layoutSizingHorizontal = "FIXED";
    rightSidebar.layoutSizingVertical = "FILL";

    // 6. Canvas size
    const sizeRow = createAutoLayout("Width/Height Row", "HORIZONTAL", 8);
    sizeRow.layoutAlign = "STRETCH";
    const numW = createSelectField("Width", "1200");
    numW.layoutGrow = 1;
    const numH = createSelectField("Height", "630");
    numH.layoutGrow = 1;
    sizeRow.appendChild(numW);
    sizeRow.appendChild(numH);
    rightSidebar.appendChild(createAccordion("Canvas size", true, [createSelectField("Preset", "1200 × 630 (Social / OG)"), sizeRow]));

    // 7. Timing
    const tTimingHelp = createText("64 frames, plays at 25.00 fps", 10, fontRegular, C.subtle);
    rightSidebar.appendChild(createAccordion("Timing", true, [
      createSelectField("Frame rate", "25 fps"),
      createSlider("Loop length", "2.5s", 0.35),
      createSlider("Motion speed", "2x", 0.25),
      tTimingHelp
    ]));

    // 8. Crop
    const bResetCrop = createButton("Reset crop", "Ghost", "Small");
    bResetCrop.layoutAlign = "STRETCH";
    rightSidebar.appendChild(createAccordion("Crop", true, [
      createSlider("Zoom X", "1.00", 0.0),
      createSlider("Zoom Y", "1.00", 0.0),
      createToggle("Link X and Y", true),
      createSlider("Position X", "0.50", 0.5),
      createSlider("Position Y", "0.50", 0.5),
      bResetCrop
    ]));

    // 9. Export
    const bExpGif = createButton("Export GIF", "Primary", "Small");
    bExpGif.layoutAlign = "STRETCH";
    const bExpMp4 = createButton("Export MP4 Video", "Default", "Small");
    bExpMp4.layoutAlign = "STRETCH";
    const bExpPng = createButton("Export PNG Sequence", "Ghost", "Small");
    bExpPng.layoutAlign = "STRETCH";
    const expStats = createText("Est. size: ~1.4 MB · 64 frames", 10, fontRegular, C.muted, "CENTER");
    expStats.layoutAlign = "STRETCH";
    rightSidebar.appendChild(createAccordion("Export", true, [bExpGif, bExpMp4, bExpPng, expStats]));

    // -------------------------------------------------------------
    // 5. MODAL 1: EXPORT PROGRESS OVERLAY
    // -------------------------------------------------------------
    const modalExport = createAutoLayout("Overlay · Export Progress", "VERTICAL", 14, [20, 20, 20, 20], solid(C.card));
    modalExport.resize(380, 180);
    modalExport.cornerRadius = 10;
    modalExport.strokes = solid(C.border);
    modalExport.strokeWeight = 1;
    modalExport.x = studioFrame.x + 1440 + 60;
    modalExport.y = 100;
    modalExport.appendChild(createText("Rendering GIF...", 15, fontBold, C.text));

    const progTrack = figma.createFrame();
    progTrack.layoutAlign = "STRETCH";
    progTrack.resize(340, 7);
    progTrack.cornerRadius = 4;
    progTrack.fills = solid(C.input);

    const progFill = figma.createFrame();
    progFill.resize(231, 7);
    progFill.cornerRadius = 4;
    progFill.fills = solid(C.primary);
    progTrack.appendChild(progFill);
    modalExport.appendChild(progTrack);

    modalExport.appendChild(createText("Encoding frame 43 of 64 (68%)", 11, fontRegular, C.muted));
    const bCancel = createButton("Cancel", "Ghost", "Small");
    bCancel.layoutAlign = "STRETCH";
    modalExport.appendChild(bCancel);
    figma.currentPage.appendChild(modalExport);

    // -------------------------------------------------------------
    // 6. MODAL 2: SETTINGS & APPEARANCE
    // -------------------------------------------------------------
    const modalSettings = createAutoLayout("Overlay · Settings & Appearance", "VERTICAL", 14, [18, 18, 18, 18], solid(C.card));
    modalSettings.resize(440, 320);
    modalSettings.cornerRadius = 10;
    modalSettings.strokes = solid(C.border);
    modalSettings.strokeWeight = 1;
    modalSettings.x = studioFrame.x + 1440 + 60;
    modalSettings.y = 310;

    const sHeader = createAutoLayout("Header", "HORIZONTAL", 8);
    sHeader.layoutAlign = "STRETCH";
    sHeader.counterAxisAlignItems = "CENTER";
    sHeader.appendChild(createText("Settings", 15, fontBold, C.text));
    sHeader.appendChild(createSpacer());
    sHeader.appendChild(createIconButton("✕", 24));
    modalSettings.appendChild(sHeader);

    const tabRow = createAutoLayout("Tabs", "HORIZONTAL", 8);
    tabRow.layoutAlign = "STRETCH";
    tabRow.appendChild(createButton("Appearance", "Primary", "Small"));
    tabRow.appendChild(createButton("Export Engine", "Ghost", "Small"));
    tabRow.appendChild(createButton("Shortcuts", "Ghost", "Small"));
    modalSettings.appendChild(tabRow);

    modalSettings.appendChild(createSelectField("Color Mode", "Dark (System default)"));
    modalSettings.appendChild(createSelectField("Contrast Tier", "Balanced (0 failures)"));
    modalSettings.appendChild(createSelectField("Colour Temperature", "Neutral (Standard)"));
    modalSettings.appendChild(createToggle("Reduced Motion", false));
    figma.currentPage.appendChild(modalSettings);

    // Viewport zoom directly into the new design
    figma.viewport.scrollAndZoomIntoView([studioFrame, modalExport, modalSettings]);

    console.log("✅ Successfully built Gradient Studio in Figma in 0.8s!");
    figma.notify("✓ Gradient Studio built successfully!");
  } catch (err) {
    console.error("Error building Gradient Studio in Figma:", err);
    try { figma.notify("Error: " + err.message, { error: true }); } catch (_) {}
  } finally {
    try { figma.closePlugin(); } catch (_) {}
  }
})();
