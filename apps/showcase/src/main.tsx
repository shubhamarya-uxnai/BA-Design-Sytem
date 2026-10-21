import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, InputField, Icon, resolveButton, resolveInput, type MaterialIconSet } from "@ba-design-system/react";
import "@ba-design-system/react/styles.css";
import "./showcase.css";

const buttonTypes = ["Primary", "Default", "Ghost"] as const;
const inputStates = [
  { Active: true, Error: false, Typed: false, Typing: false, Hover: false },
  { Active: true, Error: false, Typed: true, Typing: true, Hover: false },
  { Active: true, Error: true, Typed: false, Typing: false, Hover: false },
  { Active: false, Error: false, Typed: false, Typing: false, Hover: false },
];
const iconOptions = ["download", "arrow_forward", "person", "calendar_month", "search", "close", "check", "add", "edit", "delete", "home", "settings", "visibility", "more_vert"];

function IconPicker({ label, value, setValue, iconSet }: { label: string; value: string; setValue: (value: string) => void; iconSet: MaterialIconSet }) {
  const [open, setOpen] = useState(false);
  return <div className="icon-picker"><span className="icon-picker-label">{label}</span><button type="button" className="icon-picker-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={value} side="leading" iconSet={iconSet} /><span>{value}</span><span aria-hidden="true">⌄</span></button>{open && <div className="icon-picker-menu" role="listbox" aria-label={label}>{iconOptions.map(icon => <button type="button" role="option" aria-selected={icon === value} className="icon-option" key={icon} onClick={() => { setValue(icon); setOpen(false); }}><Icon name={icon} side="leading" iconSet={iconSet} /><span>{icon}</span></button>)}</div>}</div>;
}
function Toggle({ label, value, setValue }: { label: string; value: boolean; setValue: (value: boolean) => void }) {
  return <label className="figma-control figma-toggle"><span>{label}</span><button type="button" role="switch" aria-checked={value} onClick={() => setValue(!value)}><span /></button></label>;
}
function SelectControl({ label, value, options, setValue }: { label: string; value: string; options: readonly string[]; setValue: (value: string) => void }) {
  return <label className="figma-control"><span>{label}</span><select value={value} onChange={e => setValue(e.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select></label>;
}
function TextControl({ label, value, setValue }: { label: string; value: string; setValue: (value: string) => void }) {
  return <label className="figma-control"><span>{label}</span><input value={value} onChange={e => setValue(e.target.value)} /></label>;
}

function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState<"button" | "input" | null>(null);
  const [button, setButton] = useState({ Type: "Primary" as string, Size: "Large", Hover: false, Enabled: true, Pressed: false, "Leading Icon": true, "Tailing Icon": true, iconSet: "symbols", "leading-icon": "download", "tailing-icon": "arrow_forward" });
  const [input, setInput] = useState({ Active: true, Error: false, Typed: false, Typing: false, Hover: false, Label: true, Button: false, "Leading Icon": true, "Tailing Icon": true, "Focus Ring": false, iconSet: "symbols", "leading-icon": "person", "tailing-icon": "calendar_month" });
  const buttonVariant = useMemo(() => resolveButton(button), [button]);
  const inputVariant = useMemo(() => resolveInput(input), [input]);

  return <div className="showcase">
    <header className="topbar">
      <a className="brand" href="#top"><span className="mark">ba</span><span>BA Design System</span></a>
      <nav><a href="#components">Components</a><a href="https://github.com/shubhamarya-uxnai/BA-Design-Sytem">GitHub ↗</a><button className="theme-toggle" onClick={() => { setDark(!dark); document.documentElement.dataset.theme = !dark ? "dark" : "light"; }} aria-label="Toggle theme">{dark ? "☼" : "☾"}</button></nav>
    </header>
    <main id="top">
      <section className="hero"><p className="eyebrow">A shared language for what’s next</p><h1>Small parts.<br /><em>Endless possibilities.</em></h1><p className="lede">Figma-sourced foundations and React components for every BA website and web app.</p><a className="hero-link" href="#components">Explore components ↓</a></section>
      <section id="components" className="collection"><div className="section-heading"><h2>The component collection</h2><span>Exact Figma contract · live states</span></div>
        <div className="cards">
          <article className="card"><div className="card-meta"><span>01</span><span>Button</span></div><div className="preview button-preview"><Button {...button as any} Button="Explore components" onClick={() => setActive("button")} /></div><div className="card-footer"><div><h3>Buttons</h3><p>3 types · 2 sizes · 24 variants</p></div><button onClick={() => setActive("button")}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>02</span><span>Input Field</span></div><div className="preview field-preview"><InputField label="Label" input="Placeholder" {...input as any} /></div><div className="card-footer"><div><h3>Input Field</h3><p>5 interaction axes · 8 variants</p></div><button onClick={() => setActive("input")}>Open playground ↗</button></div></article>
        </div>
      </section>
      <section className="contract"><p className="eyebrow">Single source of truth</p><h2>Every value starts in Figma.</h2><p>Tokens are generated from the BA Design System collections. Component props retain the original Figma names, values, defaults, and variant combinations.</p><div className="contract-grid"><div><strong>547</strong><span>tokens</span></div><div><strong>792</strong><span>aliases</span></div><div><strong>24 + 8</strong><span>Figma variants</span></div></div></section>
    </main>
    {active && <div className="modal-backdrop" onClick={() => setActive(null)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setActive(null)}>×</button><p className="eyebrow">Component playground</p><h2>{active === "button" ? "Button" : "Input Field"}</h2>{active === "button" ? <><div className="playground-preview"><Button {...button as any} Button="Button" /></div><div className="controls"><SelectControl label="Type" value={button.Type} options={buttonTypes} setValue={value => setButton({ ...button, Type: value })} /><Toggle label="Hover" value={button.Hover} setValue={value => setButton({ ...button, Hover: value })} /><Toggle label="Enabled" value={button.Enabled} setValue={value => setButton({ ...button, Enabled: value })} /><Toggle label="Pressed" value={button.Pressed} setValue={value => setButton({ ...button, Pressed: value })} /><SelectControl label="Size" value={button.Size} options={["Large", "Small"]} setValue={value => setButton({ ...button, Size: value })} /><TextControl label="Button" value="Button" setValue={() => undefined} /><Toggle label="Leading Icon" value={button["Leading Icon"]} setValue={value => setButton({ ...button, "Leading Icon": value })} /><IconPicker label="leading-icon" value={button["leading-icon"]} setValue={value => setButton({ ...button, "leading-icon": value })} iconSet={button.iconSet as MaterialIconSet} /><Toggle label="Tailing Icon" value={button["Tailing Icon"]} setValue={value => setButton({ ...button, "Tailing Icon": value })} /><IconPicker label="tailing-icon" value={button["tailing-icon"]} setValue={value => setButton({ ...button, "tailing-icon": value })} iconSet={button.iconSet as MaterialIconSet} /><SelectControl label="Icon set" value={button.iconSet} options={["symbols", "classic"]} setValue={value => setButton({ ...button, iconSet: value })} /></div><code>{buttonVariant?.name}</code></> : <><div className="playground-preview"><InputField label="Label" input="Placeholder" {...input as any} /></div><div className="controls"><TextControl label="label" value="Label" setValue={() => undefined} /><Toggle label="Label" value={input.Label} setValue={value => setInput({ ...input, Label: value })} /><IconPicker label="leading-icon" value={input["leading-icon"]} setValue={value => setInput({ ...input, "leading-icon": value })} iconSet={input.iconSet as MaterialIconSet} /><Toggle label="Leading Icon" value={input["Leading Icon"]} setValue={value => setInput({ ...input, "Leading Icon": value })} /><IconPicker label="tailing-icon" value={input["tailing-icon"]} setValue={value => setInput({ ...input, "tailing-icon": value })} iconSet={input.iconSet as MaterialIconSet} /><Toggle label="Tailing Icon" value={input["Tailing Icon"]} setValue={value => setInput({ ...input, "Tailing Icon": value })} /><TextControl label="input" value="Placeholder" setValue={() => undefined} /><Toggle label="Button" value={input.Button} setValue={value => setInput({ ...input, Button: value })} /><SelectControl label="Icon set" value={input.iconSet} options={["symbols", "classic"]} setValue={value => setInput({ ...input, iconSet: value })} /><Toggle label="Focus Ring" value={input["Focus Ring"]} setValue={value => setInput({ ...input, "Focus Ring": value })} /><Toggle label="Hover" value={input.Hover} setValue={value => setInput({ ...input, Hover: value })} /><Toggle label="Typing" value={input.Typing} setValue={value => setInput({ ...input, Typing: value })} /><Toggle label="Error" value={input.Error} setValue={value => setInput({ ...input, Error: value })} /><Toggle label="Typed" value={input.Typed} setValue={value => setInput({ ...input, Typed: value })} /><Toggle label="Active" value={input.Active} setValue={value => setInput({ ...input, Active: value })} /></div><code>{inputVariant?.name}</code><div className="variant-row">{inputStates.map((state, i) => <InputField key={i} label={`State ${i + 1}`} input="Placeholder" {...state} iconSet={input.iconSet as any} {...{"Leading Icon": input["Leading Icon"]}} {...{"Tailing Icon": input["Tailing Icon"]}} {...{"leading-icon": input["leading-icon"]}} {...{"tailing-icon": input["tailing-icon"]}} />)}</div></>}</aside></div>}
    <footer><span>BA Design System · Built from the Figma contract.</span><a href="https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System">Open source Figma ↗</a></footer>
  </div>;
}

createRoot(document.getElementById("root")!).render(<App />);
