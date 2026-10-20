// Shared compatibility entry point for the three existing browser tools.
import fs from 'node:fs';
const read = p => fs.readFileSync(p, 'utf8');
const old = read('source/compat/tokens-reference.css');
const components = read('source/compat/components.css');
const type = read('source/compat/type.css');
const shadcn = read('source/compat/shadcn.css');
const tokens = read('dist/tokens.css');
const fonts = read('source/fonts.css');
fs.writeFileSync('dist/fonts.css', fonts);
const entry = read('dist/index.css');
fs.writeFileSync('dist/index.css', '@import url("./fonts.css");\n' + entry.replace('@import url("./fonts.css");\n', ''));
const defs = new Map();
for (const m of old.matchAll(/(--ds-[\w-]+)\s*:\s*([^;]+);/g)) if (!defs.has(m[1])) defs.set(m[1],m[2]);
function resolve(name, seen = new Set()) {
  if (seen.has(name)) return '';
  seen.add(name);
  const value = defs.get(name) || '';
  const alias = value.match(/^var\((--[\w-]+)\)$/);
  return alias ? resolve(alias[1], seen) : value;
}
const va = n => `var(--va-${n})`;
const sem = n => va('semantic-color-tokens-' + n);
const names = new Set([...`${components}\n${type}\n${shadcn}`.matchAll(/--ds-[\w-]+/g)].map(m => m[0]));
for (const m of tokens.matchAll(/--va-typography-font-sizes-(\d+):/g)) names.add('--ds-font-size-' + m[1]);
for (const n of ['font-family-primary','font-family-secondary','text-body-weight-default','text-body-weight-medium']) names.add('--ds-'+n);
const aliases = [];
for (const name of [...names].sort()) {
  let value;
  const n = name.slice(5);
  if (/font-family/.test(n)) value = va('typography-font-family-' + (/primary|heading/.test(n) ? 'title' : 'body'));
  else if (/weight/.test(n)) value = /thick|bold/.test(n) ? '700' : /medium/.test(n) ? '500' : '400';
  else if (/color|semantic/.test(n)) {
    const status = n.match(/(?:^|-)(error|success|warning|info)(?:-|$)/);
    const chart = n.match(/chart-(\d)/);
    const brand = n.includes('secondary') ? 'secondary' : 'primary';
    if (chart) value = sem('chart-' + chart[1]);
    else if (status) value = sem(`status-${status[1]}-${/text/.test(n) ? 'text' : /border/.test(n) ? 'border' : 'fill'}`);
    else if (/disabled/.test(n)) value = sem(/text|information/.test(n) ? 'foreground-disabled' : 'background-disabled');
    else if (/border|focus/.test(n)) value = sem(/primary|focus/.test(n) ? 'border-primary' : 'border-default');
    else if (/text|information/.test(n)) value = sem(/primary-fill-text|secondary-fill-text/.test(n) ? 'foreground-inverse-default' : /muted|secondary|subtle/.test(n) ? 'foreground-neutral-subtle' : 'foreground-neutral-default');
    else if (/button-(primary|secondary)-fill-fill|radio-and-check-selected/.test(n)) value = va(`color-themes-${brand}-600`);
    else if (/hover/.test(n)) value = sem('hover');
    else if (/ghost/.test(n)) value = 'transparent';
    else value = sem(/page/.test(n) ? 'background-neutral-page' : /layer|card|sidebar/.test(n) ? 'background-neutral-raised' : 'background-neutral-default');
  } else {
    const literal = resolve(name);
    const numeric = literal.match(/^([\d.]+)px$/);
    const size = n.match(/font-size-(\d+)$/);
    if (size && tokens.includes(`--va-typography-font-sizes-${size[1]}:`)) value = va('typography-font-sizes-' + size[1]);
    else if (numeric) {
      const px = Number(numeric[1]);
      if (/font|text.*size/.test(n)) {
        const sizes = [...tokens.matchAll(/--va-typography-font-sizes-(\d+):/g)].map(m => Number(m[1]));
        const nearest = sizes.sort((a,b) => Math.abs(a-px)-Math.abs(b-px))[0];
        value = va('typography-font-sizes-' + nearest);
      } else if (/radius/.test(n)) value = va('screen-size-switch-corner-radius-' + (px > 8 ? 'l' : px > 4 ? 'm' : 's'));
      else if (/border-width/.test(n)) value = va('screen-size-switch-stroke-default');
      else {
        const space = String(px / 4).replace('.', '-');
        value = tokens.includes(`--va-space-${space}:`) ? `calc(${va('space-' + space)} * 1px)` : va('screen-size-switch-gap-s');
      }
    } else if (/border-width/.test(n)) value = va('screen-size-switch-stroke-default');
    else if (/font|text.*size/.test(n)) value = va('typography-font-sizes-14');
    else if (/radius/.test(n)) value = va('screen-size-switch-corner-radius-m');
    else value = va('screen-size-switch-gap-s');
  }
  aliases.push(`  ${name}: ${value};`);
}
const scope = ':root, [data-theme], [data-contrast], [data-temperature], [data-text-scale], [data-screen], [lang]';
const bridge = `${scope} {\n${aliases.join('\n')}\n}\n${shadcn}\n`;
const bundle = ['tokens.css','components.css','text-styles.css','input-fields.css'].map(f=>read('dist/'+f)).join('\n');
const iconCSS = `.ds-button .ph, .ds-icon-button .ph { width: var(--va-screen-size-switch-width-and-height-l); height: var(--va-screen-size-switch-width-and-height-l); font-size: var(--va-screen-size-switch-width-and-height-l); }
.material-symbols-rounded.ph { display: inline-flex; align-items: center; justify-content: center; font-family: 'Material Symbols Rounded'; font-weight: 400; font-style: normal; line-height: 1; letter-spacing: normal; text-transform: none; white-space: nowrap; word-wrap: normal; font-feature-settings: 'liga'; }
`;
fs.writeFileSync('dist/consumer.css', `/* BA Design System v0.1.2 — shared browser consumer entry point */\n${fonts}\n${bundle}\n${bridge}\n${components}\n${type}\n${iconCSS}`);
const references = [...fs.readFileSync('dist/consumer.css','utf8').matchAll(/var\((--[\w-]+)/g)].map(m=>m[1]);
const defined = new Set([...fs.readFileSync('dist/consumer.css','utf8').matchAll(/(--[\w-]+)\s*:/g)].map(m=>m[1]));
const missing = [...new Set(references.filter(n=>!defined.has(n)))];
if (missing.length) throw new Error('Unresolved CSS references: '+missing.join(', '));
console.log(`Built shared consumer.css with ${aliases.length} compatibility aliases.`);
