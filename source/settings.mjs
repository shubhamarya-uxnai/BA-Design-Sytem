// Shared appearance modal for browser tools; opt in using data-ba-settings.
import {adoptComponent} from './browser-components.mjs';
const host=document.querySelector('[data-ba-settings]');
if(host){
  const key='ba.appearance:'+location.pathname;
  const options=[
    ['theme','Theme','dark',[['dark','Dark'],['light','Light']]],
    ['contrast','Contrast','standard',[['standard','Standard'],['medium','Medium'],['high','High']]],
    ['temperature','Colour temperature','cool',[['cool','Cool'],['warm','Warm']]],
    ['text-scale','Text size','1',[['1','1x'],['1.2x','1.2x'],['1.4x','1.4x'],['1.6x','1.6x'],['1.8x','1.8x'],['2x','2x']]],
    ['screen','Screen size','',[['','Automatic'],['mobile','Mobile'],['tablet','Tablet'],['desktop','Desktop']]]
  ];
  let state={};try{state=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{}
  const apply=()=>{for(const [attr,,def] of options){const value=state[attr]??def;if(value)document.documentElement.setAttribute('data-'+attr,value);else document.documentElement.removeAttribute('data-'+attr)}try{localStorage.setItem(key,JSON.stringify(state))}catch{}};
  const button=adoptComponent(document.createElement('button'),'IconButton');
  button.type='button';button.setAttribute('aria-label','Settings');button.setAttribute('aria-haspopup','dialog');button.title='Settings';
  const icon=document.createElement('span');icon.className='material-symbols-rounded';icon.textContent='settings';icon.setAttribute('aria-hidden','true');button.append(icon);host.append(button);
  const dialog=adoptComponent(document.createElement('dialog'),'Surface');dialog.className='ba-settings';dialog.setAttribute('aria-labelledby','ba-settings-title');
  const heading=document.createElement('h2');heading.id='ba-settings-title';heading.textContent='Settings';dialog.append(heading);
  const tabs=document.createElement('div');tabs.className='ba-settings-tabs';
  const appearance=document.createElement('div'),updates=document.createElement('div');
  const selects=[];
  for(const [attr,label,def,values] of options){
    const row=document.createElement('label');row.className='ba-settings-row';row.append(document.createTextNode(label));
    const select=adoptComponent(document.createElement('select'),'InputField');
    select.setAttribute('aria-label',label);
    for(const [value,text]of values)select.add(new Option(text,value));
    select.value=state[attr]??def;select.onchange=()=>{state[attr]=select.value;apply()};row.append(select);appearance.append(row);selects.push([select,attr,def]);
  }
  const reset=adoptComponent(document.createElement('button'),'Button');reset.textContent='Back to the default look';reset.onclick=()=>{state={};apply();for(const [select,,def]of selects)select.value=def};appearance.append(reset);
  const note=document.createElement('p');note.textContent='BA Design System v0.2.1 — shared components, semantic surfaces, The Seasons display font and appearance controls.';updates.append(note);updates.hidden=true;
  for(const [label,panel,other]of [['Appearance',appearance,updates],['Updates',updates,appearance]]){
    const tab=adoptComponent(document.createElement('button'),'Button');tab.textContent=label;tab.setAttribute('aria-pressed',String(panel===appearance));
    tab.onclick=()=>{panel.hidden=false;other.hidden=true;for(const sibling of tabs.children)sibling.setAttribute('aria-pressed',String(sibling===tab))};tabs.append(tab);
  }
  const close=adoptComponent(document.createElement('button'),'Button');close.textContent='Close';close.onclick=()=>dialog.close();
  dialog.append(tabs,appearance,updates,close);document.body.append(dialog);
  button.onclick=()=>dialog.showModal();
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
  dialog.addEventListener('close',()=>button.focus());
  apply();
}
