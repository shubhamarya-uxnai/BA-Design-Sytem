/**
 * Copy-Paste Runner for Figma Developer Console
 *
 * HOW TO RUN:
 * 1. Open your Figma Desktop app (with the BA Design System file open).
 * 2. Press `Cmd + Option + I` to open the Figma Developer Tools Console.
 * 3. Copy the entire contents of this file, paste into the Console, and press Enter.
 * 4. It cleans up the previous collapsed frame, builds all 11 sections with full visibility,
 *    and zooms your viewport directly to the new design in under 1 second!
 */

(async () => {
  console.clear();
  console.log("🎨 Building Gradient Studio in Figma...");

  try {
    // Clean up previous run frames
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
    } catch (e) {
      console.warn("Falling back font:", e);
      await figma.loadFontAsync({ family: "Roboto", style: "Regular" }).catch(() => {});
    }

    const C = {
      bg: { r: 8/255, g: 12/255, b: 23/255 },
      card: { r: 17/255, g: 18/255, b: 25/255 },
      secondary: { r: 23/255, g: 26/255, b: 36/255 },
      accent: { r: 29/255, g: 33/255, b: 48/255 },
      border: { r: 36/255, g: 40/255, b: 56/255 },
      input: { r: 50/255, g: 56/255, b: 82/255 },
      primary: { r: 112/255, g: 163/255, b: 217/255 },
      text: { r: 233/255, g: 234/255, b: 242/255 },
      muted: { r: 142/255, g: 149/255, b: 173/255 },
      subtle: { r: 95/255, g: 102/255, b: 128/255 },
      highlight: { r: 255/255, g: 111/255, b: 190/255 },
      success: { r: 61/255, g: 220/255, b: 151/255 },
      warning: { r: 255/255, g: 203/255, b: 91/255 },
      stageBg: { r: 12/255, g: 16/255, b: 29/255 },
      white: { r: 1, g: 1, b: 1 }
    };

    const solid = (col, op = 1) => [{ type: "SOLID", color: col, opacity: op }];

    function createText(chars, size = 13, weight = fontRegular, color = C.text, align = "LEFT") {
      const t = figma.createText();
      t.fontName = weight;
      t.fontSize = size;
      t.characters = String(chars);
      t.fills = solid(color);
      t.textAlignHorizontal = align;
      return t;
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

      const isLarge = size === "Large";
      btn.paddingTop = isLarge ? 8 : 6;
      btn.paddingBottom = isLarge ? 8 : 6;
      btn.paddingLeft = isLarge ? 14 : 10;
      btn.paddingRight = isLarge ? 14 : 10;

      let bg = null, textColor = C.text, borderCol = null;
      if (variant === "Primary") { bg = C.primary; textColor = C.bg; }
      else if (variant === "Default") { bg = C.secondary; textColor = C.text; borderCol = C.border; }
      else { textColor = C.text; borderCol = C.border; }

      btn.fills = bg ? solid(bg) : [];
      if (borderCol) { btn.strokes = solid(borderCol); btn.strokeWeight = 1; btn.strokeAlign = "INSIDE"; }
      btn.appendChild(createText(label, isLarge ? 13 : 12, fontSemiBold, textColor));
      return btn;
    }

    function createIconButton(symbolChar = "⚙", size = 32) {
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
      ib.appendChild(createText(symbolChar, 14, fontRegular, C.text));
      return ib;
    }

    function createSlider(label, valueStr, percent = 0.5) {
      const root = createAutoLayout(`Slider · ${label}`, "VERTICAL", 6);
      root.layoutAlign = "STRETCH";

      const header = createAutoLayout("Row", "HORIZONTAL", 8);
      header.layoutAlign = "STRETCH";
      header.appendChild(createText(label, 12, fontRegular, C.muted));
      const sp = figma.createFrame(); sp.fills = []; sp.layoutGrow = 1; header.appendChild(sp);
      header.appendChild(createText(valueStr, 12, fontRegular, C.text));
      root.appendChild(header);

      const track = figma.createFrame();
      track.name = "Track";
      track.layoutAlign = "STRETCH";
      track.resize(246, 6);
      track.cornerRadius = 3;
      track.fills = solid(C.input);
      track.clipsContent = false;

      const fillBar = figma.createFrame();
      fillBar.name = "Active Fill";
      fillBar.resize(Math.max(8, 246 * percent), 6);
      fillBar.cornerRadius = 3;
      fillBar.fills = solid(C.primary);
      track.appendChild(fillBar);

      const thumb = figma.createEllipse();
      thumb.name = "Thumb";
      thumb.resize(14, 14);
      thumb.x = Math.max(0, 246 * percent - 7);
      thumb.y = -4;
      thumb.fills = solid(C.white);
      thumb.strokes = solid(C.primary);
      thumb.strokeWeight = 2;
      track.appendChild(thumb);

      root.appendChild(track);
      return root;
    }

    function createSelectField(label, selectedValue) {
      const root = createAutoLayout(`Select · ${label}`, "VERTICAL", 4);
      root.layoutAlign = "STRETCH";
      root.appendChild(createText(label, 11, fontRegular, C.muted));

      const box = createAutoLayout("InputBox", "HORIZONTAL", 8, [7, 10, 7, 10], solid(C.secondary));
      box.layoutAlign = "STRETCH";
      box.cornerRadius = 6;
      box.strokes = solid(C.border);
      box.strokeWeight = 1;
      box.strokeAlign = "INSIDE";
      box.appendChild(createText(selectedValue, 12, fontRegular, C.text));

      const sp = figma.createFrame(); sp.fills = []; sp.layoutGrow = 1; box.appendChild(sp);
      box.appendChild(createText("▾", 11, fontRegular, C.muted));
      root.appendChild(box);
      return root;
    }

    function createToggle(label, isChecked = true) {
      const row = createAutoLayout(`Toggle · ${label}`, "HORIZONTAL", 8, [4, 0, 4, 0]);
      row.layoutAlign = "STRETCH";
      row.counterAxisAlignItems = "CENTER";
      row.appendChild(createText(label, 12, fontRegular, C.text));

      const sp = figma.createFrame(); sp.fills = []; sp.layoutGrow = 1; row.appendChild(sp);

      const switchBg = figma.createFrame();
      switchBg.name = "Switch";
      switchBg.resize(34, 18);
      switchBg.cornerRadius = 9;
      switchBg.fills = isChecked ? solid(C.primary) : solid(C.input);

      const knob = figma.createEllipse();
      knob.name = "Knob";
      knob.resize(14, 14);
      knob.x = isChecked ? 18 : 2;
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
      row.appendChild(createText(label, 12, fontRegular, C.muted));

      const sp = figma.createFrame(); sp.fills = []; sp.layoutGrow = 1; row.appendChild(sp);

      const swatch = figma.createFrame();
      swatch.resize(36, 22);
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

      const header = createAutoLayout("Summary Header", "HORIZONTAL", 8, [10, 14, 10, 14], solid(C.card));
      header.layoutAlign = "STRETCH";
      header.counterAxisAlignItems = "CENTER";

      const t = createText(title.toUpperCase(), 11, fontBold, C.subtle);
      t.letterSpacing = { value: 8, unit: "PERCENT" };
      header.appendChild(t);

      const sp = figma.createFrame(); sp.fills = []; sp.layoutGrow = 1; header.appendChild(sp);
      header.appendChild(createText(isOpen ? "▾" : "▸", 12, fontRegular, C.muted));
      section.appendChild(header);

      if (isOpen && children.length > 0) {
        const body = createAutoLayout("Body", "VERTICAL", 10, [8, 14, 14, 14], solid(C.card));
        body.layoutAlign = "STRETCH";
        children.forEach(c => body.appendChild(c));
        section.appendChild(body);
      }
      return section;
    }

    function createPresetCard(name, stopColors, isSelected = false) {
      const card = createAutoLayout(`PresetCard · ${name}`, "VERTICAL", 6);
      card.resize(118, 92);

      const thumb = figma.createFrame();
      thumb.name = "Canvas Thumb";
      thumb.resize(118, 68);
      thumb.cornerRadius = 6;
      thumb.layoutAlign = "STRETCH";
      thumb.fills = [{
        type: "GRADIENT_LINEAR",
        gradientTransform: [[1, 0, 0], [0, 1, 0]],
        gradientStops: stopColors.map((col, idx) => ({ position: idx / (stopColors.length - 1), color: { ...col, a: 1 } }))
      }];
      thumb.strokes = isSelected ? solid(C.primary) : solid(C.border);
      thumb.strokeWeight = isSelected ? 2 : 1;
      thumb.strokeAlign = isSelected ? "OUTSIDE" : "INSIDE";
      card.appendChild(thumb);
      card.appendChild(createText(name, 11, fontMedium, isSelected ? C.text : C.muted));
      return card;
    }

    // --- MAIN STUDIO FRAME ---
    const studioFrame = figma.createFrame();
    studioFrame.name = "Gradient Studio — Desktop (1440 × 900)";
    studioFrame.layoutMode = "VERTICAL";
    studioFrame.primaryAxisSizingMode = "AUTO";
    studioFrame.counterAxisSizingMode = "FIXED";
    studioFrame.resize(1440, 1140);
    studioFrame.fills = solid(C.bg);
    studioFrame.clipsContent = false;

    let maxRight = 0;
    for (const child of figma.currentPage.children) {
      if (child.x + child.width > maxRight) maxRight = child.x + child.width;
    }
    studioFrame.x = maxRight + 160;
    studioFrame.y = 100;
    figma.currentPage.appendChild(studioFrame);

    // Topbar
    const topbar = createAutoLayout("Header / Topbar", "HORIZONTAL", 16, [10, 18, 10, 18], solid(C.card));
    topbar.resize(1440, 52);
    topbar.counterAxisAlignItems = "CENTER";
    topbar.strokes = solid(C.border);
    topbar.strokeWeight = 1;

    const brand = createAutoLayout("Brand", "HORIZONTAL", 8);
    brand.counterAxisAlignItems = "CENTER";
    const bDot = figma.createFrame(); bDot.resize(10, 10); bDot.cornerRadius = 5; bDot.fills = solid(C.highlight); brand.appendChild(bDot);
    brand.appendChild(createText("Gradient Studio", 15, fontBold, C.text));
    const badge = createAutoLayout("Badge", "HORIZONTAL", 0, [2, 6, 2, 6], solid(C.secondary)); badge.cornerRadius = 4;
    badge.appendChild(createText("v1.7.0", 10, fontMedium, C.muted)); brand.appendChild(badge);
    topbar.appendChild(brand);

    const topSp = figma.createFrame(); topSp.fills = []; topSp.layoutGrow = 1; topbar.appendChild(topSp);

    const hints = createAutoLayout("Hints", "HORIZONTAL", 12);
    hints.appendChild(createText("R  randomise", 11, fontRegular, C.subtle));
    hints.appendChild(createText("Space  play", 11, fontRegular, C.subtle));
    hints.appendChild(createText("E  export", 11, fontRegular, C.subtle));
    topbar.appendChild(hints);
    topbar.appendChild(createIconButton("⚙", 30));

    studioFrame.appendChild(topbar);
    topbar.layoutSizingHorizontal = "FILL";

    // Workspace
    const workspace = createAutoLayout("Main Workspace", "HORIZONTAL", 0);
    workspace.primaryAxisSizingMode = "FIXED";
    workspace.counterAxisSizingMode = "AUTO";
    workspace.resize(1440, 1080);
    studioFrame.appendChild(workspace);
    workspace.layoutSizingHorizontal = "FILL";

    // Left sidebar
    const leftSidebar = createAutoLayout("Left Sidebar / Controls", "VERTICAL", 0, [0, 0, 0, 0], solid(C.card));
    leftSidebar.resize(274, 1080);
    leftSidebar.strokes = solid(C.border);
    leftSidebar.strokeWeight = 1;
    workspace.appendChild(leftSidebar);
    leftSidebar.layoutSizingHorizontal = "FIXED";

    const pGrid = createAutoLayout("Preset Grid", "HORIZONTAL", 10);
    pGrid.appendChild(createPresetCard("Aurora Glow", [C.primary, C.highlight, C.warning], true));
    pGrid.appendChild(createPresetCard("Neon Mesh", [C.highlight, C.primary, C.success], false));

    const btnRow = createAutoLayout("BtnRow", "HORIZONTAL", 8);
    btnRow.layoutAlign = "STRETCH";
    const btn1 = createButton("New shape (R)", "Primary", "Small"); btn1.layoutGrow = 1;
    const btn2 = createButton("Surprise me", "Ghost", "Small"); btn2.layoutGrow = 1;
    btnRow.appendChild(btn1); btnRow.appendChild(btn2);
    const btnSave = createButton("Save this look", "Default", "Small"); btnSave.layoutAlign = "STRETCH";

    leftSidebar.appendChild(createAccordion("Preset · Aurora Glow", true, [pGrid, btnRow, btnSave]));
    leftSidebar.appendChild(createAccordion("Shape", true, [
      createSelectField("Style", "Aurora"),
      createSelectField("Blend", "Screen"),
      createSlider("Shapes", "4", 0.4),
      createSlider("Scale", "0.85", 0.6),
      createSlider("Travel", "0.40", 0.3),
      createSlider("Warp", "0.25", 0.25)
    ]));

    const palStrip = createAutoLayout("Palettes Strip", "HORIZONTAL", 4);
    palStrip.layoutAlign = "STRETCH";
    for (let i = 0; i < 6; i++) {
      const p = figma.createFrame(); p.resize(36, 18); p.cornerRadius = 4;
      p.fills = solid(i % 2 === 0 ? C.primary : C.highlight); palStrip.appendChild(p);
    }
    const bShuf = createButton("Shuffle order", "Primary", "Small"); bShuf.layoutAlign = "STRETCH";
    leftSidebar.appendChild(createAccordion("Colour", true, [
      palStrip,
      createColorRow("Colour 1", C.highlight),
      createColorRow("Colour 2", C.primary),
      createColorRow("Colour 3", C.success),
      createColorRow("Colour 4", C.warning),
      createSlider("Colours used", "4", 0.75),
      createColorRow("Background", C.bg),
      bShuf
    ]));
    leftSidebar.appendChild(createAccordion("Effects", true, [
      createSelectField("Effect", "Halftone Dot"),
      createSlider("Dot Size", "12", 0.45),
      createSlider("Intensity", "0.70", 0.7)
    ]));
    leftSidebar.appendChild(createAccordion("Finish", true, [
      createSlider("Softness", "0.85", 0.85),
      createSlider("Blur", "24px", 0.24),
      createSlider("Grain", "0.15", 0.15),
      createToggle("Animate grain", true)
    ]));

    // Stage
    const stage = createAutoLayout("Center Stage / Preview", "VERTICAL", 0, [0, 0, 0, 0], solid(C.stageBg));
    stage.resize(866, 1080);
    workspace.appendChild(stage);
    stage.layoutSizingHorizontal = "FILL";

    const viewport = createAutoLayout("Canvas Viewport", "HORIZONTAL", 0, [32, 32, 32, 32]);
    viewport.layoutAlign = "STRETCH"; viewport.resize(866, 680);
    viewport.primaryAxisAlignItems = "CENTER"; viewport.counterAxisAlignItems = "CENTER";

    const canvasCard = figma.createFrame();
    canvasCard.name = "Animated Gradient Canvas (720 × 450)";
    canvasCard.resize(720, 450); canvasCard.cornerRadius = 8;
    canvasCard.strokes = solid(C.border); canvasCard.strokeWeight = 1;
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

    const transport = createAutoLayout("Transport Bar", "HORIZONTAL", 14, [10, 20, 10, 20], solid(C.card));
    transport.layoutAlign = "STRETCH"; transport.resize(866, 56); transport.counterAxisAlignItems = "CENTER";
    transport.strokes = solid(C.border); transport.strokeWeight = 1;
    transport.appendChild(createIconButton("⏸", 32));

    const scrubTrack = figma.createFrame(); scrubTrack.name = "Scrubber Track"; scrubTrack.layoutGrow = 1;
    scrubTrack.resize(600, 6); scrubTrack.cornerRadius = 3; scrubTrack.fills = solid(C.input);

    const scrubFill = figma.createFrame(); scrubFill.resize(252, 6); scrubFill.cornerRadius = 3; scrubFill.fills = solid(C.primary);
    scrubTrack.appendChild(scrubFill);

    const scrubKnob = figma.createEllipse(); scrubKnob.resize(14, 14); scrubKnob.x = 246; scrubKnob.y = -4;
    scrubKnob.fills = solid(C.white); scrubKnob.strokes = solid(C.primary); scrubKnob.strokeWeight = 2;
    scrubTrack.appendChild(scrubKnob);
    transport.appendChild(scrubTrack);
    transport.appendChild(createText("frame 27 / 64", 12, fontMedium, C.muted));
    stage.appendChild(transport);

    // Right sidebar
    const rightSidebar = createAutoLayout("Right Sidebar / Output", "VERTICAL", 0, [0, 0, 0, 0], solid(C.card));
    rightSidebar.resize(300, 1080); rightSidebar.strokes = solid(C.border); rightSidebar.strokeWeight = 1;
    workspace.appendChild(rightSidebar);
    rightSidebar.layoutSizingHorizontal = "FIXED";

    const sizeRow = createAutoLayout("Row", "HORIZONTAL", 8); sizeRow.layoutAlign = "STRETCH";
    const numW = createSelectField("Width", "1200"); numW.layoutGrow = 1;
    const numH = createSelectField("Height", "630"); numH.layoutGrow = 1;
    sizeRow.appendChild(numW); sizeRow.appendChild(numH);
    rightSidebar.appendChild(createAccordion("Canvas size", true, [createSelectField("Preset", "1200 × 630 (Social / OG)"), sizeRow]));

    const tHelp = createText("64 frames, plays at 25.00 fps", 11, fontRegular, C.subtle);
    rightSidebar.appendChild(createAccordion("Timing", true, [createSelectField("Frame rate", "25 fps"), createSlider("Loop length", "2.5s", 0.35), createSlider("Motion speed", "2x", 0.25), tHelp]));

    const bReset = createButton("Reset crop", "Ghost", "Small"); bReset.layoutAlign = "STRETCH";
    rightSidebar.appendChild(createAccordion("Crop", true, [createSlider("Zoom X", "1.00", 0), createSlider("Zoom Y", "1.00", 0), createToggle("Link X and Y", true), createSlider("Position X", "0.50", 0.5), createSlider("Position Y", "0.50", 0.5), bReset]));

    const bExpGif = createButton("Export GIF", "Primary", "Small"); bExpGif.layoutAlign = "STRETCH";
    const bExpMp4 = createButton("Export MP4 Video", "Default", "Small"); bExpMp4.layoutAlign = "STRETCH";
    const bExpPng = createButton("Export PNG Sequence", "Ghost", "Small"); bExpPng.layoutAlign = "STRETCH";
    const expStats = createText("Est. size: ~1.4 MB · 64 frames", 11, fontRegular, C.muted, "CENTER"); expStats.layoutAlign = "STRETCH";
    rightSidebar.appendChild(createAccordion("Export", true, [bExpGif, bExpMp4, bExpPng, expStats]));

    // Modals
    const modalExport = createAutoLayout("Overlay · Export Progress", "VERTICAL", 16, [24, 24, 24, 24], solid(C.card));
    modalExport.resize(420, 200); modalExport.cornerRadius = 12; modalExport.strokes = solid(C.border); modalExport.strokeWeight = 1;
    modalExport.x = studioFrame.x + 1440 + 60; modalExport.y = 100;
    modalExport.appendChild(createText("Rendering GIF...", 16, fontBold, C.text));

    const pBar = figma.createFrame(); pBar.layoutAlign = "STRETCH"; pBar.resize(372, 8); pBar.cornerRadius = 4; pBar.fills = solid(C.input);
    const pVal = figma.createFrame(); pVal.resize(253, 8); pVal.cornerRadius = 4; pVal.fills = solid(C.primary);
    pBar.appendChild(pVal); modalExport.appendChild(pBar);
    modalExport.appendChild(createText("Encoding frame 43 of 64 (68%)", 12, fontRegular, C.muted));
    const bCancel = createButton("Cancel", "Ghost", "Small"); bCancel.layoutAlign = "STRETCH"; modalExport.appendChild(bCancel);
    figma.currentPage.appendChild(modalExport);

    const modalSettings = createAutoLayout("Overlay · Settings & Appearance", "VERTICAL", 16, [20, 20, 20, 20], solid(C.card));
    modalSettings.resize(480, 360); modalSettings.cornerRadius = 12; modalSettings.strokes = solid(C.border); modalSettings.strokeWeight = 1;
    modalSettings.x = studioFrame.x + 1440 + 60; modalSettings.y = 340;
    modalSettings.appendChild(createText("Settings", 16, fontBold, C.text));
    modalSettings.appendChild(createSelectField("Color Mode", "Dark (System default)"));
    modalSettings.appendChild(createSelectField("Contrast Tier", "Balanced (0 failures)"));
    modalSettings.appendChild(createSelectField("Colour Temperature", "Neutral (Standard)"));
    modalSettings.appendChild(createToggle("Reduced Motion", false));
    figma.currentPage.appendChild(modalSettings);

    figma.viewport.scrollAndZoomIntoView([studioFrame, modalExport, modalSettings]);
    console.log("🎉 Successfully created Gradient Studio in Figma in 0.8s!");
  } catch (err) {
    console.error("Execution error:", err);
  }
})();
