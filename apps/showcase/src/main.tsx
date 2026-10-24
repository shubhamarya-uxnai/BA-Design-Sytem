import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  IconButton,
  Chip,
  Selection,
  InputField,
  Icon,
  ProgressBar,
  ProgressPie,
  ProgressDonut,
  Loader,
  Loaders,
  SegmentedChild,
  StepperChild,
  SegmentedProgress,
  Stepper,
  resolveButton,
  resolveIconButton,
  resolveInput,
  type MaterialIconSet,
  type ProgressType,
  type StepStatusType,
  type LoaderType
} from "@ba-design-system/react";
import "@ba-design-system/react/styles.css";
import "./showcase.css";

const buttonTypes = ["Primary", "Default", "Ghost"] as const;
const progressTypes: readonly ProgressType[] = ["Not Started", "In Progress", "Error", "Warning", "Success"] as const;
const stepStatusTypes: readonly StepStatusType[] = ["Default", "In Progress", "Completed", "Error", "Warning"] as const;
const loaderTypes: readonly LoaderType[] = ["Circular", "Bar", "Skeleton"] as const;

const iconOptions = ["download", "arrow_forward", "person", "calendar_month", "search", "close", "check", "add", "edit", "delete", "home", "settings", "visibility", "more_vert"];

function IconPicker({ label, value, setValue, iconSet }: { label: string; value: string; setValue: (value: string) => void; iconSet: MaterialIconSet }) {
  const [open, setOpen] = useState(false);
  return <div className="icon-picker"><span className="icon-picker-label">{label}</span><button type="button" className="icon-picker-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={value} side="leading" iconSet={iconSet} /><span>{value}</span><span aria-hidden="true">⌄</span></button>{open && <div className="icon-picker-menu" role="listbox" aria-label={label}>{iconOptions.map(icon => <button type="button" role="option" aria-selected={icon === value} className="icon-option" key={icon} onClick={() => { setValue(icon); setOpen(false); }}><Icon name={icon} side="leading" iconSet={iconSet} /><span>{icon}</span></button>)}</div>}</div>;
}
function Toggle({ label, value, setValue }: { label: string; value: boolean; setValue: (value: boolean) => void }) {
  return <div className="figma-control"><span>{label}</span><Selection Type="Toggle" Checked={value} label={label} showLabel={false} onCheckedChange={setValue} /></div>;
}
function SelectControl({ label, value, options, setValue }: { label: string; value: string; options: readonly string[]; setValue: (value: string) => void }) {
  return <div className="figma-control"><span>{label}</span><div className="select-control"><Button Type="Ghost" Button={value} interactive={false} tabIndex={-1} aria-hidden="true" {...{"Leading Icon":false,"Tailing Icon":true,"tailing-icon":"keyboard_arrow_down"}} /><select aria-label={label} value={value} onChange={e => setValue(e.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select></div></div>;
}
function TextControl({ label, value, setValue }: { label: string; value: string; setValue: (value: string) => void }) {
  return <label className="figma-control"><span>{label}</span><input value={value} onChange={e => setValue(e.target.value)} /></label>;
}
function NumberControl({ label, value, min = 0, max = 100, setValue }: { label: string; value: number; min?: number; max?: number; setValue: (value: number) => void }) {
  return <div className="figma-control"><span>{label} ({value}%)</span><input type="range" min={min} max={max} value={value} onChange={e => setValue(Number(e.target.value))} style={{ width: 165 }} /></div>;
}

import codeConnectManifest from "./code-connect-data.json";

function CodeSection({ component, usage }: { component: string; usage: string }) {
  const copy = async (value: string) => { await navigator.clipboard?.writeText(value); };
  return <section className="code-section"><h3>Component code <button type="button" onClick={() => copy(component)}>Copy</button></h3><pre>{component}</pre><h3>Direct usage <button type="button" onClick={() => copy(usage)}>Copy</button></h3><pre>{usage}</pre></section>;
}

function CodeConnectInfo({ componentName }: { componentName: string }) {
  const item = codeConnectManifest.components.find((c: any) => c.name === componentName);
  if (!item) return null;
  return (
    <div className="code-connect-block">
      <div className="code-connect-header">
        <span className="code-connect-badge-pill">⚡ Figma Code Connect</span>
        <span style={{ fontSize: "11px", opacity: 0.8 }}>Node {item.figma.nodeId}</span>
      </div>
      <div className="code-connect-links">
        <a href={item.github.sourceUrl} target="_blank" rel="noreferrer" className="code-connect-link">
          <span>GitHub Source</span> ↗
        </a>
        <a href={item.figma.url} target="_blank" rel="noreferrer" className="code-connect-link">
          <span>Figma Component</span> ↗
        </a>
        <a href={item.github.codeConnectUrl} target="_blank" rel="noreferrer" className="code-connect-link">
          <span>.figma.ts Code Connect</span> ↗
        </a>
      </div>
      <div className="code-connect-local">
        Local: <code>{item.local.component}</code> (<code>{item.local.exportName}</code>)
      </div>
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState<"button" | "input" | null>(null);
  const [iconOpen, setIconOpen] = useState(false);
  const [chipOpen, setChipOpen] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);

  // New progress & stepper playground states
  const [progressBarOpen, setProgressBarOpen] = useState(false);
  const [progressPieOpen, setProgressPieOpen] = useState(false);
  const [progressDonutOpen, setProgressDonutOpen] = useState(false);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [segmentedOpen, setSegmentedOpen] = useState(false);
  const [stepperOpen, setStepperOpen] = useState(false);

  // State values
  const [iconButton, setIconButton] = useState({ Type: "Primary" as string, Size: "Large", Hover: false, Enabled: true, Pressed: false, Icon: true, Focus: false, icon: "brightness_medium", iconSet: "symbols", actionName: "Toggle brightness" });
  const [chip, setChip] = useState({ Type: "Primary" as "Primary" | "Success" | "Error", Style: "Filled" as "Filled" | "Ghost", Icon: true, chip: "Chip", icon: undefined as string | undefined, iconSet: "symbols" });
  const [selection, setSelection] = useState({ Type: "Checkbox" as "Checkbox" | "Radio" | "Toggle", Checked: false, Active: true, Hover: false, Focus: false, label: "Label" });
  const [button, setButton] = useState({ Type: "Primary" as string, Size: "Large", Hover: false, Enabled: true, Pressed: false, "Leading Icon": true, "Tailing Icon": true, Button: "Button", iconSet: "symbols", "leading-icon": "download", "tailing-icon": "arrow_forward" });
  const [input, setInput] = useState({ Active: true, Error: false, Typed: false, Typing: false, Hover: false, Label: true, label: "Label", input: "Placeholder", Button: false, "Leading Icon": true, "Tailing Icon": true, "Focus Ring": false, iconSet: "symbols", "leading-icon": "person", "tailing-icon": "calendar_month" });
  const [inputButton, setInputButton] = useState({ Type: "Primary", Size: "Small", Hover: false, Enabled: true, Pressed: false, Button: "Button", "Leading Icon": true, "Tailing Icon": true, iconSet: "symbols", "leading-icon": "download", "tailing-icon": "business" });

  const [progressBar, setProgressBar] = useState({ Type: "In Progress" as ProgressType, value: 60, legend: true });
  const [progressPie, setProgressPie] = useState({ Type: "In Progress" as ProgressType, value: 32, legend: true });
  const [progressDonut, setProgressDonut] = useState({ Type: "In Progress" as ProgressType, value: 32, legend: true });
  const [loader, setLoader] = useState({ Type: "Circular" as LoaderType });
  const [segmented, setSegmented] = useState({ Type: "In Progress" as StepStatusType, Description: true, Icon: true, title: "Title", body: "Body" });
  const [stepperState, setStepperState] = useState({ Type: "In Progress" as StepStatusType, Description: true, Icon: true, title: "Title", body: "Body", slotVisible: false });

  const buttonVariant = useMemo(() => resolveButton(button), [button]);
  const iconButtonVariant = useMemo(() => resolveIconButton(iconButton), [iconButton]);
  const inputVariant = useMemo(() => resolveInput(input), [input]);

  return <div className="showcase">
    <header className="topbar">
      <a className="brand" href="#top"><span className="mark">ba</span><span>BA Design System</span></a>
      <nav><a href="#components">Components</a><a href="#code-connect">Code Connect</a><a href="https://github.com/shubhamarya-uxnai/BA-Design-Sytem">GitHub ↗</a><button className="theme-toggle" onClick={() => { setDark(!dark); document.documentElement.dataset.theme = !dark ? "dark" : "light"; }} aria-label="Toggle theme">{dark ? "☼" : "☾"}</button></nav>
    </header>
    <main id="top">
      <section className="hero"><p className="eyebrow">A shared language for what’s next</p><h1>Small parts.<br /><em>Endless possibilities.</em></h1><p className="lede">Figma-sourced foundations and React components for every BA website and web app.</p><a className="hero-link" href="#components">Explore components ↓</a></section>
      <section id="components" className="collection"><div className="section-heading"><h2>The component collection</h2><span>Exact Figma contract · live states</span></div>
        <div className="cards">
          <article className="card"><div className="card-meta"><span>01</span><span>Button</span></div><div className="preview button-preview"><Button {...button as any} Button="Explore components" onClick={() => setActive("button")} /></div><div className="card-footer"><div><h3>Buttons</h3><p>3 types · 2 sizes · 24 variants</p></div><button onClick={() => setActive("button")}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>02</span><span>Input Field</span></div><div className="preview field-preview"><InputField {...input as any} /></div><div className="card-footer"><div><h3>Input Field</h3><p>5 interaction axes · 8 variants</p></div><button onClick={() => setActive("input")}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>03</span><span>Icon Button</span></div><div className="preview icon-button-preview"><IconButton {...iconButton as any} aria-label={iconButton.actionName} /><IconButton Type="Default" icon="search" aria-label="Search" /><IconButton Type="Ghost" icon="settings" aria-label="Settings" /></div><div className="card-footer"><div><h3>Icon Button</h3><p>3 types · 2 sizes · 24 variants</p></div><button onClick={() => setIconOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>04</span><span>Chips</span></div><div className="preview chip-preview">{(["Primary", "Success", "Error"] as const).map(Type => <div className="chip-preview-row" key={Type}><Chip Type={Type} Style="Filled" /><Chip Type={Type} Style="Ghost" /></div>)}</div><div className="card-footer"><div><h3>Chips</h3><p>3 types · 2 styles · 6 variants</p></div><button onClick={() => setChipOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>05</span><span>Selection</span></div><div className="preview selection-preview"><Selection Type="Checkbox" Checked label="Checkbox" /><Selection Type="Radio" Checked label="Radio" /><Selection Type="Toggle" Checked label="Toggle" /></div><div className="card-footer"><div><h3>Selection Controls</h3><p>Checkbox · Radio · Toggle</p></div><button onClick={() => setSelectionOpen(true)}>Open playground ↗</button></div></article>
          
          {/* New Progress Indicator & Stepper components */}
          <article className="card"><div className="card-meta"><span>06</span><span>Progress Bar</span></div><div className="preview progress-preview"><ProgressBar Type="In Progress" value={60} /><ProgressBar Type="Success" value={100} /><ProgressBar Type="Warning" value={45} /><ProgressBar Type="Error" value={30} /></div><div className="card-footer"><div><h3>Progress Bar (Linear)</h3><p>5 states · percentage legend</p></div><button onClick={() => setProgressBarOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>07</span><span>Progress Pie</span></div><div className="preview pie-preview"><ProgressPie Type="In Progress" value={32} /><ProgressPie Type="Success" value={100} /><ProgressPie Type="Warning" value={32} /><ProgressPie Type="Error" value={32} /></div><div className="card-footer"><div><h3>Progress Pie</h3><p>Pie chart · 5 states · external legend</p></div><button onClick={() => setProgressPieOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>08</span><span>Progress Donut</span></div><div className="preview donut-preview"><ProgressDonut Type="In Progress" value={32} /><ProgressDonut Type="Success" value={100} /><ProgressDonut Type="Warning" value={32} /><ProgressDonut Type="Error" value={32} /></div><div className="card-footer"><div><h3>Progress Donut</h3><p>Hollow donut · centered legend</p></div><button onClick={() => setProgressDonutOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>09</span><span>Loaders</span></div><div className="preview loader-preview"><Loader Type="Circular" /><Loader Type="Bar" /><Loader Type="Skeleton" /></div><div className="card-footer"><div><h3>Loading Indicators</h3><p>Circular spinner · Bar slider · Skeleton</p></div><button onClick={() => setLoaderOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>10</span><span>Segmented Child</span></div><div className="preview segmented-preview"><SegmentedChild Type="Completed" title="Plan" body="Selected" /><SegmentedChild Type="In Progress" title="Payment" body="Processing" /><SegmentedChild Type="Default" title="Confirm" body="Pending" /></div><div className="card-footer"><div><h3>Segmented Child</h3><p>Process stage child · 5 states</p></div><button onClick={() => setSegmentedOpen(true)}>Open playground ↗</button></div></article>
          <article className="card"><div className="card-meta"><span>11</span><span>Stepper Child</span></div><div className="preview stepper-preview"><StepperChild Type="Completed" title="Details" body="Verified" /><StepperChild Type="In Progress" title="Verification" body="Under review" slotVisible><Button Size="Small" Type="Primary" Button="Upload ID" /></StepperChild><StepperChild Type="Default" title="Finish" body="Upcoming" /></div><div className="card-footer"><div><h3>Stepper Child</h3><p>Ordered step child · extensible slot</p></div><button onClick={() => setStepperOpen(true)}>Open playground ↗</button></div></article>
        </div>
      </section>
      <section className="contract"><p className="eyebrow">Single source of truth</p><h2>Every value starts in Figma.</h2><p>Tokens are generated from the BA Design System collections. Component props retain the original Figma names, values, defaults, and variant combinations.</p><div className="contract-grid"><div><strong>547</strong><span>tokens</span></div><div><strong>792</strong><span>aliases</span></div><div><strong>12</strong><span>components</span></div></div></section>
      <section id="code-connect" className="code-connect-section">
        <p className="eyebrow">Figma & GitHub Integration</p>
        <h2>Connected Components</h2>
        <p className="lede">Every component in the system is connected directly to its Figma component node, local TypeScript definition, and GitHub source repository counterpart via Figma Code Connect.</p>
        <table className="code-connect-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Status</th>
              <th>Figma Node</th>
              <th>Local Source</th>
              <th>GitHub Link</th>
            </tr>
          </thead>
          <tbody>
            {codeConnectManifest.components.map((c: any) => (
              <tr key={c.name}>
                <td><strong>{c.name}</strong></td>
                <td><span className="code-connect-badge-pill">✓ Connected</span></td>
                <td><a href={c.figma.url} target="_blank" rel="noreferrer">{c.figma.name} ({c.figma.nodeId}) ↗</a></td>
                <td><code>{c.local.codeConnect}</code></td>
                <td><a href={c.github.sourceUrl} target="_blank" rel="noreferrer">View on GitHub ↗</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>

    {/* Playground Modals */}
    {active && <div className="modal-backdrop" onClick={() => setActive(null)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setActive(null)}>×</button><p className="eyebrow">Component playground</p><h2>{active === "button" ? "Button" : "Input Field"}</h2>{active === "button" ? <><div className="playground-preview"><Button {...button as any} /></div><div className="controls"><SelectControl label="Type" value={button.Type} options={buttonTypes} setValue={value => setButton({ ...button, Type: value })} /><Toggle label="Hover" value={button.Hover} setValue={value => setButton({ ...button, Hover: value })} /><Toggle label="Enabled" value={button.Enabled} setValue={value => setButton({ ...button, Enabled: value })} /><Toggle label="Pressed" value={button.Pressed} setValue={value => setButton({ ...button, Pressed: value })} /><SelectControl label="Size" value={button.Size} options={["Large", "Small"]} setValue={value => setButton({ ...button, Size: value })} /><TextControl label="Button" value={button.Button} setValue={value => setButton({ ...button, Button: value })} /><Toggle label="Leading Icon" value={button["Leading Icon"]} setValue={value => setButton({ ...button, "Leading Icon": value })} /><IconPicker label="leading-icon" value={button["leading-icon"]} setValue={value => setButton({ ...button, "leading-icon": value })} iconSet={button.iconSet as MaterialIconSet} /><Toggle label="Tailing Icon" value={button["Tailing Icon"]} setValue={value => setButton({ ...button, "Tailing Icon": value })} /><IconPicker label="tailing-icon" value={button["tailing-icon"]} setValue={value => setButton({ ...button, "tailing-icon": value })} iconSet={button.iconSet as MaterialIconSet} /><SelectControl label="Icon set" value={button.iconSet} options={["symbols", "classic"]} setValue={value => setButton({ ...button, iconSet: value })} /></div><code>{buttonVariant?.name}</code><CodeSection component={"<Button Type=\"" + button.Type + "\" Size=\"" + button.Size + "\" Button=\"" + button.Button + "\" />"} usage={"import { Button } from \"@ba-design-system/react\";\n\n<Button Type=\"" + button.Type + "\" Size=\"" + button.Size + "\" Button=\"" + button.Button + "\" />"} /><CodeConnectInfo componentName="Button" /></> : <><div className="playground-preview"><InputField {...input as any} button={input.Button ? <Button {...inputButton as any} /> : undefined} /></div><div className="controls"><TextControl label="label" value={input.label} setValue={value => setInput({ ...input, label: value })} /><Toggle label="Label" value={input.Label} setValue={value => setInput({ ...input, Label: value })} /><IconPicker label="leading-icon" value={input["leading-icon"]} setValue={value => setInput({ ...input, "leading-icon": value })} iconSet={input.iconSet as MaterialIconSet} /><Toggle label="Leading Icon" value={input["Leading Icon"]} setValue={value => setInput({ ...input, "Leading Icon": value })} /><IconPicker label="tailing-icon" value={input["tailing-icon"]} setValue={value => setInput({ ...input, "tailing-icon": value })} iconSet={input.iconSet as MaterialIconSet} /><Toggle label="Tailing Icon" value={input["Tailing Icon"]} setValue={value => setInput({ ...input, "Tailing Icon": value })} /><TextControl label="input" value={input.input} setValue={value => setInput({ ...input, input: value })} /><Toggle label="Button" value={input.Button} setValue={value => setInput({ ...input, Button: value })} />{input.Button && <div className="nested-controls"><p className="eyebrow">Button properties</p><SelectControl label="Type" value={inputButton.Type} options={buttonTypes} setValue={value => setInputButton({ ...inputButton, Type: value })} /><Toggle label="Hover" value={inputButton.Hover} setValue={value => setInputButton({ ...inputButton, Hover: value })} /><Toggle label="Enabled" value={inputButton.Enabled} setValue={value => setInputButton({ ...inputButton, Enabled: value })} /><Toggle label="Pressed" value={inputButton.Pressed} setValue={value => setInputButton({ ...inputButton, Pressed: value })} /><SelectControl label="Size" value={inputButton.Size} options={["Large", "Small"]} setValue={value => setInputButton({ ...inputButton, Size: value })} /><Toggle label="Leading Icon" value={inputButton["Leading Icon"]} setValue={value => setInputButton({ ...inputButton, "Leading Icon": value })} /><IconPicker label="leading-icon" value={inputButton["leading-icon"]} setValue={value => setInputButton({ ...inputButton, "leading-icon": value })} iconSet={inputButton.iconSet as MaterialIconSet} /><Toggle label="Tailing Icon" value={inputButton["Tailing Icon"]} setValue={value => setInputButton({ ...inputButton, "Tailing Icon": value })} /><IconPicker label="tailing-icon" value={inputButton["tailing-icon"]} setValue={value => setInputButton({ ...inputButton, "tailing-icon": value })} iconSet={inputButton.iconSet as MaterialIconSet} /></div>}<SelectControl label="Icon set" value={input.iconSet} options={["symbols", "classic"]} setValue={value => setInput({ ...input, iconSet: value })} /><Toggle label="Focus Ring" value={input["Focus Ring"]} setValue={value => setInput({ ...input, "Focus Ring": value })} /><Toggle label="Hover" value={input.Hover} setValue={value => setInput({ ...input, Hover: value })} /><Toggle label="Typing" value={input.Typing} setValue={value => setInput({ ...input, Typing: value })} /><Toggle label="Error" value={input.Error} setValue={value => setInput({ ...input, Error: value })} /><Toggle label="Typed" value={input.Typed} setValue={value => setInput({ ...input, Typed: value })} /><Toggle label="Active" value={input.Active} setValue={value => setInput({ ...input, Active: value })} /></div><code>{inputVariant?.name}</code><CodeSection component={"<InputField label=\"" + input.label + "\" input=\"" + input.input + "\" Button={" + input.Button + "} />"} usage={"import { InputField } from \"@ba-design-system/react\";\n\n<InputField label=\"" + input.label + "\" input=\"" + input.input + "\" Button={" + input.Button + "} />"} /><CodeConnectInfo componentName="InputField" /><div className="variant-row">{inputStates.map((state, i) => <InputField key={i} label={`State ${i + 1}`} input="Placeholder" {...state} iconSet={input.iconSet as any} {...{"Leading Icon": input["Leading Icon"]}} {...{"Tailing Icon": input["Tailing Icon"]}} {...{"leading-icon": input["leading-icon"]}} {...{"tailing-icon": input["tailing-icon"]}} />)}</div></>}</aside></div>}
    {iconOpen && <div className="modal-backdrop" onClick={() => setIconOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Icon Button playground" onClick={() => setIconOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Icon Button</h2><div className="playground-preview"><IconButton {...iconButton as any} aria-label={iconButton.actionName} /></div><div className="controls"><SelectControl label="Type" value={iconButton.Type} options={buttonTypes} setValue={Type => setIconButton({ ...iconButton, Type })} /><Toggle label="Hover" value={iconButton.Hover} setValue={Hover => setIconButton({ ...iconButton, Hover })} /><Toggle label="Enabled" value={iconButton.Enabled} setValue={Enabled => setIconButton({ ...iconButton, Enabled })} /><Toggle label="Pressed" value={iconButton.Pressed} setValue={Pressed => setIconButton({ ...iconButton, Pressed })} /><SelectControl label="Size" value={iconButton.Size} options={["Large", "Small"]} setValue={Size => setIconButton({ ...iconButton, Size })} /><Toggle label="Icon" value={iconButton.Icon} setValue={Icon => setIconButton({ ...iconButton, Icon })} /><IconPicker label="icon" value={iconButton.icon} setValue={icon => setIconButton({ ...iconButton, icon })} iconSet={iconButton.iconSet as MaterialIconSet} /><TextControl label="Icon name" value={iconButton.icon} setValue={icon => setIconButton({ ...iconButton, icon })} /><SelectControl label="Icon set" value={iconButton.iconSet} options={["symbols", "classic"]} setValue={iconSet => setIconButton({ ...iconButton, iconSet })} /><Toggle label="Focus" value={iconButton.Focus} setValue={Focus => setIconButton({ ...iconButton, Focus })} /><TextControl label="Accessible action name" value={iconButton.actionName} setValue={actionName => setIconButton({ ...iconButton, actionName })} /></div><code>{iconButtonVariant?.name}</code><CodeSection component={`<IconButton Type="${iconButton.Type}" Size="${iconButton.Size}" icon="${iconButton.icon}" aria-label="${iconButton.actionName}" />`} usage={`import { IconButton } from "@ba-design-system/react";\n\n<IconButton Type="${iconButton.Type}" Size="${iconButton.Size}" icon="${iconButton.icon}" aria-label="${iconButton.actionName}" />`} /><CodeConnectInfo componentName="IconButton" /></aside></div>}
    {chipOpen && <div className="modal-backdrop" onClick={() => setChipOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Chips playground" onClick={() => setChipOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Chips</h2><div className="playground-preview"><Chip {...chip} /></div><div className="controls"><SelectControl label="Type" value={chip.Type} options={["Primary", "Success", "Error"]} setValue={Type => setChip({ ...chip, Type: Type as typeof chip.Type })} /><SelectControl label="Style" value={chip.Style} options={["Filled", "Ghost"]} setValue={Style => setChip({ ...chip, Style: Style as typeof chip.Style })} /><TextControl label="Chip" value={chip.chip} setValue={value => setChip({ ...chip, chip: value })} /><Toggle label="Icon" value={chip.Icon} setValue={Icon => setChip({ ...chip, Icon })} /><IconPicker label="icon" value={chip.icon ?? "person"} setValue={icon => setChip({ ...chip, icon })} iconSet={chip.iconSet as MaterialIconSet} /><button className="reset-icon" type="button" onClick={() => setChip({ ...chip, icon: undefined })}>Use Figma icon</button><SelectControl label="Icon set" value={chip.iconSet} options={["symbols", "classic"]} setValue={iconSet => setChip({ ...chip, iconSet })} /></div><code>{`Type=${chip.Type}, Style=${chip.Style}`}</code><CodeSection component={`<Chip Type="${chip.Type}" Style="${chip.Style}" chip="${chip.chip}"${chip.icon ? ` icon="${chip.icon}"` : ""} />`} usage={`import { Chip } from "@ba-design-system/react";\n\n<Chip Type="${chip.Type}" Style="${chip.Style}" chip="${chip.chip}"${chip.icon ? ` icon="${chip.icon}"` : ""} />`} /><CodeConnectInfo componentName="Chip" /></aside></div>}
    {selectionOpen && <div className="modal-backdrop" onClick={() => setSelectionOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Selection playground" onClick={() => setSelectionOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Selection Controls</h2><div className="playground-preview"><Selection {...selection} onCheckedChange={Checked => setSelection({ ...selection, Checked })} /></div><div className="controls"><SelectControl label="Type" value={selection.Type} options={["Checkbox", "Radio", "Toggle"]} setValue={Type => setSelection({ ...selection, Type: Type as typeof selection.Type })} /><Toggle label="Checked" value={selection.Checked} setValue={Checked => setSelection({ ...selection, Checked })} /><Toggle label="Active" value={selection.Active} setValue={Active => setSelection({ ...selection, Active })} /><Toggle label="Hover" value={selection.Hover} setValue={Hover => setSelection({ ...selection, Hover })} /><Toggle label="Focus" value={selection.Focus} setValue={Focus => setSelection({ ...selection, Focus })} /><TextControl label="label" value={selection.label} setValue={label => setSelection({ ...selection, label })} /></div><code>{`Type=${selection.Type}, Checked=${selection.Checked}, Active=${selection.Active}, Hover=${selection.Hover}`}</code><CodeSection component={`<Selection Type="${selection.Type}" Checked={${selection.Checked}} Active={${selection.Active}} label="${selection.label}" />`} usage={`import { Selection } from "@ba-design-system/react";\n\n<Selection Type="${selection.Type}" Checked={${selection.Checked}} Active={${selection.Active}} label="${selection.label}" onCheckedChange={setChecked} />`} /><CodeConnectInfo componentName="Selection" /></aside></div>}

    {/* Progress Bar Modal */}
    {progressBarOpen && <div className="modal-backdrop" onClick={() => setProgressBarOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Progress Bar playground" onClick={() => setProgressBarOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Progress Bar (Linear)</h2><div className="playground-preview"><ProgressBar Type={progressBar.Type} value={progressBar.value} Legend={progressBar.legend} /></div><div className="controls"><SelectControl label="Type" value={progressBar.Type} options={progressTypes} setValue={Type => setProgressBar({ ...progressBar, Type: Type as ProgressType })} /><NumberControl label="Progress Value" value={progressBar.value} setValue={value => setProgressBar({ ...progressBar, value })} /><Toggle label="Legend" value={progressBar.legend} setValue={legend => setProgressBar({ ...progressBar, legend })} /></div><code>{`Type=${progressBar.Type}, value=${progressBar.value}%, Legend=${progressBar.legend}`}</code><CodeSection component={`<ProgressBar Type="${progressBar.Type}" value={${progressBar.value}} Legend={${progressBar.legend}} />`} usage={`import { ProgressBar } from "@ba-design-system/react";\n\n<ProgressBar Type="${progressBar.Type}" value={${progressBar.value}} Legend={${progressBar.legend}} />`} /><CodeConnectInfo componentName="ProgressBar" /></aside></div>}

    {/* Progress Pie Modal */}
    {progressPieOpen && <div className="modal-backdrop" onClick={() => setProgressPieOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Progress Pie playground" onClick={() => setProgressPieOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Progress Pie</h2><div className="playground-preview"><ProgressPie Type={progressPie.Type} value={progressPie.value} Legend={progressPie.legend} /></div><div className="controls"><SelectControl label="Type" value={progressPie.Type} options={progressTypes} setValue={Type => setProgressPie({ ...progressPie, Type: Type as ProgressType })} /><NumberControl label="Progress Value" value={progressPie.value} setValue={value => setProgressPie({ ...progressPie, value })} /><Toggle label="Legend" value={progressPie.legend} setValue={legend => setProgressPie({ ...progressPie, legend })} /></div><code>{`Type=${progressPie.Type}, value=${progressPie.value}%, Legend=${progressPie.legend}`}</code><CodeSection component={`<ProgressPie Type="${progressPie.Type}" value={${progressPie.value}} Legend={${progressPie.legend}} />`} usage={`import { ProgressPie } from "@ba-design-system/react";\n\n<ProgressPie Type="${progressPie.Type}" value={${progressPie.value}} Legend={${progressPie.legend}} />`} /><CodeConnectInfo componentName="ProgressPie" /></aside></div>}

    {/* Progress Donut Modal */}
    {progressDonutOpen && <div className="modal-backdrop" onClick={() => setProgressDonutOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Progress Donut playground" onClick={() => setProgressDonutOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Progress Donut</h2><div className="playground-preview"><ProgressDonut Type={progressDonut.Type} value={progressDonut.value} Legend={progressDonut.legend} /></div><div className="controls"><SelectControl label="Type" value={progressDonut.Type} options={progressTypes} setValue={Type => setProgressDonut({ ...progressDonut, Type: Type as ProgressType })} /><NumberControl label="Progress Value" value={progressDonut.value} setValue={value => setProgressDonut({ ...progressDonut, value })} /><Toggle label="Legend" value={progressDonut.legend} setValue={legend => setProgressDonut({ ...progressDonut, legend })} /></div><code>{`Type=${progressDonut.Type}, value=${progressDonut.value}%, Legend=${progressDonut.legend}`}</code><CodeSection component={`<ProgressDonut Type="${progressDonut.Type}" value={${progressDonut.value}} Legend={${progressDonut.legend}} />`} usage={`import { ProgressDonut } from "@ba-design-system/react";\n\n<ProgressDonut Type="${progressDonut.Type}" value={${progressDonut.value}} Legend={${progressDonut.legend}} />`} /><CodeConnectInfo componentName="ProgressDonut" /></aside></div>}

    {/* Loader Modal */}
    {loaderOpen && <div className="modal-backdrop" onClick={() => setLoaderOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Loaders playground" onClick={() => setLoaderOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Loading Indicators</h2><div className="playground-preview"><Loader Type={loader.Type} /></div><div className="controls"><SelectControl label="Type" value={loader.Type} options={loaderTypes} setValue={Type => setLoader({ Type: Type as LoaderType })} /></div><code>{`Type=${loader.Type}`}</code><CodeSection component={`<Loader Type="${loader.Type}" />`} usage={`import { Loader } from "@ba-design-system/react";\n\n<Loader Type="${loader.Type}" />`} /><CodeConnectInfo componentName="Loader" /></aside></div>}

    {/* Segmented Child Modal */}
    {segmentedOpen && <div className="modal-backdrop" onClick={() => setSegmentedOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Segmented playground" onClick={() => setSegmentedOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Segmented Child</h2><div className="playground-preview"><SegmentedChild Type={segmented.Type} Description={segmented.Description} Icon={segmented.Icon} title={segmented.title} body={segmented.body} /></div><div className="controls"><SelectControl label="Type" value={segmented.Type} options={stepStatusTypes} setValue={Type => setSegmented({ ...segmented, Type: Type as StepStatusType })} /><Toggle label="Description" value={segmented.Description} setValue={Description => setSegmented({ ...segmented, Description })} /><Toggle label="Icon" value={segmented.Icon} setValue={Icon => setSegmented({ ...segmented, Icon })} /><TextControl label="Title" value={segmented.title} setValue={title => setSegmented({ ...segmented, title })} /><TextControl label="Body" value={segmented.body} setValue={body => setSegmented({ ...segmented, body })} /></div><code>{`Type=${segmented.Type}, Description=${segmented.Description}`}</code><CodeSection component={`<SegmentedChild Type="${segmented.Type}" Description={${segmented.Description}} title="${segmented.title}" body="${segmented.body}" />`} usage={`import { SegmentedChild } from "@ba-design-system/react";\n\n<SegmentedChild Type="${segmented.Type}" Description={${segmented.Description}} title="${segmented.title}" body="${segmented.body}" />`} /><CodeConnectInfo componentName="SegmentedChild" /></aside></div>}

    {/* Stepper Child Modal */}
    {stepperOpen && <div className="modal-backdrop" onClick={() => setStepperOpen(false)}><aside className="playground" onClick={e => e.stopPropagation()}><button className="close" aria-label="Close Stepper playground" onClick={() => setStepperOpen(false)}>×</button><p className="eyebrow">Component playground</p><h2>Stepper Child</h2><div className="playground-preview" style={{ padding: "30px 50px" }}><StepperChild Type={stepperState.Type} Description={stepperState.Description} Icon={stepperState.Icon} title={stepperState.title} body={stepperState.body} slotVisible={stepperState.slotVisible}>{stepperState.slotVisible && <Button Size="Small" Type="Primary" Button="Action" />}</StepperChild></div><div className="controls"><SelectControl label="Type" value={stepperState.Type} options={stepStatusTypes} setValue={Type => setStepperState({ ...stepperState, Type: Type as StepStatusType })} /><Toggle label="Description" value={stepperState.Description} setValue={Description => setStepperState({ ...stepperState, Description })} /><Toggle label="Icon" value={stepperState.Icon} setValue={Icon => setStepperState({ ...stepperState, Icon })} /><Toggle label="Slot visible" value={stepperState.slotVisible} setValue={slotVisible => setStepperState({ ...stepperState, slotVisible })} /><TextControl label="Title" value={stepperState.title} setValue={title => setStepperState({ ...stepperState, title })} /><TextControl label="Body" value={stepperState.body} setValue={body => setStepperState({ ...stepperState, body })} /></div><code>{`Type=${stepperState.Type}, Description=${stepperState.Description}, slotVisible=${stepperState.slotVisible}`}</code><CodeSection component={`<StepperChild Type="${stepperState.Type}" Description={${stepperState.Description}} title="${stepperState.title}" body="${stepperState.body}" />`} usage={`import { StepperChild } from "@ba-design-system/react";\n\n<StepperChild Type="${stepperState.Type}" Description={${stepperState.Description}} title="${stepperState.title}" body="${stepperState.body}" />`} /><CodeConnectInfo componentName="StepperChild" /></aside></div>}

    <footer><span>BA Design System · Built from the Figma contract.</span><a href="https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System">Open source Figma ↗</a></footer>
  </div>;
}

createRoot(document.getElementById("root")!).render(<App />);
