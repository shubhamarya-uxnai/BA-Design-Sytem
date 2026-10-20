import * as React from 'https://esm.sh/react@19.1.0';
import {contract,createFigmaComponents,resolveButton,resolveInput} from './dist/figma-components.mjs';
const {createElement:h,useState}=React;
export const {Button,InputField}=createFigmaComponents(React);
const iconChoices=['download','business','supervised_user_circle','date_range','search','add','close','arrow_forward','expand_more','check'];
function Choice({label,value,options,onChange}){return h('label',{className:'control-row'},label,h('select',{'aria-label':label,'data-ba-component':'InputField',value,onChange:e=>onChange(e.target.value)},options.map(v=>h('option',{key:v,value:v},v))))}
function Toggle({label,value,onChange}){return h('label',{className:'control-row'},label,h('input',{'aria-label':label,type:'checkbox',checked:value,onChange:e=>onChange(e.target.checked)}))}
function Text({label,value,onChange}){return h('label',{className:'control-row'},label,h('input',{'aria-label':label,'data-ba-component':'InputField',value,onChange:e=>onChange(e.target.value)}))}
function IconSwap({label,value,onChange}){const id=React.useId();return h('label',{className:'control-row'},label,h('span',null,h('input',{'aria-label':label,'data-ba-component':'InputField',list:id,value,onChange:e=>onChange(e.target.value)}),h('datalist',{id},...iconChoices.map(v=>h('option',{key:v,value:v})))))}
function Frame({name,children}){return h('div',{className:'story-cell'},children,h('small',null,name))}
function Modes(){const [mode,setMode]=useState({screen:'mobile',temperature:'warm',theme:document.documentElement.dataset.theme||'light','text-scale':'1'});return h('div',{className:'controls reference-modes'},h('h3',{className:'story-title'},'Variable modes'),...[['screen','Screen Size Switch',['mobile','tablet','desktop']],['temperature','Color Themes',['warm','cool']],['theme','Semantic Color Tokens',['light','dark']],['text-scale','Font Size Control',['1','1.2x','1.4x','1.6x','1.8x','2x']]].map(([key,label,options])=>h(Choice,{key,label,value:mode[key],options,onChange:v=>{setMode(s=>({...s,[key]:v}));document.documentElement.setAttribute('data-'+key,v)}})))}
function Source({spec,variant}){return h(React.Fragment,null,h('p',{className:'variant-note'},'Configured Figma variant (live interaction can change Hover, Pressed and Typing): ',h('code',null,variant?.name)),h('a',{className:'text-link',href:`https://www.figma.com/design/TeshjuZ2KBKj4xhK9r2OHU/BA-Design-System?node-id=${spec.source.id.replace(':','-')}`,target:'_blank',rel:'noreferrer'},'View original Figma component ↗'))}
export function ButtonBoard(){
 const [props,setProps]=useState({Type:'Primary',Size:'Large',Hover:false,Enabled:true,Pressed:false,Button:'Button','Leading Icon':true,'Tailing Icon':true,'leading-icon':'download','tailing-icon':'business'}),[live,setLive]=useState(true),[count,setCount]=useState(0);
 const set=(key,value)=>setProps(p=>({...p,[key]:value}));const variant=resolveButton(props);
 return h(React.Fragment,null,h('p',{className:'drawer-intro'},'The same properties, defaults, nested icon slots and 24 variants as the Figma Buttons component. Turn off live interaction to inspect the exact toggle combination.'),
  h('div',{className:'demo-stage figma-demo'},h(Button,{...props,interactive:live,onClick:()=>setCount(n=>n+1)})),
  h('p',{className:'live-note','aria-live':'polite'},count?`${count} button interactions`:'Hover, press, or tab to focus.'),
  h('div',{className:'controls'},h('h3',{className:'story-title'},'Component properties'),h(Toggle,{label:'Live interaction',value:live,onChange:setLive}),
   ...['Type','Size'].map(key=>h(Choice,{key,label:key,value:props[key],options:contract.button.source.propertyDefinitions[key].variantOptions,onChange:v=>set(key,v)})),
   ...['Hover','Enabled','Pressed'].map(key=>h(Toggle,{key,label:key,value:props[key],onChange:v=>set(key,v)})),
   h(Text,{label:'Button',value:props.Button,onChange:v=>set('Button',v)}),
   ...[['Leading Icon','leading-icon'],['Tailing Icon','tailing-icon']].flatMap(([toggle,swap])=>[h(Toggle,{key:toggle,label:toggle,value:props[toggle],onChange:v=>set(toggle,v)}),h(IconSwap,{key:swap,label:swap+' (instance swap)',value:props[swap],onChange:v=>set(swap,v)})])),
   h(Source,{spec:contract.button,variant}),h(Modes),
   h('h3',{className:'story-title'},'All 24 Figma variants'),h('p',{className:'drawer-intro'},'These are the combinations defined in Figma. Disabled variants clear Hover and Pressed; Pressed variants also have Hover enabled.'),
   h('div',{className:'story-grid figma-stories'},...contract.button.variants.map(v=>h(Frame,{key:v.id,name:v.name},h(Button,{...v.properties,Button:'Button',interactive:false})))),
   h('h3',{className:'story-title'},'Exact property contract'),h('pre',{className:'code-block'},JSON.stringify(props,null,2)));
}
export function InputBoard(){
 const [props,setProps]=useState({Hover:false,Typing:false,Error:false,Typed:false,Active:true,Label:true,label:'Label',input:'Placeholder','Leading Icon':true,'Tailing Icon':true,'leading-icon':'supervised_user_circle','tailing-icon':'date_range',Button:false,'Focus Ring':false}),[live,setLive]=useState(true),[swap,setSwap]=useState('Button'),[value,setValue]=useState(''),[nestedType,setNestedType]=useState('Primary');
 const set=(key,v)=>setProps(p=>({...p,[key]:v}));
 const nested=swap==='Button'?h(Button,{Type:nestedType,Size:'Small'}):h('select',{'aria-label':'Nested dropdown','data-ba-component':'InputField',defaultValue:'Option 1'},['Option 1','Option 2','Option 3'].map(v=>h('option',{key:v},v)));
 return h(React.Fragment,null,h('p',{className:'drawer-intro'},'All eight Figma field states, the original Label → Input Container → Input structure, two independent icon swaps, Focus Ring, and the separate nested Button slot.'),
   h('div',{className:'demo-stage figma-demo'},h(InputField,{...props,button:nested,value,onChange:e=>setValue(e.target.value),interactive:live})),
   h('p',{className:'live-note','aria-live':'polite'},value?`${value.length} characters entered`:'Type in the field, or switch off live interaction to inspect a state.'),
   h('div',{className:'controls'},h('h3',{className:'story-title'},'Component properties'),h(Toggle,{label:'Live interaction',value:live,onChange:setLive}),
    ...['Hover','Typing','Error','Typed','Active'].map(key=>h(Toggle,{key,label:key,value:props[key],onChange:v=>set(key,v)})),
    h(Toggle,{label:'Label',value:props.Label,onChange:v=>set('Label',v)}),h(Text,{label:'label',value:props.label,onChange:v=>set('label',v)}),h(Text,{label:'input',value:props.input,onChange:v=>set('input',v)}),
    ...[['Leading Icon','leading-icon'],['Tailing Icon','tailing-icon']].flatMap(([toggle,prop])=>[h(Toggle,{key:toggle,label:toggle,value:props[toggle],onChange:v=>set(toggle,v)}),h(IconSwap,{key:prop,label:prop+' (instance swap)',value:props[prop],onChange:v=>set(prop,v)})]),
    h(Toggle,{label:'Button',value:props.Button,onChange:v=>set('Button',v)}),h(Choice,{label:'button (instance swap)',value:swap,options:['Button','Dropdown'],onChange:setSwap}),props.Button&&swap==='Button'&&h(Choice,{label:'Nested Button / Type',value:nestedType,options:['Primary','Default','Ghost'],onChange:setNestedType}),h(Toggle,{label:'Focus Ring',value:props['Focus Ring'],onChange:v=>set('Focus Ring',v)})),
    h(Source,{spec:contract.input,variant:resolveInput(props)}),h('p',{className:'variant-note'},'Source binding: Figma also uses Leading Icon to control visibility of the nested Button instance. This behavior is retained here. Focus Ring is present in the resting variant only.'),h(Modes),
    h('h3',{className:'story-title'},'All eight Figma variants'),h('p',{className:'drawer-intro'},'Active=False uses the unavailable variant. Error takes precedence over Typing and Hover; Typed includes Typing, as defined in the source set.'),
    h('div',{className:'story-grid figma-stories'},...contract.input.variants.map(v=>h(Frame,{key:v.id,name:v.name},h(InputField,{...v.properties,interactive:false})))),
    h('h3',{className:'story-title'},'Exact property contract'),h('pre',{className:'code-block'},JSON.stringify(props,null,2)));
}
