import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, InputField, resolveButton, resolveInput } from "@ba-design-system/react";
import "@ba-design-system/react/styles.css";
import "./showcase.css";

const buttonTypes = ["Primary", "Default", "Ghost"] as const;
const inputStates = [
  { Active: true, Error: false, Typed: false, Typing: false, Hover: false },
  { Active: true, Error: false, Typed: true, Typing: true, Hover: false },
  { Active: true, Error: true, Typed: false, Typing: false, Hover: false },
  { Active: false, Error: false, Typed: false, Typing: false, Hover: false },
];

function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState<"button" | "input" | null>(null);
  const [button, setButton] = useState({ Type: "Primary" as string, Size: "Large", Hover: false, Enabled: true, Pressed: false });
  const [input, setInput] = useState({ Active: true, Error: false, Typed: false, Typing: false, Hover: false });
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
          <article className="card"><div className="card-meta"><span>01</span><span>Button</span></div><div className="preview button-preview"><Button Type={button.Type as any} Size={button.Size as any} Enabled={button.Enabled} Hover={button.Hover} Pressed={button.Pressed} Button="Explore components" onClick={() => setActive("button")} /></div><div className="card-footer"><div><h3>Buttons</h3><p>3 types · 2 sizes · 24 variants</p></div><button onClick={() => setActive("button")}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>02</span><span>Input Field</span></div><div className="preview field-preview"><InputField label="Label" input="Placeholder" Active={input.Active} Error={input.Error} Typed={input.Typed} Typing={input.Typing} Hover={input.Hover} /></div><div className="card-footer"><div><h3>Input Field</h3><p>5 interaction axes · 8 variants</p></div><button onClick={() => setActive("input")}>Open playground ↗</button></div></article>
        </div>
      </section>
      <section className="contract"><p className="eyebrow">Single source of truth</p><h2>Every value starts in Figma.</h2><p>Tokens are generated from the BA Design System collections. Component props retain the original Figma names, values, defaults, and variant combinations.</p><div className="contract-grid"><div><strong>547</strong><span>tokens</span></div><div><strong>792</strong><span>aliases</span></div><div><strong>24 + 8</strong><span>Figma variants</span></div></div></section>
    </main>
    {active && <div className="modal-backdrop" onClick={() => setActive(null)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setActive(null)}>×</button><p className="eyebrow">Component playground</p><h2>{active === "button" ? "Button" : "Input Field"}</h2>{active === "button" ? <><div className="playground-preview"><Button {...button as any} Button="Button" /></div><div className="controls"><label>Type<select value={button.Type} onChange={e => setButton({ ...button, Type: e.target.value })}>{buttonTypes.map(v => <option key={v}>{v}</option>)}</select></label><label>Size<select value={button.Size} onChange={e => setButton({ ...button, Size: e.target.value })}><option>Large</option><option>Small</option></select></label><label><input type="checkbox" checked={button.Hover} onChange={e => setButton({ ...button, Hover: e.target.checked })} /> Hover</label><label><input type="checkbox" checked={button.Pressed} onChange={e => setButton({ ...button, Pressed: e.target.checked })} /> Pressed</label><label><input type="checkbox" checked={button.Enabled} onChange={e => setButton({ ...button, Enabled: e.target.checked })} /> Enabled</label></div><code>{buttonVariant?.name}</code></> : <><div className="playground-preview"><InputField label="Label" input="Placeholder" {...input} /></div><div className="controls">{Object.keys(input).map(key => <label key={key}><input type="checkbox" checked={(input as any)[key]} onChange={e => setInput({ ...input, [key]: e.target.checked })} /> {key}</label>)}</div><code>{inputVariant?.name}</code><div className="variant-row">{inputStates.map((state, i) => <InputField key={i} label={`State ${i + 1}`} input="Placeholder" {...state} />)}</div></>}</aside></div>}
    <footer><span>BA Design System · Built from the Figma contract.</span><a href="https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System">Open source Figma ↗</a></footer>
  </div>;
}

createRoot(document.getElementById("root")!).render(<App />);
