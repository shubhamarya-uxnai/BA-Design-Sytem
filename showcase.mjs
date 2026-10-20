import * as React from 'https://esm.sh/react@19.1.0';
import {createRoot} from 'https://esm.sh/react-dom@19.1.0/client?deps=react@19.1.0';
import {createReactComponents} from './dist/browser-components.mjs';
const {createElement:h,useState,useEffect,useRef}=React;
const {Button,IconButton,InputField,Display}=createReactComponents(React);
const icon=name=>h('span',{className:'icon','aria-hidden':true},name);
const source='https://github.com/shubhamarya-uxnai/BA-Design-Sytem';
function Select({label,value,onChange,values}){return h('label',{className:'control-row'},label,h('select',{'aria-label':label,'data-ba-component':'InputField',value,onChange:e=>onChange(e.target.value)},values.map(v=>h('option',{key:v,value:v},v[0].toUpperCase()+v.slice(1)))))}
function Toggle({label,value,onChange}){return h('label',{className:'control-row'},label,h('input',{type:'checkbox',checked:value,onChange:e=>onChange(e.target.checked)}))}
function Story({label,children}){return h('div',{className:'story-cell'},children,h('small',null,label))}
function ButtonBoard(){
  const [variant,setVariant]=useState('filled'),[tone,setTone]=useState('primary'),[size,setSize]=useState('large'),[disabled,setDisabled]=useState(false),[withIcon,setWithIcon]=useState(true),[count,setCount]=useState(0);
  const click=()=>setCount(n=>n+1);
  return h(React.Fragment,null,
    h('p',{className:'drawer-intro'},'A clear action, in every state. Hover, press, or tab to focus the live button. Change its properties below.'),
    h('div',{className:'demo-stage'},h(Button,{variant,tone,size,disabled,onClick:click},withIcon&&icon('add'),'Create something')),
    h('p',{className:'live-note','aria-live':'polite'},count?`${count} ${count===1?'interaction':'interactions'} recorded.`:'Ready when you are.'),
    h('div',{className:'controls'},h(Select,{label:'Variant',value:variant,onChange:setVariant,values:['filled','ghost']}),h(Select,{label:'Tone',value:tone,onChange:setTone,values:['primary','secondary','neutral']}),h(Select,{label:'Size',value:size,onChange:setSize,values:['small','large']}),h(Toggle,{label:'Leading Material icon',value:withIcon,onChange:setWithIcon}),h(Toggle,{label:'Disabled',value:disabled,onChange:setDisabled})),
    h('h3',{className:'story-title'},'State storyboard'),
    h('div',{className:'story-grid'},
      h(Story,{label:'Default · filled'},h(Button,{variant:'filled',tone,onClick:click},'Continue')),
      h(Story,{label:'Hover this · ghost'},h(Button,{variant:'ghost',tone,onClick:click},'Explore')),
      h(Story,{label:'Press and hold'},h(Button,{variant:'filled',tone,onClick:click},'Press me')),
      h(Story,{label:'Disabled'},h(Button,{variant:'filled',tone,disabled:true},'Unavailable')),
      h(Story,{label:'Keyboard focus · Tab to reach'},h(Button,{variant:'ghost',tone,onClick:click},'Focus me')),
      h(Story,{label:'Icon button'},h(IconButton,{'aria-label':'Add item',onClick:click},icon('add')))),
    h('h3',{className:'story-title'},'Use the component'),h('pre',{className:'code-block'},`<Button variant="${variant}" tone="${tone}" size="${size}"${disabled?' disabled':''}>\n  Create something\n</Button>`));
}
function InputBoard(){
  const [value,setValue]=useState(''),[invalid,setInvalid]=useState(false),[disabled,setDisabled]=useState(false),[leading,setLeading]=useState(true),[trailing,setTrailing]=useState(false),[action,setAction]=useState('button'),[country,setCountry]=useState('IN'),[message,setMessage]=useState('');
  const actionNode=action==='button'?h(Button,{variant:'ghost',disabled,onClick:()=>setMessage(value?`Submitted: ${value}`:'Enter something first.')},'Apply'):action==='dropdown'?h('select',{'aria-label':'Region',value:country,disabled,onChange:e=>setCountry(e.target.value),'data-ba-component':'InputField'},['IN','US','UK'].map(v=>h('option',{key:v},v))):null;
  return h(React.Fragment,null,
    h('p',{className:'drawer-intro'},'Compose the field around your task. Leading and trailing icons are independent of the action slot, which can hold a button or a dropdown.'),
    h('div',{className:'demo-stage'},h(InputField,{id:'playground-field',label:'Your input',placeholder:'Start typing…',value,onChange:e=>setValue(e.target.value),invalid,disabled,leading:leading&&icon('search'),trailing:trailing&&icon('check'),action:actionNode,message:invalid?'Check this value and try again.':' '})),
    h('p',{className:'live-note','aria-live':'polite'},message||`${value.length} characters · Region ${country}`),
    h('div',{className:'controls'},h(Select,{label:'Action slot',value:action,onChange:setAction,values:['none','button','dropdown']}),h(Toggle,{label:'Leading icon',value:leading,onChange:setLeading}),h(Toggle,{label:'Trailing icon',value:trailing,onChange:setTrailing}),h(Toggle,{label:'Error state',value:invalid,onChange:setInvalid}),h(Toggle,{label:'Disabled',value:disabled,onChange:setDisabled})),
    h('h3',{className:'story-title'},'State storyboard'),
    h('div',{className:'story-grid'},h(Story,{label:'Default · type or focus'},h(InputField,{id:'story-default','aria-label':'Default field',placeholder:'Type something'})),h(Story,{label:'Typed'},h(InputField,{id:'story-typed','aria-label':'Typed field',defaultValue:'A little progress'})),h(Story,{label:'Error'},h(InputField,{id:'story-error','aria-label':'Error field',invalid:true,defaultValue:'Needs a second look',message:'Please check this value.'})),h(Story,{label:'Disabled'},h(InputField,{id:'story-disabled','aria-label':'Disabled field',disabled:true,placeholder:'Unavailable'}))),
    h('h3',{className:'story-title'},'Use the component'),h('pre',{className:'code-block'},`<InputField\n  id="query" label="Your input"\n  leading={<Icon name="search" />}\n  action={${action==='button'?'<Button>Apply</Button>':action==='dropdown'?'<select aria-label="Region">…</select>':'null'}}\n/>`));
}
function ComponentCard({kind,index,onOpen}){
  const [count,setCount]=useState(0);
  return h('article',{className:'component-card'},
    h('div',{className:'card-top'},h('span',{className:'card-number'},`0${index}`),h('span',null,'Interactive preview')),
    h('div',{className:'card-stage'+(kind==='Input Field'?' field-stage':'')},kind==='Button'?h(React.Fragment,null,h(Button,{variant:'filled',tone:'primary',size:'large',onClick:()=>setCount(n=>n+1)},'Make it happen',icon('arrow_forward')),h(Button,{variant:'ghost',size:'large',onClick:()=>setCount(n=>n+1)},'Or explore')):h(InputField,{id:'card-input',label:'A place for your ideas',placeholder:'Something worth building…',leading:icon('edit'),action:h(IconButton,{'aria-label':'Submit preview input',onClick:()=>setCount(n=>n+1)},icon('arrow_forward'))})),
    h('div',{className:'card-footer'},h('div',null,h('h3',null,kind),h('p',null,kind==='Button'?'Actions with purpose.':'Room for your next thought.')),h('span',{'aria-live':'polite',className:'card-number'},count?`${count} clicks`:'↗')),
    h('div',{className:'open-drawer'},h('div',null,h('div',{className:'open-row'},h('span',null,'Variants, states & composition'),h('button',{className:'open-trigger',onClick:()=>onOpen(kind),'aria-label':`Open ${kind} playground`},'Open '+kind,icon('arrow_forward'))))));
}
function App(){
  const [active,setActive]=useState(null),[dark,setDark]=useState(false);const dialog=useRef(null);
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark]);
  useEffect(()=>{if(active&&!dialog.current.open)dialog.current.showModal();else if(!active&&dialog.current.open)dialog.current.close()},[active]);
  return h(React.Fragment,null,
    h('header',{className:'site-header'},h('a',{className:'wordmark',href:'./','aria-label':'BA Design System home'},h('span',{className:'monogram'},'ba'),h('span',null,'BA Design System')),h('nav',{className:'nav-links','aria-label':'Main navigation'},h('a',{href:'#components'},'Components'),h('a',{className:'nav-source',href:source,target:'_blank',rel:'noreferrer'},'GitHub ↗'),h(IconButton,{'aria-label':dark?'Switch to light mode':'Switch to dark mode',onClick:()=>setDark(v=>!v)},icon(dark?'light_mode':'dark_mode')))),
    h('main',{className:'page-content'},h('section',{className:'hero'},h('div',{className:'eyebrow'},'A shared language for what’s next'),h(Display,null,'Small parts.',h('br'),'Endless possibilities.'),h('p',null,'Thoughtful foundations. Components you can feel. Explore the building blocks of BA, and make them your own.'),h('div',{className:'hero-actions'},h(Button,{variant:'filled',tone:'primary',size:'large',onClick:()=>document.querySelector('#components').scrollIntoView({behavior:'smooth'})},'Explore components',icon('arrow_downward')),h('a',{className:'text-link',href:source,target:'_blank',rel:'noreferrer'},'View source',icon('north_east')))),
      h('section',{id:'components','aria-labelledby':'components-title'},h('div',{className:'section-heading'},h('h2',{id:'components-title'},'The component collection'),h('span',null,'02 components · more to come')),h('div',{className:'component-grid'},h(ComponentCard,{kind:'Button',index:1,onOpen:setActive}),h(ComponentCard,{kind:'Input Field',index:2,onOpen:setActive}))),
      h('footer',{className:'page-footer'},h('span',null,'BA Design System · Built with its own components.'),h('a',{href:source},'One source. Every project. ↗'))),
    h('dialog',{ref:dialog,className:'drawer','aria-labelledby':'playground-title',onCancel:()=>setActive(null),onClose:()=>setActive(null),onClick:e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left)setActive(null)}}},h('div',{className:'drawer-header'},h('div',null,h('small',null,'Component playground'),h('h2',{id:'playground-title'},active)),h(IconButton,{'aria-label':'Close playground',onClick:()=>setActive(null)},icon('close'))),h('div',{className:'drawer-content'},active==='Button'?h(ButtonBoard,{key:'button'}):active==='Input Field'?h(InputBoard,{key:'input'}):null)));
}
createRoot(document.getElementById('root')).render(h(App));
