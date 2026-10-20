import * as React from 'https://esm.sh/react@19.1.0';
import {createRoot} from 'https://esm.sh/react-dom@19.1.0/client?deps=react@19.1.0';
import {createReactComponents} from './dist/browser-components.mjs';
import {ButtonBoard,InputBoard,Button as FigmaButton,InputField as FigmaInputField} from './figma-playgrounds.mjs';
const {createElement:h,useState,useEffect,useRef}=React;
const {Button,IconButton,InputField,Display}=createReactComponents(React);
const icon=name=>h('span',{className:'icon','aria-hidden':true},name);
const source='https://github.com/shubhamarya-uxnai/BA-Design-Sytem';
function ComponentCard({kind,index,onOpen}){
  const [count,setCount]=useState(0);
  return h('article',{className:'component-card'},
    h('div',{className:'card-top'},h('span',{className:'card-number'},`0${index}`),h('span',null,'Interactive preview')),
    h('div',{className:'card-stage'+(kind==='Input Field'?' field-stage':'')},kind==='Button'?h(React.Fragment,null,...['Primary','Default','Ghost'].map(Type=>h(FigmaButton,{key:Type,Type,Button:'Button',onClick:()=>setCount(n=>n+1)}))):h(FigmaInputField,{id:'card-input'})),
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
