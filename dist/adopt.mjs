// One central React runtime; applications import only this URL.
import * as React from 'https://esm.sh/react@19.1.0';
import {createRoot} from 'https://esm.sh/react-dom@19.1.0/client?deps=react@19.1.0';
import {createReactComponents, collectComponents} from './browser-components.mjs';
const components = createReactComponents(React);
const host = document.createElement('div');
host.hidden = true;
host.dataset.baRuntime = '0.2.0';
document.body.append(host);
const root = createRoot(host);
const ids = new WeakMap(); let nextId=0;
function update(){
  const entries=collectComponents(document);
  root.render(React.createElement(React.Fragment,null,...entries.map(({target,name,props})=>{
    if(!ids.has(target))ids.set(target,++nextId);
    return React.createElement(components[name],{key:ids.get(target),target,...props});
  })));
}
let queued=false;
const observer=new MutationObserver(()=>{
  if(queued)return;queued=true;
  requestAnimationFrame(()=>{queued=false;update()});
});
observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-type','data-fill','data-size','aria-pressed']});
update();
