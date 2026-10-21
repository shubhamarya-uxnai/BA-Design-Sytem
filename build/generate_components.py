#!/usr/bin/env python3
"""Generate the first local component layer from the Figma token snapshot.

The input specs are compact exports of the current Figma Buttons, Icon Button,
and Text Styles objects. This keeps the component output reproducible while
leaving the source-of-truth relationships in the token JSON untouched.
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source"
SPECS = SOURCE / "specs"
DIST = ROOT / "dist"


def slug(value: Any) -> str:
    text = str(value).strip().lower().replace("&", " and ")
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "value"


def css_var(collection: str, name: str) -> str:
    return "--va-{}-{}".format(slug(collection), "-".join(slug(part) for part in name.split("/")))


tokens = json.loads((DIST / "tokens.json").read_text())
token_by_id = {token["id"]: token["cssVariable"] for token in tokens["tokens"]}
token_by_name = {(token["collection"], token["name"]): token["cssVariable"] for token in tokens["tokens"]}


def ref(value: Any) -> str | None:
    """Turn a Figma variable alias or alias list into a CSS var reference."""
    if isinstance(value, list):
        return ref(value[0]) if value else None
    if isinstance(value, dict) and value.get("type") == "VARIABLE_ALIAS":
        variable = token_by_id.get(value.get("id"))
        return f"var({variable})" if variable else f"var(--va-unresolved-{slug(value.get('id'))})"
    return None


def binding(node: dict[str, Any], key: str) -> str | None:
    return ref(node.get("boundVariables", {}).get(key))


def named_ref(collection: str, name: str) -> str:
    variable = token_by_name.get((collection, name), css_var(collection, name))
    return f"var({variable})"


def first_child(node: dict[str, Any], node_type: str | None = None, name: str | None = None) -> dict[str, Any] | None:
    for child in node.get("children", []):
        if node_type and child.get("type") != node_type:
            continue
        if name and child.get("name") != name:
            continue
        return child
    return None


def alias_from_children(node: dict[str, Any], key: str) -> str | None:
    return binding(node, key)


def line_height(value: dict[str, Any] | None) -> str:
    if not value:
        return "normal"
    unit = value.get("unit")
    number = value.get("value")
    if unit == "PERCENT" and isinstance(number, (int, float)):
        return f"{number / 100:.4g}"
    if unit == "PIXELS" and isinstance(number, (int, float)):
        return f"{number:g}px"
    return "normal"


def letter_spacing(value: dict[str, Any] | None) -> str:
    if not value:
        return "normal"
    number = value.get("value")
    if not isinstance(number, (int, float)) or number == 0:
        return "normal"
    if value.get("unit") == "PERCENT":
        return f"{number:g}%"
    return f"{number:g}px"


WEIGHTS = {
    "Thin": 100,
    "ExtraLight": 200,
    "Light": 300,
    "Regular": 400,
    "Medium": 500,
    "SemiBold": 600,
    "Bold": 700,
    "ExtraBold": 800,
    "Black": 900,
}


def weight_info(font_name: dict[str, Any] | None) -> tuple[str, int, str]:
    style = (font_name or {}).get("style", "Regular")
    italic = style == "Italic" or "Italic" in style
    weight_name = "Regular" if italic else style
    if weight_name not in WEIGHTS:
        weight_name = "Regular"
    font_style = "italic" if italic else "normal"
    return weight_name, WEIGHTS[weight_name], font_style


def declarations(items: list[tuple[str, str | None]], indent: str = "  ") -> list[str]:
    return [f"{indent}{key}: {value};" for key, value in items if value is not None]


def selector(component: str, props: dict[str, str], include_inverse: bool = False) -> str:
    result = [f".{component}"]
    for key in ("Size", "Type", "Hover", "Enabled", "Pressed"):
        if key in props:
            result.append(f'[data-{slug(key)}="{slug(props[key])}"]')
    if include_inverse and "Inverse" in props:
        result.append(f'[data-inverse="{slug(props["Inverse"])}"]')
    return "".join(result)


def base_rules(spec: dict[str, Any], component: str, icon_only: bool) -> tuple[list[str], dict[str, Any]]:
    rules: list[str] = []
    bases: dict[str, Any] = {}
    for size in ("Large", "Small"):
        variant = next(
            item for item in spec["variants"]
            if item["propValues"].get("Size") == size
            and item["propValues"].get("Type") == "Primary"
            and item["propValues"].get("Hover") == "False"
            and item["propValues"].get("Enabled") == "True"
            and item["propValues"].get("Pressed") == "False"
        )
        bases[size] = variant
        root = variant["root"]
        child_container = {"children": variant.get("children", [])}
        icon = first_child(child_container, node_type="INSTANCE")
        text = first_child(child_container, node_type="TEXT")
        radius = binding(root, "topLeftRadius")
        stroke = binding(root, "strokeTopWeight")
        items = [
            ("display", "inline-flex"),
            ("position", "relative"),
            ("box-sizing", "border-box"),
            ("align-items", "center"),
            ("justify-content", "center"),
            ("gap", binding(root, "itemSpacing")),
            ("padding", " ".join(filter(None, [binding(root, "paddingTop"), binding(root, "paddingRight"), binding(root, "paddingBottom"), binding(root, "paddingLeft")]))),
            ("border-style", "solid"),
            ("border-width", stroke or "0"),
            ("border-radius", radius or "0"),
            ("cursor", "pointer"),
            ("font-family", binding(text, "fontFamily") if text else None),
            ("font-size", binding(text, "fontSize") if text else None),
            ("line-height", line_height(text.get("text", {}).get("lineHeight")) if text else None),
            ("letter-spacing", letter_spacing(text.get("text", {}).get("letterSpacing")) if text else None),
        ]
        if text:
            weight_name, weight_number, font_style = weight_info(text.get("text", {}).get("fontName"))
            items.extend([
                ("font-weight", str(weight_number)),
                ("font-style", font_style),
            ])
            bases[size]["fontWeightToken"] = named_ref("Typography", f"Font Weights/{weight_name}/Regular")
        rules.append(f'.{component}[data-size="{slug(size)}"] {{\n' + "\n".join(declarations(items)) + "\n}")
        if icon:
            icon_size = binding(icon, "width") or binding(icon, "height") or "1em"
            rules.append(f'.{component}[data-size="{slug(size)}"] > .{component}__icon {{\n' + "\n".join(declarations([
                ("width", icon_size),
                ("height", binding(icon, "height") or icon_size),
                ("flex", "0 0 auto"),
                ("display", "inline-block"),
            ])) + "\n}")
        if text:
            rules.append(f'.{component}[data-size="{slug(size)}"] > .{component}__label {{\n' + "\n".join(declarations([
                ("display", "inline-block"),
            ])) + "\n}")
    return rules, bases


def state_rules(spec: dict[str, Any], component: str, icon_only: bool, icon_bindings: dict[str, Any]) -> list[str]:
    rules: list[str] = []
    for variant in spec["variants"]:
        props = variant["propValues"]
        root = variant["root"]
        child_container = {"children": variant.get("children", [])}
        text = first_child(child_container, node_type="TEXT")
        icon_color = icon_bindings.get(variant["id"])
        color = binding(text, "fills") if text else ref(icon_color)
        background = binding(root, "fills")
        stroke_color = binding(root, "strokes")
        stroke_width = binding(root, "strokeTopWeight")
        items = [
            ("background-color", background or "transparent"),
            ("border-color", stroke_color or "transparent"),
            ("border-width", stroke_width or "0"),
            ("color", color or "inherit"),
        ]
        current_selector = selector(component, props)
        rules.append(current_selector + " {\n" + "\n".join(declarations(items)) + "\n}")
        overlay = next((child for child in variant.get("children", []) if "Overlay" in child.get("name", "")), None)
        if overlay:
            overlay_color = binding(overlay, "fills")
            overlay_rule = current_selector + "::after {\n" + "\n".join(declarations([
                ("content", '""'),
                ("position", "absolute"),
                ("inset", "0"),
                ("border-radius", "inherit"),
                ("background-color", overlay_color or "transparent"),
                ("pointer-events", "none"),
            ])) + "\n}"
            rules.append(overlay_rule)
            rules.append(current_selector + " > * { position: relative; z-index: 1; }")
        focus = next((child for child in variant.get("children", []) if child.get("name") == "Focus Ring"), None)
        if focus and not focus.get("visible", True):
            focus_color = binding(focus, "strokes")
            focus_width = binding(focus, "strokeTopWeight") or "1px"
            focus_radius = binding(focus, "topLeftRadius") or "inherit"
            rules.append(f'{current_selector}:focus-visible, {current_selector}[data-preview="focus"] {{\n' + "\n".join(declarations([
                ("outline", f"{focus_width} solid {focus_color or 'currentColor'}"),
                ("outline-offset", "3px"),
                ("border-radius", focus_radius),
            ])) + "\n}")
    rules.append(f".{component}[data-enabled=\"false\"], .{component}[aria-disabled=\"true\"], .{component}:disabled {{ cursor: not-allowed; }}")
    return rules


def generate_buttons() -> tuple[str, dict[str, Any]]:
    button_spec = json.loads((SPECS / "buttons.json").read_text())
    icon_spec = json.loads((SPECS / "icon-buttons.json").read_text())
    icon_map = json.loads((SPECS / "icon-vector-bindings.json").read_text())
    button_icon_bindings = {item["variantId"]: item["iconColor"] for item in icon_map["buttons"]}
    icon_button_bindings = {item["variantId"]: item["iconColor"] for item in icon_map["iconButtons"]}

    lines = [
        "/* Generated from source/specs/buttons.json and icon-buttons.json. */",
        "/* Rebuild with: npm run components */",
        ".va-button, .va-icon-button { isolation: isolate; }",
        ".va-button > *, .va-icon-button > * { min-width: 0; }",
    ]
    button_base, button_bases = base_rules(button_spec, "va-button", False)
    icon_base, icon_bases = base_rules(icon_spec, "va-icon-button", True)
    lines.extend(button_base)
    lines.extend(icon_base)
    lines.extend(state_rules(button_spec, "va-button", False, button_icon_bindings))
    lines.extend(state_rules(icon_spec, "va-icon-button", True, icon_button_bindings))
    lines.extend([
        ".va-button__icon, .va-icon-button__icon { color: currentColor; }",
        ".va-button[data-hover=\"true\"]:hover::after, .va-icon-button[data-hover=\"true\"]:hover::after { opacity: 1; }",
    ])
    metadata = {
        "buttons": button_spec["source"],
        "iconButtons": icon_spec["source"],
        "variantCounts": {"buttons": len(button_spec["variants"]), "iconButtons": len(icon_spec["variants"])},
        "fontWeightAdapter": "Figma exposes font-weight variables as string labels for italic support; generated CSS uses the equivalent numeric CSS weight and preserves the source token in each size spec.",
    }
    for size, variant in button_bases.items():
        metadata.setdefault("buttonSizes", {})[size] = {"fontWeightToken": variant.get("fontWeightToken")}
    return "\n\n".join(lines) + "\n", metadata


def generate_text_styles() -> tuple[str, list[dict[str, Any]]]:
    spec = json.loads((SPECS / "text-styles.json").read_text())
    lines = [
        "/* Generated from source/specs/text-styles.json and Typography variables. */",
        "/* Rebuild with: npm run components */",
    ]
    records: list[dict[str, Any]] = []
    for style in spec["styles"]:
        parts = style["name"].split("/")
        group = parts[0]
        class_name = ".va-text-" + "-".join(slug(part) for part in parts)
        size = style["fontSize"]
        size_name = str(int(size)) if float(size).is_integer() else str(size)
        family_group = "Title" if group in {"Title", "Heading"} else "Body"
        family_token = named_ref("Typography", f"Font Family/{family_group}")
        weight_name, weight_number, font_style = weight_info(style.get("fontName"))
        weight_token = named_ref("Typography", f"Font Weights/{weight_name}/Regular")
        items = [
            ("font-family", family_token),
            ("font-size", named_ref("Typography", f"Font Sizes/{size_name}")),
            ("font-weight", str(weight_number)),
            ("font-style", font_style),
            ("line-height", line_height(style.get("lineHeight"))),
            ("letter-spacing", letter_spacing(style.get("letterSpacing"))),
        ]
        text_case = style.get("textCase")
        if text_case == "UPPER":
            items.append(("text-transform", "uppercase"))
        elif text_case == "LOWER":
            items.append(("text-transform", "lowercase"))
        elif text_case == "TITLE":
            items.append(("text-transform", "capitalize"))
        if style.get("textDecoration") == "UNDERLINE":
            items.append(("text-decoration", "underline"))
        lines.append(class_name + " {\n" + "\n".join(declarations(items)) + "\n}")
        records.append({
            "name": style["name"],
            "className": class_name[1:],
            "sourceStyleId": style["id"],
            "fontFamilyToken": family_token,
            "fontSizeToken": named_ref("Typography", f"Font Sizes/{size_name}"),
            "fontWeightToken": weight_token,
            "fontWeightCss": weight_number,
            "fontStyle": font_style,
        })
    return "\n\n".join(lines) + "\n", records


def find_descendant(node: dict[str, Any], *, name: str | None = None, node_type: str | None = None) -> dict[str, Any] | None:
    for child in node.get("children", []):
        if (name is None or child.get("name") == name) and (node_type is None or child.get("type") == node_type):
            return child
        found = find_descendant(child, name=name, node_type=node_type)
        if found:
            return found
    return None


def direct_child(node: dict[str, Any], *, name: str | None = None, node_type: str | None = None) -> dict[str, Any] | None:
    for child in node.get("children", []):
        if (name is None or child.get("name") == name) and (node_type is None or child.get("type") == node_type):
            return child
    return None


def vector_fill(node: dict[str, Any] | None) -> str | None:
    if not node:
        return None
    if node.get("type") == "VECTOR":
        color = binding(node, "fills")
        if color:
            return color
    for child in node.get("children", []):
        color = vector_fill(child)
        if color:
            return color
    return None


def input_selector(props: dict[str, str]) -> str:
    result = [".va-input-field"]
    for key in ("Hover", "Typing", "Error", "Typed", "Active"):
        if key in props:
            result.append(f'[data-{slug(key)}="{slug(props[key])}"]')
    return "".join(result)


def input_parts(variant: dict[str, Any]) -> dict[str, Any]:
    root = variant["root"]
    label = direct_child(root, name="Label", node_type="TEXT")
    shell = next((child for child in root.get("children", []) if child is not label), None)
    if not shell:
        raise ValueError(f"Input Field variant has no shell: {variant['name']}")
    control = next((child for child in shell.get("children", []) if child.get("name") in {"Input", "Container"}), None)
    if not control:
        control = next((child for child in shell.get("children", []) if child.get("type") == "FRAME" and child.get("name") != "Button"), shell)
    button_slot = direct_child(shell, name="Button")
    overlay = next((child for child in shell.get("children", []) if "Overlay" in child.get("name", "")), None)
    focus = direct_child(shell, name="Focus Ring")
    placeholder = direct_child(control, name="Placeholder", node_type="TEXT") or direct_child(control, name="Input", node_type="TEXT")
    instances = [child for child in control.get("children", []) if child.get("type") == "INSTANCE"]
    leading = instances[0] if instances else None
    trailing = instances[-1] if len(instances) > 1 else None
    return {
        "root": root,
        "label": label,
        "shell": shell,
        "control": control,
        "buttonSlot": button_slot,
        "overlay": overlay,
        "focus": focus,
        "placeholder": placeholder,
        "leading": leading,
        "trailing": trailing,
    }


def generate_input_fields() -> tuple[str, dict[str, Any], str]:
    spec = json.loads((SPECS / "input-fields.json").read_text())
    parts = {variant["id"]: input_parts(variant) for variant in spec["variants"]}
    baseline = next(variant for variant in spec["variants"] if variant["propValues"].get("Hover") == "False" and variant["propValues"].get("Typing") == "False" and variant["propValues"].get("Error") == "False" and variant["propValues"].get("Typed") == "False" and variant["propValues"].get("Active") == "True")
    base = parts[baseline["id"]]
    label = base["label"]
    control = base["control"]
    shell = base["shell"]
    placeholder = base["placeholder"]
    leading = base["leading"]
    trailing = base["trailing"]
    button_slot = base["buttonSlot"]

    lines = [
        "/* Generated from source/specs/input-fields.json. */",
        "/* Rebuild with: npm run components */",
        ".va-input-field {",
        "  position: relative;",
        "  display: flex;",
        "  flex-direction: column;",
        f"  gap: {binding(base['root'], 'itemSpacing') or '0'};",
        "  width: 100%;",
        "}",
        ".va-input-field__label {",
        f"  font-family: {binding(label, 'fontFamily') or named_ref('Typography', 'Font Family/Body')};",
        f"  font-size: {binding(label, 'fontSize') or named_ref('Typography', 'Font Sizes/12')};",
        "  font-weight: 400;",
        f"  line-height: {line_height(label.get('text', {}).get('lineHeight'))};",
        "}",
        ".va-input-field__shell {",
        "  position: relative;",
        "  display: flex;",
        "  align-items: stretch;",
        "  width: 100%;",
        f"  min-height: {shell.get('height', 42):g}px;",
        f"  border-radius: {binding(shell, 'topLeftRadius') or '0'};",
        f"  border: {binding(shell, 'strokeTopWeight') or '0'} solid {binding(shell, 'strokes') or 'transparent'};",
        f"  background: {binding(shell, 'fills') or 'transparent'};",
        "  box-sizing: border-box;",
        "}",
        ".va-input-field__control {",
        "  position: relative;",
        "  display: flex;",
        "  align-items: center;",
        "  flex: 1 1 auto;",
        "  min-width: 0;",
        "  z-index: 1;",
        f"  gap: {binding(control, 'itemSpacing') or '0'};",
        f"  padding: {binding(control, 'paddingTop') or '0'} {binding(control, 'paddingRight') or '0'} {binding(control, 'paddingBottom') or '0'} {binding(control, 'paddingLeft') or '0'};",
        "  box-sizing: border-box;",
        "}",
        ".va-input-field__input {",
        "  min-width: 0;",
        "  flex: 1 1 auto;",
        "  width: 100%;",
        "  border: 0;",
        "  outline: 0;",
        "  padding: 0;",
        "  margin: 0;",
        "  background: transparent;",
        f"  font-family: {binding(placeholder, 'fontFamily') or named_ref('Typography', 'Font Family/Body')};",
        f"  font-size: {binding(placeholder, 'fontSize') or named_ref('Typography', 'Font Sizes/16')};",
        f"  line-height: {line_height(placeholder.get('text', {}).get('lineHeight'))};",
        "  color: inherit;",
        "}",
        ".va-input-field__input::placeholder { opacity: 1; }",
        ".va-input-field__icon-slot {",
        "  display: inline-flex;",
        "  align-items: center;",
        "  justify-content: center;",
        "  flex: 0 0 auto;",
        f"  width: {binding(leading, 'width') if leading else '1em'};",
        f"  height: {binding(leading, 'height') if leading else '1em'};",
        "  color: inherit;",
        "}",
        ".va-input-field__icon-slot .material-symbols-rounded, .va-input-field__icon-slot .material-symbols-outlined, .va-input-field__icon-slot .material-icons {",
        "  font-size: 1em;",
        "  line-height: 1;",
        "  font-weight: normal;",
        "  font-style: normal;",
        "  letter-spacing: normal;",
        "  text-transform: none;",
        "  white-space: nowrap;",
        "  word-wrap: normal;",
        "  direction: ltr;",
        "  -webkit-font-feature-settings: 'liga';",
        "  -webkit-font-smoothing: antialiased;",
        "}",
        ".va-input-field__button-slot {",
        "  display: none;",
        "  align-items: center;",
        "  flex: 0 0 auto;",
        "  position: relative;",
        "  z-index: 1;",
        f"  gap: {binding(button_slot, 'itemSpacing') if button_slot else named_ref('Space', '1')};",
        f"  padding-right: {binding(button_slot, 'paddingRight') if button_slot else named_ref('Space', '1')};",
        "}",
        ".va-input-field[data-button=\"true\"] .va-input-field__button-slot, .va-input-field[data-has-button=\"true\"] .va-input-field__button-slot { display: inline-flex; }",
        ".va-input-field__button-slot > * { flex: 0 0 auto; }",
        ".va-input-field__message {",
        "  display: none;",
        "  margin: 0;",
        f"  font-family: {named_ref('Typography', 'Font Family/Body')};",
        f"  font-size: {named_ref('Typography', 'Font Sizes/12')};",
        "  line-height: 1.4;",
        f"  color: {named_ref('Semantic Color Tokens', 'status/error/text')};",
        "}",
        ".va-input-field[data-message=\"true\"] .va-input-field__message, .va-input-field[data-error=\"true\"] .va-input-field__message { display: block; }",
        ".va-input-field[data-leading-icon=\"false\"] .va-input-field__slot--leading, .va-input-field[data-trailing-icon=\"false\"] .va-input-field__slot--trailing { display: none; }",
    ]

    metadata_variants: list[dict[str, Any]] = []
    for variant in spec["variants"]:
        current = parts[variant["id"]]
        props = variant["propValues"]
        current_selector = input_selector(props)
        current_shell = current["shell"]
        current_control = current["control"]
        current_placeholder = current["placeholder"]
        state_items = [
            ("background", binding(current_shell, "fills") or "transparent"),
            ("border-color", binding(current_shell, "strokes") or "transparent"),
            ("border-width", binding(current_shell, "strokeTopWeight") or "0"),
        ]
        lines.append(current_selector + " .va-input-field__shell {\n" + "\n".join(declarations(state_items)) + "\n}")
        label_color = binding(current["label"], "fills")
        placeholder_color = binding(current_placeholder, "fills") if current_placeholder else None
        icon_color = vector_fill(current["leading"]) or vector_fill(current["trailing"])
        lines.append(current_selector + " .va-input-field__label {\n" + "\n".join(declarations([("color", label_color or "inherit")])) + "\n}")
        lines.append(current_selector + " .va-input-field__input {\n" + "\n".join(declarations([("color", placeholder_color or "inherit")])) + "\n}")
        lines.append(current_selector + " .va-input-field__input::placeholder {\n" + "\n".join(declarations([("color", placeholder_color or "inherit")])) + "\n}")
        lines.append(current_selector + " .va-input-field__icon-slot {\n" + "\n".join(declarations([("color", icon_color or "inherit")])) + "\n}")
        if current["overlay"]:
            overlay_color = binding(current["overlay"], "fills")
            lines.append(current_selector + " .va-input-field__shell::after {\n" + "\n".join(declarations([
                ("content", '""'),
                ("position", "absolute"),
                ("inset", "0"),
                ("border-radius", "inherit"),
                ("background", overlay_color or "transparent"),
                ("pointer-events", "none"),
            ])) + "\n}")
        if current["focus"] and not current["focus"].get("visible", True):
            lines.append(current_selector + " .va-input-field__shell:focus-within, " + current_selector + " .va-input-field__input:focus-visible {\n" + "\n".join(declarations([
                ("outline", f"{binding(current['focus'], 'strokeTopWeight') or '1px'} solid {binding(current['focus'], 'strokes') or 'currentColor'}"),
                ("outline-offset", "3px"),
            ])) + "\n}")
        metadata_variants.append({
            "name": variant["name"],
            "props": props,
            "selector": current_selector,
            "hasButtonSlot": bool(current["buttonSlot"]),
            "leadingIconToken": icon_color,
            "placeholderToken": placeholder_color,
            "shellFillToken": binding(current_shell, "fills"),
            "shellStrokeToken": binding(current_shell, "strokes"),
        })

    metadata = {
        "source": spec["source"],
        "variantCount": len(spec["variants"]),
        "variantProperties": spec["source"]["propertyDefinitions"],
        "variants": metadata_variants,
        "materialIconPolicy": "Use Google Material Symbols/Material Icons in the leading and trailing slots; embedded Figma icon instances are not imported.",
        "buttonSlotPolicy": "The internal Button slot remains a real insertion point. Use a va-button, va-icon-button, native button, or dropdown control inside va-input-field__button-slot.",
    }
    example = """<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
    <link rel=\"stylesheet\" href=\"./index.css\" />
    <link href=\"https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..1\" rel=\"stylesheet\" />
  </head>
  <body>
    <div class=\"va-input-field\" data-button=\"true\" data-leading-icon=\"true\" data-trailing-icon=\"true\" data-hover=\"false\" data-typing=\"false\" data-error=\"false\" data-typed=\"false\" data-active=\"true\">
      <label class=\"va-input-field__label\" for=\"example-input\">Label</label>
      <div class=\"va-input-field__shell\">
        <div class=\"va-input-field__control\">
          <span class=\"va-input-field__icon-slot va-input-field__slot--leading\" aria-hidden=\"true\"><span class=\"material-symbols-rounded\">search</span></span>
          <input class=\"va-input-field__input\" id=\"example-input\" placeholder=\"Placeholder\" />
          <span class=\"va-input-field__icon-slot va-input-field__slot--trailing\" aria-hidden=\"true\"><span class=\"material-symbols-rounded\">calendar_month</span></span>
        </div>
        <span class=\"va-input-field__button-slot\">
          <button class=\"va-icon-button\" type=\"button\" aria-label=\"Open options\" data-size=\"small\" data-type=\"default\" data-hover=\"false\" data-enabled=\"true\" data-pressed=\"false\"><span class=\"material-symbols-rounded\" aria-hidden=\"true\">expand_more</span></button>
        </span>
      </div>
      <p class=\"va-input-field__message\">Error message</p>
    </div>
  </body>
</html>
"""
    return "\n".join(lines) + "\n", metadata, example


buttons_css, button_metadata = generate_buttons()
text_css, text_metadata = generate_text_styles()
input_css, input_metadata, input_example = generate_input_fields()
(DIST / "components.css").write_text(buttons_css)
(DIST / "text-styles.css").write_text(text_css)
(DIST / "input-fields.css").write_text(input_css)
(DIST / "components.json").write_text(json.dumps({"buttons": button_metadata, "textStyles": text_metadata, "inputFields": input_metadata}, indent=2) + "\n")
(DIST / "index.css").write_text("@import url(\"./tokens.css\");\n@import url(\"./text-styles.css\");\n@import url(\"./components.css\");\n@import url(\"./input-fields.css\");\n")
print(f"Generated buttons, icon buttons, {len(text_metadata)} text styles, and {input_metadata['variantCount']} input-field variants.")
