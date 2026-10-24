/**
 * BA Design System — 1-Click Web to Figma Reconstructor
 *
 * Reconstructs live web pages into native, auto-layout Figma frames
 * while strictly instantiating BA component sets, resolving icons,
 * and annotating unmapped design elements with visual warnings.
 */

figma.showUI(__html__, {
  width: 480,
  height: 680,
  title: "BA Design System — Web Reconstructor",
  themeColors: true
});

// Canonical BA Component Set IDs in the BA Design System file
const LOCAL_COMPONENT_MAP = {
  Button: "4149:6078",
  IconButton: "4149:6136",
  InputField: "4158:7549",
  Chip: "28:88",
  Selection: "4133:4266",
  Icon: "25:98"
};

// Fallback colors for BA tokens
const FALLBACK_PALETTE = {
  "--ba-background": { r: 8 / 255, g: 12 / 255, b: 23 / 255 },
  "--ba-card": { r: 17 / 255, g: 18 / 255, b: 25 / 255 },
  "--ba-secondary": { r: 23 / 255, g: 26 / 255, b: 36 / 255 },
  "--ba-border": { r: 36 / 255, g: 40 / 255, b: 56 / 255 },
  "--ba-input": { r: 50 / 255, g: 56 / 255, b: 82 / 255 },
  "--ba-primary": { r: 112 / 255, g: 163 / 255, b: 217 / 255 },
  "--ba-highlight": { r: 255 / 255, g: 111 / 255, b: 190 / 255 },
  "--ba-success": { r: 61 / 255, g: 220 / 255, b: 151 / 255 },
  "--ba-foreground": { r: 233 / 255, g: 234 / 255, b: 242 / 255 },
  "--ba-muted-foreground": { r: 142 / 255, g: 149 / 255, b: 173 / 255 },
  "--ba-subtle-foreground": { r: 95 / 255, g: 102 / 255, b: 128 / 255 }
};

// Common icon alias map for Material / Boxicons resolution
const ICON_ALIASES = {
  settings: ["settings", "bxs-cog", "bx-cog", "gear", "cog"],
  pause: ["pause", "bx-pause", "bxs-pause"],
  play: ["play", "bx-play", "bxs-play", "arrow-right"],
  refresh: ["refresh", "bx-refresh", "bxs-refresh", "redo"],
  download: ["download", "bxs-download", "bx-download"],
  close: ["close", "bx-window-close", "bx-x", "bxs-x-circle", "clear"],
  expand_more: ["expand_more", "bxs-chevron-down", "bx-chevron-down", "chevron-down"],
  chevron_right: ["chevron_right", "bxs-chevron-right", "bx-chevron-right", "arrow-right"],
  search: ["search", "bxs-search", "bx-search"]
};

function base64ToUint8Array(base64) {
  const binaryString = atob(base64.replace(/^data:image\/\w+;base64,/, ""));
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function getNodeSafely(id) {
  if (!id) return null;
  try {
    if (typeof figma.getNodeByIdAsync === "function") {
      const n = await figma.getNodeByIdAsync(id);
      if (n) return n;
    }
  } catch (_) {}
  try {
    return figma.getNodeById(id);
  } catch (_) {}
  return null;
}

async function ensurePagesLoaded() {
  for (const page of figma.root.children) {
    if (page && typeof page.loadAsync === "function") {
      try {
        await page.loadAsync();
      } catch (_) {}
    }
  }
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "CHECK_LOCAL_SYSTEM") {
    await ensurePagesLoaded();
    let foundComponents = 0;
    for (const [name, id] of Object.entries(LOCAL_COMPONENT_MAP)) {
      try {
        const node = await getNodeSafely(id);
        if (node) foundComponents++;
      } catch (_) {}
    }

    let iconPage = null;
    let iconCount = 0;
    try {
      iconPage = figma.root.children.find((p) => p && p.name && p.name.toLowerCase().includes("icon"));
      if (iconPage) {
        iconCount = iconPage.findAllWithCriteria({ types: ["COMPONENT"] }).length;
      }
    } catch (_) {}

    let hasBaTokens = false;
    try {
      const collections = await figma.variables.getLocalVariableCollectionsAsync();
      hasBaTokens = collections.some(
        (c) => c && c.name && (c.name.toLowerCase().includes("color") || c.name.toLowerCase().includes("ba"))
      );
    } catch (_) {}

    figma.ui.postMessage({
      type: "SYSTEM_STATUS",
      foundComponents,
      hasBaTokens,
      fileName: figma.root.name || "Untitled",
      iconLibraryPage: iconPage ? iconPage.name : null,
      iconCount: iconCount || 0
    });
    return;
  }

  if (msg.type === "REPLICATE_PAGE") {
    try {
      const { scene, mode, title, iconResolution, auditSettings } = msg;

      if (!scene) {
        throw new Error("No scene AST payload received from bridge.");
      }

      figma.ui.postMessage({ type: "PROGRESS", step: "Preloading Inter fonts..." });

      const fontRegular = { family: "Inter", style: "Regular" };
      const fontMedium = { family: "Inter", style: "Medium" };
      const fontSemiBold = { family: "Inter", style: "Semi Bold" };
      const fontBold = { family: "Inter", style: "Bold" };

      await Promise.all([
        figma.loadFontAsync(fontRegular).catch(() => {}),
        figma.loadFontAsync(fontMedium).catch(() => {}),
        figma.loadFontAsync(fontSemiBold).catch(() => {}),
        figma.loadFontAsync(fontBold).catch(() => {})
      ]);

      figma.ui.postMessage({ type: "PROGRESS", step: "Indexing Component Sets & Icon Library..." });

      // 1. Index Local Variables with strict null safety
      const variableMap = new Map();
      try {
        const localVariables = await figma.variables.getLocalVariablesAsync();
        for (const v of localVariables) {
          if (v && v.id) {
            variableMap.set(v.id, v);
            if (v.name) {
              variableMap.set(v.name.toLowerCase(), v);
              variableMap.set(v.name.toLowerCase().replace(/[\s\/-]+/g, ""), v);
            }
          }
        }
      } catch (err) {
        console.warn("Could not index local variables:", err);
      }

      // 1b. Index Local Text Styles from file
      const textStyleMap = new Map();
      try {
        const localTextStyles = await figma.getLocalTextStylesAsync();
        for (const s of localTextStyles) {
          if (s && s.id && s.name) {
            textStyleMap.set(s.name.toLowerCase().trim(), s);
            textStyleMap.set(s.name.toLowerCase().replace(/[\s\/-]+/g, ""), s);
          }
        }
      } catch (err) {
        console.warn("Could not index local text styles:", err);
      }

      function resolveTextStyle(fontSize, fontWeight) {
        if (textStyleMap.size === 0) return null;
        const size = Math.round(fontSize || 12);
        const bold = fontWeight >= 600 || String(fontWeight).includes("bold");

        let candidates = [];
        if (size >= 36) candidates = ["title/large", "title/medium", "title/small"];
        else if (size >= 28) candidates = ["heading/large", "heading/medium", "title/small"];
        else if (size >= 24) candidates = ["heading/small", "heading/medium"];
        else if (size >= 20) candidates = bold ? ["heading/small", "body emphasis/medium"] : ["body/medium", "body/large"];
        else if (size >= 16) candidates = bold ? ["body emphasis/small", "body emphasis/medium"] : ["body/small", "body/medium"];
        else if (size >= 14) candidates = ["body/xs", "body/small"];
        else if (size === 12) candidates = bold ? ["label emphasis", "label/large"] : ["label/large", "body/xs"];
        else if (size === 11) candidates = ["label/medium", "label/small"];
        else if (size <= 10) candidates = ["label/small", "legend/small"];

        for (const c of candidates) {
          if (textStyleMap.has(c)) return textStyleMap.get(c);
          const norm = c.replace(/[\s\/-]+/g, "");
          if (textStyleMap.has(norm)) return textStyleMap.get(norm);
        }

        for (const [k, s] of textStyleMap.entries()) {
          if (s.fontSize === size) return s;
        }
        return textStyleMap.get("body/small") || textStyleMap.get("label/large") || null;
      }

      // 2. Index Local Component Sets with strict null safety
      const componentSetCache = new Map();
      for (const [name, id] of Object.entries(LOCAL_COMPONENT_MAP)) {
        try {
          let node = await getNodeSafely(id);
          if (!node) {
            node = figma.root.findOne(
              (n) => n && n.type === "COMPONENT_SET" && n.name && (n.name === name || n.name.toLowerCase().includes(name.toLowerCase()))
            );
          }
          if (node && node.type === "COMPONENT_SET") {
            componentSetCache.set(name, node);
          }
        } catch (_) {}
      }

      // 3. Index Icon Components across all pages with strict null safety
      const iconComponentMap = new Map();
      try {
        const allComponents = figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
        for (const comp of allComponents) {
          if (!comp || !comp.id || !comp.name) continue;
          const cName = comp.name.toLowerCase().trim();
          iconComponentMap.set(cName, comp);
          const cleanName = cName.replace(/^(bxs?-|bx-|icon-|material-symbols-)/, "");
          iconComponentMap.set(cleanName, comp);
          const parts = cName.split("/");
          const baseName = parts[parts.length - 1].trim();
          iconComponentMap.set(baseName, comp);
          const cleanBase = baseName.replace(/^(bxs?-|bx-|icon-|material-symbols-)/, "");
          iconComponentMap.set(cleanBase, comp);
        }
      } catch (err) {
        console.warn("Could not index components:", err);
      }

      function resolveIconComponent(iconName) {
        if (!iconName) return null;
        const raw = String(iconName).toLowerCase().trim();
        if (iconComponentMap.has(raw)) return iconComponentMap.get(raw);

        const clean = raw.replace(/^(bxs?-|bx-|icon-|material-symbols-)/, "");
        if (iconComponentMap.has(clean)) return iconComponentMap.get(clean);

        const aliases = ICON_ALIASES[clean] || [];
        for (const a of aliases) {
          if (iconComponentMap.has(a)) return iconComponentMap.get(a);
        }

        for (const [k, comp] of iconComponentMap.entries()) {
          if (comp && comp.id && (k.includes(clean) || clean.includes(k))) {
            return comp;
          }
        }
        return null;
      }

      figma.ui.postMessage({ type: "PROGRESS", step: "Building layout & instantiating components..." });

      let createdNodesCount = 0;
      let unmappedWarningsCount = 0;

      function applyFill(frame, fillObj, boundToken, isUnmapped, unmappedHex) {
        if (!frame) return;
        if (!fillObj) {
          frame.fills = [];
          return;
        }

        const solidPaint = {
          type: "SOLID",
          color: { r: fillObj.r, g: fillObj.g, b: fillObj.b },
          opacity: fillObj.a !== undefined ? fillObj.a : 1
        };

        if (boundToken) {
          const varNode =
            variableMap.get(boundToken.variableId) ||
            variableMap.get(boundToken.name.toLowerCase()) ||
            variableMap.get(boundToken.name.toLowerCase().replace(/[\s\/-]+/g, "")) ||
            (boundToken.token ? variableMap.get(boundToken.token.toLowerCase().replace(/^--/, "")) : null);
          if (varNode) {
            try {
              const bound = figma.variables.setBoundVariableForPaint(solidPaint, "color", varNode);
              frame.fills = [bound];
              return;
            } catch (_) {}
          }
        }

        frame.fills = [solidPaint];

        if (isUnmapped && auditSettings?.addWarnings) {
          unmappedWarningsCount++;
          frame.name = `⚠️ [Custom: ${unmappedHex || "Color"}] ${frame.name}`;
        }
      }

      // Helper to create a clean fallback BA Button
      function createFallbackButton(spec) {
        const btn = figma.createFrame();
        btn.name = spec.name || "Button";
        btn.layoutMode = "HORIZONTAL";
        btn.primaryAxisAlignItems = "CENTER";
        btn.counterAxisAlignItems = "CENTER";
        btn.itemSpacing = 6;
        btn.cornerRadius = 6;
        const isLarge = spec.props?.Size === "Large";
        btn.paddingLeft = isLarge ? 14 : 10;
        btn.paddingRight = isLarge ? 14 : 10;
        btn.paddingTop = isLarge ? 8 : 5;
        btn.paddingBottom = isLarge ? 8 : 5;

        const isPrimary = spec.props?.Type === "Primary";
        const isGhost = spec.props?.Type === "Ghost";

        btn.fills = isPrimary
          ? [{ type: "SOLID", color: FALLBACK_PALETTE["--ba-primary"] }]
          : isGhost
          ? []
          : [{ type: "SOLID", color: FALLBACK_PALETTE["--ba-card"] }];

        if (!isPrimary && !isGhost) {
          btn.strokes = [{ type: "SOLID", color: FALLBACK_PALETTE["--ba-border"] }];
          btn.strokeWeight = 1;
        }

        const txt = figma.createText();
        txt.fontName = fontMedium;
        txt.fontSize = isLarge ? 14 : 12;
        txt.characters = String(spec.props?.Button || spec.props?.Icon || "Button");
        txt.fills = [{ type: "SOLID", color: isPrimary ? FALLBACK_PALETTE["--ba-background"] : FALLBACK_PALETTE["--ba-foreground"] }];
        btn.appendChild(txt);
        return btn;
      }

      // 4. Recursive AST Synthesizer
      async function buildNode(spec, isRoot = false) {
        if (!spec) return null;
        createdNodesCount++;

        // A. BA COMPONENT INSTANCE
        if (spec.type === "BA_COMPONENT") {
          const compSet = componentSetCache.get(spec.component);
          if (compSet && mode === "local" && compSet.children && compSet.children.length > 0) {
            try {
              let matchedVariant = null;

              if (spec.component === "Button") {
                // 1. Try resolving exact variant by variantId if available
                if (spec.variantId) {
                  try {
                    const node = await getNodeSafely(spec.variantId);
                    if (node && (node.type === "COMPONENT" || node.type === "COMPONENT_SET")) {
                      matchedVariant = node;
                    }
                  } catch (_) {}
                }

                // 2. Otherwise find variant by properties
                if (!matchedVariant && compSet && compSet.children) {
                  matchedVariant = compSet.children.find((c) => {
                    if (!c || !c.variantProperties) return false;
                    const p = c.variantProperties;
                    return (
                      p.Type === spec.props.Type &&
                      p.Size === spec.props.Size &&
                      (p.Enabled === "True" || p.Enabled === undefined) &&
                      (p.Hover === "False" || p.Hover === undefined) &&
                      (p.Pressed === "False" || p.Pressed === undefined)
                    );
                  });
                }
              } else if (spec.component === "IconButton") {
                matchedVariant = compSet.children.find((c) => {
                  if (!c || !c.variantProperties) return false;
                  const p = c.variantProperties;
                  return p.Size === spec.props.Size && (p.Enabled === "True" || p.Enabled === undefined);
                });
              }

              if (!matchedVariant) {
                matchedVariant = compSet.defaultVariant || compSet.children[0];
              }

              if (matchedVariant && typeof matchedVariant.createInstance === "function") {
                const instance = matchedVariant.createInstance();
                const buttonLabel = String(spec.props?.Button || spec.label || "Button");
                instance.name = `Button / ${buttonLabel}`;

                const currentProps = instance.componentProperties || {};
                const propsToSet = {};

                if (spec.component === "Button") {
                  for (const [propName, propDef] of Object.entries(currentProps)) {
                    if (!propDef) continue;
                    if (propDef.type === "TEXT") {
                      propsToSet[propName] = buttonLabel;
                    }
                    if (propDef.type === "BOOLEAN" && propName.toLowerCase().includes("leading")) {
                      propsToSet[propName] = Boolean(spec.props?.hasLeadingIcon);
                    }
                    if (propDef.type === "BOOLEAN" && propName.toLowerCase().includes("tailing")) {
                      propsToSet[propName] = Boolean(spec.props?.hasTailingIcon);
                    }
                    if (propDef.type === "INSTANCE_SWAP" && propName.toLowerCase().includes("leading")) {
                      if (spec.props?.hasLeadingIcon && spec.props?.iconName) {
                        const iconComp = resolveIconComponent(spec.props.iconName);
                        if (iconComp && iconComp.id) propsToSet[propName] = iconComp.id;
                      }
                    }
                    if (propDef.type === "INSTANCE_SWAP" && propName.toLowerCase().includes("tailing")) {
                      if (spec.props?.hasTailingIcon && spec.props?.tailingIconName) {
                        const iconComp = resolveIconComponent(spec.props.tailingIconName);
                        if (iconComp && iconComp.id) propsToSet[propName] = iconComp.id;
                      }
                    }
                  }
                } else if (spec.component === "IconButton") {
                  const targetIcon = resolveIconComponent(spec.props?.Icon);
                  for (const [propName, propDef] of Object.entries(currentProps)) {
                    if (propDef && propDef.type === "INSTANCE_SWAP") {
                      if (targetIcon && targetIcon.id) {
                        propsToSet[propName] = targetIcon.id;
                      }
                    }
                  }
                }

                for (const [propKey, propVal] of Object.entries(propsToSet)) {
                  try {
                    instance.setProperties({ [propKey]: propVal });
                  } catch (err) {
                    console.warn(`setProperties warning on ${spec.component} [${propKey}]:`, err);
                  }
                }

                // Guarantee text layer and style is directly updated on the instance
                if (spec.component === "Button") {
                  const textChildren = instance.findAllWithCriteria({ types: ["TEXT"] });
                  for (const child of textChildren) {
                    if (child) {
                      try {
                        await figma.loadFontAsync(child.fontName);
                        child.characters = buttonLabel;
                        const btnStyle = resolveTextStyle(12, "Medium") || resolveTextStyle(12, "Regular");
                        if (btnStyle) {
                          await figma.loadFontAsync(btnStyle.fontName);
                          child.textStyleId = btnStyle.id;
                        }
                      } catch (_) {}
                    }
                  }

                  // Explicitly toggle icon layer visibility if leading/tailing icon isn't desired
                  if (!spec.props?.hasLeadingIcon) {
                    const leadingNodes = instance.findAll((n) => n.name === "download" || n.name.toLowerCase().includes("leading"));
                    for (const n of leadingNodes) {
                      try { n.visible = false; } catch (_) {}
                    }
                  }
                  if (!spec.props?.hasTailingIcon) {
                    const tailingNodes = instance.findAll((n) => n.name === "business" || n.name.toLowerCase().includes("tailing"));
                    for (const n of tailingNodes) {
                      try { n.visible = false; } catch (_) {}
                    }
                  }
                }

                return instance;
              }
            } catch (err) {
              console.warn(`Could not instantiate variant for ${spec.component}, using fallback:`, err);
            }
          }

          // Graceful fallback
          return createFallbackButton(spec);
        }

        // B. IMAGE / CANVAS SNAPSHOT
        if (spec.type === "IMAGE_CANVAS") {
          const imgFrame = figma.createFrame();
          imgFrame.name = spec.name || "Canvas Viewport";
          imgFrame.resize(Math.max(spec.width || 200, 200), Math.max(spec.height || 120, 120));
          imgFrame.cornerRadius = 8;

          if (spec.dataUrl && spec.dataUrl.length > 50) {
            try {
              const bytes = base64ToUint8Array(spec.dataUrl);
              const img = figma.createImage(bytes);
              imgFrame.fills = [{ type: "IMAGE", scaleMode: "FILL", imageHash: img.hash }];
            } catch (err) {
              console.warn("Could not create image fill:", err);
              imgFrame.fills = [{ type: "SOLID", color: FALLBACK_PALETTE["--ba-card"] }];
            }
          } else {
            imgFrame.fills = [{ type: "SOLID", color: FALLBACK_PALETTE["--ba-card"] }];
          }
          return imgFrame;
        }

        // C. ICON NODE
        if (spec.type === "ICON") {
          const iconComp = resolveIconComponent(spec.iconName);
          if (iconComp && typeof iconComp.createInstance === "function") {
            try {
              const instance = iconComp.createInstance();
              instance.name = `Icon / ${spec.iconName}`;
              instance.resize(spec.width || 20, spec.height || 20);
              return instance;
            } catch (_) {}
          }

          const iconFrame = figma.createFrame();
          iconFrame.name = `Icon / ${spec.iconName || "generic"}`;
          iconFrame.resize(spec.width || 20, spec.height || 20);
          iconFrame.fills = [];
          iconFrame.layoutMode = "HORIZONTAL";
          iconFrame.primaryAxisAlignItems = "CENTER";
          iconFrame.counterAxisAlignItems = "CENTER";

          const iconText = figma.createText();
          iconText.fontName = fontRegular;
          iconText.fontSize = Math.min(spec.height || 16, 16);
          let symbolChar = "●";
          const n = (spec.iconName || "").toLowerCase();
          if (n.includes("chevron_down") || n.includes("expand_more")) symbolChar = "⌵";
          else if (n.includes("chevron_right")) symbolChar = "›";
          else if (n.includes("chevron_left")) symbolChar = "‹";
          else if (n.includes("verified") || n.includes("check")) symbolChar = "✓";
          else if (n.includes("settings") || n.includes("cog")) symbolChar = "⚙";
          else if (n.includes("photo") || n.includes("image")) symbolChar = "🖼";
          else if (n.includes("pause")) symbolChar = "❚❚";
          else if (n.includes("play")) symbolChar = "▶";
          else if (n.includes("close") || n.includes("clear")) symbolChar = "✕";

          iconText.characters = symbolChar;
          if (spec.color) {
            iconText.fills = [{ type: "SOLID", color: { r: spec.color.r, g: spec.color.g, b: spec.color.b } }];
          }
          iconFrame.appendChild(iconText);
          return iconFrame;
        }

        // D. TEXT NODE
        if (spec.type === "TEXT") {
          const t = figma.createText();
          t.characters = String(spec.characters || "");

          const isBold = spec.fontWeight >= 600 || String(spec.fontWeight).includes("bold");
          const matchedStyle = resolveTextStyle(spec.fontSize, spec.fontWeight);

          if (matchedStyle) {
            try {
              await figma.loadFontAsync(matchedStyle.fontName);
              t.textStyleId = matchedStyle.id;
            } catch (_) {
              t.fontName = isBold ? fontBold : fontRegular;
              t.fontSize = Math.min(Math.max(spec.fontSize || 12, 10), 32);
            }
          } else {
            t.fontName = isBold ? fontBold : fontRegular;
            t.fontSize = Math.min(Math.max(spec.fontSize || 12, 10), 32);
          }

          if (spec.color) {
            const solidPaint = { type: "SOLID", color: { r: spec.color.r, g: spec.color.g, b: spec.color.b } };
            if (spec.boundToken) {
              const varNode =
                variableMap.get(spec.boundToken.variableId) ||
                variableMap.get(spec.boundToken.name.toLowerCase());
              if (varNode) {
                try {
                  const bound = figma.variables.setBoundVariableForPaint(solidPaint, "color", varNode);
                  t.fills = [bound];
                } catch (_) {
                  t.fills = [solidPaint];
                }
              } else {
                t.fills = [solidPaint];
              }
            } else {
              t.fills = [solidPaint];
            }
          }
          t.textAlignHorizontal = spec.textAlign || "LEFT";
          if (t.characters.length > 50) {
            t.textAutoResize = "HEIGHT";
            t.layoutSizingHorizontal = "FILL";
          } else {
            t.textAutoResize = "WIDTH_AND_HEIGHT";
          }

          if (spec.isUnmappedFont && auditSettings?.addWarnings) {
            unmappedWarningsCount++;
            t.name = `⚠️ [Custom Font: ${spec.fontFamily}] ${t.characters.slice(0, 15)}`;
          }
          return t;
        }

        // E. AUTO-LAYOUT CONTAINER
        const frame = figma.createFrame();
        frame.name = isRoot ? `Reconstructed · ${title || "BA Page"}` : spec.name || "Container";
        frame.clipsContent = false;

        if (spec.width && spec.height) {
          try {
            frame.resize(Math.max(spec.width, 1), Math.max(spec.height, 1));
          } catch (_) {}
        }

        if (spec.layoutWrap === "WRAP") {
          frame.layoutMode = "HORIZONTAL";
          try {
            frame.layoutWrap = "WRAP";
            frame.counterAxisSpacing = spec.itemSpacing || 8;
          } catch (_) {}
        } else {
          frame.layoutMode = spec.layoutMode || "VERTICAL";
        }
        frame.itemSpacing = spec.itemSpacing || 0;
        frame.cornerRadius = spec.cornerRadius || 0;

        if (spec.primaryAxisAlignItems) {
          try {
            frame.primaryAxisAlignItems = spec.primaryAxisAlignItems;
          } catch (_) {}
        }
        if (spec.counterAxisAlignItems) {
          try {
            frame.counterAxisAlignItems = spec.counterAxisAlignItems === "BASELINE" ? "CENTER" : spec.counterAxisAlignItems;
          } catch (_) {}
        }

        if (spec.padding) {
          frame.paddingTop = spec.padding[0] || 0;
          frame.paddingRight = spec.padding[1] || 0;
          frame.paddingBottom = spec.padding[2] || 0;
          frame.paddingLeft = spec.padding[3] || 0;
        }

        applyFill(frame, spec.fill, spec.boundToken, spec.isUnmappedColor, spec.unmappedHex);

        if (spec.borderWidth && spec.borderColor) {
          const strokePaint = {
            type: "SOLID",
            color: { r: spec.borderColor.r, g: spec.borderColor.g, b: spec.borderColor.b },
            opacity: spec.borderColor.a !== undefined ? spec.borderColor.a : 1
          };
          const borderToken = spec.boundBorderToken || { variableId: "VariableID:4148:1613", name: "border/default" };
          const borderVar =
            variableMap.get(borderToken.variableId) ||
            variableMap.get(borderToken.name.toLowerCase()) ||
            variableMap.get("border/default") ||
            variableMap.get("borderdefault");
          if (borderVar) {
            try {
              const bound = figma.variables.setBoundVariableForPaint(strokePaint, "color", borderVar);
              frame.strokes = [bound];
            } catch (_) {
              frame.strokes = [strokePaint];
            }
          } else {
            frame.strokes = [strokePaint];
          }
          frame.strokeWeight = spec.borderWidth;
        }

        if (spec.children && spec.children.length > 0) {
          for (const childSpec of spec.children) {
            if (!childSpec) continue;
            try {
              const childNode = await buildNode(childSpec);
              if (childNode) {
                frame.appendChild(childNode);
                if ("layoutSizingHorizontal" in childNode) {
                  if (frame.layoutWrap === "WRAP") {
                    childNode.layoutSizingHorizontal = "FIXED";
                    if (childSpec.width && childSpec.height) {
                      try { childNode.resize(childSpec.width, childSpec.height); } catch (_) {}
                    }
                  } else if (childSpec.layoutWrap === "WRAP" || childSpec.flexGrow > 0 || (frame.layoutMode === "VERTICAL" && childSpec.width >= (spec.width || 1000) * 0.85)) {
                    childNode.layoutSizingHorizontal = "FILL";
                  } else if (childSpec.type === "FRAME" && (!childSpec.children || childSpec.children.length === 0)) {
                    childNode.layoutSizingHorizontal = "FIXED";
                  } else if (childSpec.width && (childSpec.name?.includes("aside") || childSpec.name?.includes("dot") || childSpec.type === "IMAGE_CANVAS")) {
                    childNode.layoutSizingHorizontal = "FIXED";
                  }
                }
                if ("layoutSizingVertical" in childNode) {
                  if (childSpec.name?.includes("aside") || childSpec.name?.includes("settings") || childSpec.name?.includes("presets")) {
                    childNode.layoutSizingVertical = "HUG";
                  } else if (childSpec.flexGrow > 0 && frame.layoutMode === "VERTICAL") {
                    childNode.layoutSizingVertical = "FILL";
                  } else if (frame.layoutMode === "HORIZONTAL" && childSpec.height >= (spec.height || 800) * 0.8) {
                    childNode.layoutSizingVertical = "FILL";
                  }
                }
              }
            } catch (err) {
              console.warn("Child node build skipped due to warning:", err);
            }
          }
        }

        if (isRoot) {
          frame.resize(Math.max(spec.width || 1440, 1440), Math.max(spec.height || 900, 900));
        }

        return frame;
      }

      const rootFrame = await buildNode(scene, true);
      if (!rootFrame || !rootFrame.id) {
        throw new Error("Failed to create root artboard node.");
      }

      // Safe viewport positioning with strict null guards
      let maxRight = 0;
      if (figma.currentPage && figma.currentPage.children) {
        for (const child of figma.currentPage.children) {
          if (child && child.id && child.id !== rootFrame.id) {
            const rightEdge = (child.x || 0) + (child.width || 0);
            if (rightEdge > maxRight) {
              maxRight = rightEdge;
            }
          }
        }
      }

      rootFrame.x = maxRight + 120;
      rootFrame.y = 100;

      try {
        figma.viewport.scrollAndZoomIntoView([rootFrame]);
      } catch (_) {}

      figma.notify(
        `✓ Reconstructed in Figma! (${createdNodesCount} nodes${unmappedWarningsCount > 0 ? `, ${unmappedWarningsCount} unmapped warnings` : ""})`
      );

      figma.ui.postMessage({
        type: "BUILD_COMPLETE",
        frameId: rootFrame.id,
        createdNodesCount,
        unmappedWarningsCount,
        title: rootFrame.name
      });
    } catch (err) {
      console.error("Reconstruction error:", err);
      figma.notify(`❌ Reconstruction failed: ${err.message}`, { error: true });
      figma.ui.postMessage({ type: "ERROR", message: err.message });
    }
  }
};
