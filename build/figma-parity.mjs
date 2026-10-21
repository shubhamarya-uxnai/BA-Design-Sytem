import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const tokens=read('dist/tokens.json').tokens;
const byId=new Map(tokens.map(t=>[t.id,t.cssVariable]));
const specs={button:read('source/specs/buttons.json'),iconButton:read('source/specs/icon-buttons.json'),input:read('source/specs/input-fields.json')};
const iconButtonColors=new Map(read('source/specs/icon-vector-bindings.json').iconButtons.map(v=>[v.variantId,aliasColor(v.iconColor)]));
function aliasColor(value){return value?.type==='VARIABLE_ALIAS'?byId.get(value.id):null}
const alias=v=>{if(Array.isArray(v))return alias(v[0]);return v?.type==='VARIABLE_ALIAS'&&byId.has(v.id)?`var(${byId.get(v.id)})`:null};
const bind=(n,k)=>alias(n?.boundVariables?.[k]);
const px=(n,k)=>bind(n,k)??`${n?.[k]??0}px`;
const paint=(n,k)=>{const p=n?.[k]?.find(x=>x.visible!==false);return bind(n,k)||alias(p?.boundVariables?.color)||(p?.color?`rgb(${['r','g','b'].map(c=>Math.round(p.color[c]*255)).join(' ')} / ${p.opacity??1})`:'transparent')};
const shadow=n=>(n.effects||[]).filter(e=>e.visible!==false&&e.type==='DROP_SHADOW').map(e=>`${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread||0}px rgb(${['r','g','b'].map(k=>Math.round(e.color[k]*255)).join(' ')} / ${e.color.a})`).join(', ')||'none';
const innerShadow=n=>(n.effects||[]).filter(e=>e.visible!==false&&e.type==='INNER_SHADOW').map(e=>`inset ${e.offset.x}px ${e.offset.y}px ${Number(e.radius.toFixed(2))}px ${e.spread||0}px rgb(${['r','g','b'].map(k=>Math.round(e.color[k]*255)).join(' ')} / ${Number(e.color.a.toFixed(2))})`).join(', ')||'none';
const radius=n=>bind(n,'topLeftRadius')||px(n,'cornerRadius');
const rule=(selector,items)=>`${selector} {\n${Object.entries(items).filter(([,v])=>v!=null).map(([k,v])=>`  ${k}: ${v};`).join('\n')}\n}\n`;
const weight=style=>/Semi.?Bold/i.test(style)?600:/Extra.?Bold/i.test(style)?800:/Bold/i.test(style)?700:/Medium/i.test(style)?500:400;
const textStyle=n=>({'font-family':JSON.stringify(n.text.fontName.family==='Inter'?'Instrument Sans':n.text.fontName.family),'font-size':px(n,'fontSize')==='0px'?`${n.text.fontSize}px`:px(n,'fontSize'),'font-weight':weight(n.text.fontName.style),'font-style':/Italic/.test(n.text.fontName.style)?'italic':'normal','line-height':n.text.lineHeight.unit==='PERCENT'?String(n.text.lineHeight.value/100):n.text.lineHeight.unit==='PIXELS'?`${n.text.lineHeight.value}px`:'normal','letter-spacing':n.text.letterSpacing.value?`${n.text.letterSpacing.value}px`:'normal',color:paint(n,'fills')});
let css=`/* Generated directly from the live Figma component snapshots. */
.figma-button { appearance:none; position:relative; display:inline-flex; align-items:center; justify-content:center; isolation:isolate; box-sizing:border-box; margin:0; cursor:pointer; text-decoration:none; outline:none; max-width:600px; flex:none; }
.figma-button:disabled { cursor:not-allowed; }
.figma-button > :not(.figma-overlay):not(.figma-focus) { position:relative; z-index:1; }
.figma-label { margin:0; white-space:nowrap; }
.figma-icon { display:inline-flex; align-items:center; justify-content:center; flex:none; }
.figma-icon .material-icons { font-family:'Material Icons'; font-size:inherit; line-height:1; font-weight:normal; font-style:normal; letter-spacing:normal; text-transform:none; font-feature-settings:'liga'; white-space:nowrap; display:block; }
.figma-overlay,.figma-focus { position:absolute; pointer-events:none; box-sizing:border-box; }
.figma-overlay { inset:0; border-radius:inherit; z-index:2; }
.figma-focus { inset:-4px; }
.figma-button:not([data-focus-ring="true"]):not(:focus-visible) > .figma-focus { display:none; }
.figma-icon-button { appearance:none; position:relative; display:inline-flex; align-items:center; justify-content:center; isolation:isolate; box-sizing:border-box; margin:0; cursor:pointer; outline:none; flex:none; }
.figma-icon-button:disabled { cursor:not-allowed; }
.figma-icon-button > .figma-icon { position:relative; z-index:1; }
.figma-icon-button__default-icon { background:currentColor; mask:url("./assets/icon-button-brightness.svg") center / contain no-repeat; }
.figma-icon-button:not([data-focus-ring="true"]):not(:focus-visible) > .figma-focus { display:none; }
.figma-input { display:flex; flex-direction:column; align-items:stretch; width:217px; max-width:100%; position:relative; }
.figma-input--with-button { width:min(368px,100%); }
.figma-input__label { margin:0; }
.figma-input__shell { display:flex; align-items:center; width:100%; position:relative; box-sizing:border-box; }
.figma-input__control { display:flex; align-items:center; flex:1 1 0; min-width:0; position:relative; z-index:1; box-sizing:border-box; }
.figma-input__input { appearance:none; border:0; outline:0; min-width:1px; width:100%; flex:1 1 0; padding:0; margin:0; background:transparent; box-shadow:none; box-sizing:content-box; }
.figma-input__input::placeholder { color:inherit; opacity:1; }
.figma-input__action { display:flex; align-items:center; align-self:stretch; flex:none; position:relative; z-index:1; }
.figma-input__shell > .figma-focus { display:none; }
.figma-input[data-focus-ring="true"] .figma-focus,.figma-input__shell:focus-within > .figma-focus { display:block; }
`;
for(const v of specs.button.variants){
 const n=v.root,children=v.children,t=children.find(c=>c.type==='TEXT'),icons=children.filter(c=>c.type==='INSTANCE'),stroke=n.strokes?.some(p=>p.visible!==false),sw=stroke?px(n,'strokeWeight'):'0px';
 const selector=`.figma-button[data-figma-variant="${v.id}"]`;
 const padding={};for(const side of ['Top','Right','Bottom','Left'])padding['padding-'+side.toLowerCase()]=stroke?`max(0px,calc(${px(n,'padding'+side)} - ${sw}))`:px(n,'padding'+side);
 css+=rule(selector,{gap:px(n,'itemSpacing'),...padding,'border-radius':radius(n),border:`${sw} solid ${paint(n,'strokes')}`,background:paint(n,'fills'),'box-shadow':shadow(n),opacity:n.opacity});
 css+=rule(selector+' .figma-label',textStyle(t));
 css+=rule(selector+'[data-default-label="true"] .figma-label',{'min-width':`${t.width/t.text.fontSize}em`});
 for(let i=0;i<icons.length;i++)css+=rule(selector+` .figma-icon--${i?'trailing':'leading'}`,{width:px(icons[i],'width'),height:px(icons[i],'height'),'font-size':px(icons[i],'width'),color:paint(t,'fills')});
 const overlay=children.find(c=>c.name.includes('Overlay'));if(overlay)css+=rule(selector+' > .figma-overlay',{background:paint(overlay,'fills'),'box-shadow':innerShadow(overlay)});
 const focus=children.find(c=>c.name==='Focus Ring');if(focus)css+=rule(selector+' > .figma-focus',{border:`${bind(focus,'strokeTopWeight')||px(focus,'strokeWeight')} solid ${paint(focus,'strokes')}`,'border-radius':radius(focus)});
}
for(const v of specs.iconButton.variants){
 const n=v.root,children=v.children,icon=children.find(c=>c.type==='INSTANCE'),stroke=n.strokes?.some(p=>p.visible!==false),sw=stroke?px(n,'strokeWeight'):'0px';
 const selector=`.figma-icon-button[data-figma-variant="${v.id}"]`;
 const padding={};for(const side of ['Top','Right','Bottom','Left'])padding['padding-'+side.toLowerCase()]=stroke?`max(0px,calc(${px(n,'padding'+side)} - ${sw}))`:px(n,'padding'+side);
 css+=rule(selector,{gap:px(n,'itemSpacing'),...padding,'border-radius':radius(n),border:`${sw} solid ${paint(n,'strokes')}`,background:paint(n,'fills'),'box-shadow':shadow(n),opacity:n.opacity});
 css+=rule(selector+' > .figma-icon',{width:px(icon,'width'),height:px(icon,'height'),'font-size':px(icon,'width'),color:iconButtonColors.get(v.id)?`var(${iconButtonColors.get(v.id)})`:null});
 const overlay=children.find(c=>c.name.includes('Overlay'));if(overlay)css+=rule(selector+' > .figma-overlay',{background:paint(overlay,'fills'),'box-shadow':innerShadow(overlay)});
 const focus=children.find(c=>c.name==='Focus Ring');if(focus)css+=rule(selector+' > .figma-focus',{border:`${bind(focus,'strokeTopWeight')||px(focus,'strokeWeight')} solid ${paint(focus,'strokes')}`,'border-radius':radius(focus)});
}
for(const v of specs.input.variants){
 const r=v.root,label=r.children.find(n=>n.type==='TEXT'),shell=r.children.find(n=>n.type==='FRAME'),control=shell.children.find(n=>['Input','Container'].includes(n.name)),text=control.children.find(n=>n.type==='TEXT'),icons=control.children.filter(n=>n.type==='INSTANCE'),button=shell.children.find(n=>n.name==='Button');
 const s=`.figma-input[data-figma-variant="${v.id}"]`;
 css+=rule(s,{gap:px(r,'itemSpacing')});css+=rule(s+' .figma-input__label',textStyle(label));
 css+=rule(s+' .figma-input__shell',{background:paint(shell,'fills'),border:`${bind(shell,'strokeTopWeight')||px(shell,'strokeWeight')} solid ${paint(shell,'strokes')}`,'border-radius':radius(shell),'min-height':`${shell.height}px`});
 css+=rule(s+' .figma-input__control',{gap:px(control,'itemSpacing'),padding:['Top','Right','Bottom','Left'].map(x=>px(control,'padding'+x)).join(' '),'border-radius':radius(control),'margin-right':shell.itemSpacing<0?`${shell.itemSpacing}px`:null});
 css+=rule(s+' .figma-input__input',textStyle(text));
 for(let i=0;i<icons.length;i++){const vector=icons[i].children?.find(n=>n.type==='VECTOR'&&paint(n,'fills')!=='transparent');css+=rule(s+` .figma-input__control > .figma-icon--${i?'trailing':'leading'}`,{width:px(icons[i],'width'),height:px(icons[i],'height'),'font-size':px(icons[i],'width'),color:vector?paint(vector,'fills'):paint(text,'fills')});}
 if(button)css+=rule(s+' .figma-input__action',{gap:px(button,'itemSpacing'),'padding-right':px(button,'paddingRight'),'border-radius':radius(button)});
 const overlay=shell.children.find(n=>n.name.includes('Overlay'));if(overlay)css+=rule(s+' .figma-overlay',{background:paint(overlay,'fills')});
 const focus=shell.children.find(n=>n.name==='Focus Ring');const baseFocus=specs.input.variants[0].root.children.find(n=>n.type==='FRAME').children.find(n=>n.name==='Focus Ring');
 const f=focus||baseFocus;css+=rule(s+' .figma-focus',{border:`${bind(f,'strokeTopWeight')||px(f,'strokeWeight')} solid ${paint(f,'strokes')}`,'border-radius':radius(f)});
}
fs.writeFileSync('dist/figma-components.css',css);
fs.writeFileSync('dist/figma-contract.json',JSON.stringify(Object.fromEntries(Object.entries(specs).map(([name,d])=>[name,{source:d.source,variants:d.variants.map(v=>({id:v.id,name:v.name,properties:v.propValues,width:v.root.width,height:v.root.height,focusRing:name==='input'?v.root.children.some(n=>n.children?.some(c=>c.name==='Focus Ring')):v.children.some(n=>n.name==='Focus Ring')}))}])) ,null,2)+'\n');
fs.copyFileSync('source/figma-components.mjs','dist/figma-components.mjs');
console.log('Generated Figma parity CSS and exact property contracts: 24 buttons, 24 icon buttons, 8 fields.');
