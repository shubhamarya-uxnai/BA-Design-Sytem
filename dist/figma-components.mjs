let contract;
if (typeof window !== 'undefined') {
  contract = await fetch(new URL('./figma-contract.json', import.meta.url)).then(r => {
    if (!r.ok) throw Error('Figma component contract unavailable');
    return r.json();
  });
} else {
  try {
    const fsMod = 'node:' + 'fs';
    const urlMod = 'node:' + 'url';
    const fs = await import(fsMod);
    const { fileURLToPath } = await import(urlMod);
    contract = JSON.parse(fs.readFileSync(fileURLToPath(new URL('./figma-contract.json', import.meta.url)), 'utf8'));
  } catch {
    contract = await fetch(new URL('./figma-contract.json', import.meta.url)).then(r => r.json());
  }
}
export { contract };
const bool=v=>v===true||v==='True'||v==='true';
export function resolveButton(props={}){
 const Enabled=props.Enabled===undefined?true:bool(props.Enabled),Pressed=Enabled&&bool(props.Pressed),Hover=Enabled&&(Pressed||bool(props.Hover));
 const properties={Type:props.Type||'Primary',Size:props.Size||'Large',Enabled:String(Enabled),Pressed:String(Pressed),Hover:String(Hover)};
 return contract.button.variants.find(v=>Object.entries(v.properties).every(([k,val])=>val.toLowerCase()===String(properties[k]).toLowerCase()));
}
export function resolveIconButton(props={}){
 const Enabled=props.Enabled===undefined?true:bool(props.Enabled),Pressed=Enabled&&bool(props.Pressed),Hover=Enabled&&(Pressed||bool(props.Hover));
 const properties={Type:props.Type||'Primary',Size:props.Size||'Large',Inverse:'False',Enabled:String(Enabled),Pressed:String(Pressed),Hover:String(Hover)};
 return contract.iconButton.variants.find(v=>Object.entries(v.properties).every(([k,val])=>val.toLowerCase()===String(properties[k]).toLowerCase()));
}
export function resolveInput(props={}){
 const Active=props.Active===undefined?true:bool(props.Active),Error=Active&&bool(props.Error),Typed=Active&&!Error&&bool(props.Typed),Typing=Active&&!Error&&(Typed||bool(props.Typing)),Hover=Active&&!Error&&bool(props.Hover);
 const properties={Active,Error,Typed,Typing,Hover};
 return contract.input.variants.find(v=>Object.entries(v.properties).every(([k,val])=>bool(val)===properties[k]));
}
export function createFigmaComponents(React){
 const {createElement:h,useState,useId}=React;
 function Icon({name,side,iconSet='symbols',fill,weight,grade,opsz}){
   const fontClass=iconSet==='classic'?'material-icons':'material-symbols-rounded';
   const style=iconSet==='classic'?undefined:{fontVariationSettings:`'FILL' ${fill??0}, 'wght' ${weight??400}, 'GRAD' ${grade??0}, 'opsz' ${opsz??24}`};
   return h('span',{className:'figma-icon figma-icon--'+side,'aria-hidden':true},typeof name==='string'?h('span',{className:fontClass,style},name):name)
 }
 function Button(props){
   const [hover,setHover]=useState(false),[pressed,setPressed]=useState(false);
   const enabled=props.Enabled===undefined?true:bool(props.Enabled),live=props.interactive!==false;
   const variant=resolveButton({...props,Hover:live?(hover||bool(props.Hover)):props.Hover,Pressed:live?(pressed||bool(props.Pressed)):props.Pressed});
   if(!variant)throw Error('Button properties do not identify a Figma variant');
   const leading=props['Leading Icon']===undefined?true:bool(props['Leading Icon']),trailing=props['Tailing Icon']===undefined?true:bool(props['Tailing Icon']);
   const label=props.Button??props.children??'Button';
   return h('button',{id:props.id,className:'figma-button '+(props.className||''),type:props.htmlType||'button',disabled:!enabled,'data-figma-variant':variant.id,'data-figma-hover':bool(variant.properties.Hover),'data-figma-pressed':bool(variant.properties.Pressed),'data-default-label':label==='Button','data-focus-ring':bool(props['Focus Ring']),'aria-label':props['aria-label'],onClick:props.onClick,onPointerEnter:()=>{setHover(true);props.onMouseEnter?.()},onPointerLeave:()=>{setHover(false);setPressed(false);props.onMouseLeave?.()},onPointerDown:e=>{setPressed(true);props.onMouseDown?.(e)},onPointerUp:e=>{setPressed(false);props.onMouseUp?.(e)},onPointerCancel:()=>setPressed(false),onBlur:e=>{setPressed(false);props.onBlur?.(e)},onFocus:props.onFocus,onKeyDown:e=>{if(e.key===' '||e.key==='Enter')setPressed(true);props.onKeyDown?.(e)},onKeyUp:e=>{setPressed(false);props.onKeyUp?.(e)},title:props.title},
     leading&&h(Icon,{name:props['leading-icon']??'download',side:'leading',iconSet:props.iconSet,fill:props.iconFill,weight:props.iconWeight,grade:props.iconGrade,opsz:props.iconOpticalSize}),h('span',{className:'figma-label'},label),trailing&&h(Icon,{name:props['tailing-icon']??'business',side:'trailing',iconSet:props.iconSet,fill:props.iconFill,weight:props.iconWeight,grade:props.iconGrade,opsz:props.iconOpticalSize}),bool(variant.properties.Hover)&&h('span',{className:'figma-overlay','data-layer':'hover-pressed'}),h('span',{className:'figma-focus'}));
 }
 function IconButton(props){
   const [hover,setHover]=useState(false),[pressed,setPressed]=useState(false);
   const enabled=props.Enabled===undefined?true:bool(props.Enabled),live=props.interactive!==false;
   const variant=resolveIconButton({...props,Hover:live?(hover||bool(props.Hover)):props.Hover,Pressed:live?(pressed||bool(props.Pressed)):props.Pressed});
   if(!variant)throw Error('Icon Button properties do not identify a Figma variant');
   const icon=props.icon??'brightness_medium',showIcon=props.Icon===undefined?true:bool(props.Icon);
   const actionName=typeof icon==='string'?icon.replaceAll('_',' '):'Icon action';
   return h('button',{id:props.id,className:'figma-icon-button '+(props.className||''),type:props.htmlType||'button',disabled:!enabled,'data-figma-variant':variant.id,'data-figma-hover':bool(variant.properties.Hover),'data-figma-pressed':bool(variant.properties.Pressed),'data-focus-ring':bool(props.Focus),'aria-label':props['aria-label']??actionName,onClick:props.onClick,onPointerEnter:()=>{setHover(true);props.onMouseEnter?.()},onPointerLeave:()=>{setHover(false);setPressed(false);props.onMouseLeave?.()},onPointerDown:e=>{setPressed(true);props.onMouseDown?.(e)},onPointerUp:e=>{setPressed(false);props.onMouseUp?.(e)},onPointerCancel:()=>setPressed(false),onBlur:e=>{setPressed(false);props.onBlur?.(e)},onFocus:props.onFocus,onKeyDown:e=>{if(e.key===' '||e.key==='Enter')setPressed(true);props.onKeyDown?.(e)},onKeyUp:e=>{setPressed(false);props.onKeyUp?.(e)},title:props.title},
     showIcon&&(icon==='brightness_medium'?h('span',{className:'figma-icon figma-icon-button__default-icon','aria-hidden':true}):h(Icon,{name:icon,side:'leading',iconSet:props.iconSet,fill:props.iconFill,weight:props.iconWeight,grade:props.iconGrade,opsz:props.iconOpticalSize})),bool(variant.properties.Hover)&&h('span',{className:'figma-overlay','data-layer':'hover-pressed'}),h('span',{className:'figma-focus'}));
 }
 function Chip(props){
   const Type=props.Type??'Primary',Style=props.Style??'Filled',showIcon=props.Icon===undefined?true:bool(props.Icon);
   const icon=props.icon;
   return h('span',{className:'figma-chip '+(props.className||''),'data-type':Type,'data-style':Style},
     showIcon&&(icon==null?h('span',{className:'figma-chip__icon figma-chip__icon--asset','aria-hidden':true}):h('span',{className:'figma-chip__icon','aria-hidden':true},h(Icon,{name:icon,side:'leading',iconSet:props.iconSet,fill:props.iconFill,weight:props.iconWeight,grade:props.iconGrade,opsz:props.iconOpticalSize}))),
     h('span',null,props.chip??'Chip'));
 }
 function Selection(props){
   const [internalChecked,setInternalChecked]=useState(false),[hover,setHover]=useState(false);
   const Type=props.Type??'Checkbox',Active=props.Active===undefined?true:bool(props.Active),Checked=props.Checked===undefined?internalChecked:bool(props.Checked),Hover=Active&&(bool(props.Hover)||hover);
   const nativeType=Type==='Radio'?'radio':'checkbox';
   return h('label',{className:'figma-selection '+(props.className||''),'data-type':Type,'data-active':Active,'data-checked':Checked,'data-hover':Hover,'data-focus':bool(props.Focus),onPointerEnter:()=>setHover(true),onPointerLeave:()=>setHover(false)},
     h('input',{className:'figma-selection__native',type:nativeType,role:Type==='Toggle'?'switch':undefined,name:props.name,value:props.value,checked:Checked,disabled:!Active,'aria-label':props.showLabel===false?(props['aria-label']??props.label??'Selection'):undefined,onChange:e=>{if(props.Checked===undefined)setInternalChecked(e.target.checked);props.onCheckedChange?.(e.target.checked);props.onChange?.(e)}}),
     h('span',{className:'figma-selection__hit','aria-hidden':true},Type==='Toggle'?h('span',{className:'figma-selection__track'}):h('span',{className:'figma-selection__control'})),
     props.showLabel!==false&&h('span',{className:'figma-selection__label'},props.label??'Label'));
 }
 function InputField(props){
   const generatedId=useId(),id=props.id||generatedId;
   const [hover,setHover]=useState(false),[focused,setFocused]=useState(false),[text,setText]=useState('');
   const active=props.Active===undefined?true:bool(props.Active),live=props.interactive!==false;
   const value=props.value===undefined?text:props.value;
   const variant=resolveInput({...props,Hover:live?(hover||bool(props.Hover)):props.Hover,Typing:live?(focused||!!value||bool(props.Typing)):props.Typing,Typed:live?(!!value||bool(props.Typed)):props.Typed});
   const showLabel=props.Label===undefined?true:bool(props.Label),leading=props['Leading Icon']===undefined?true:bool(props['Leading Icon']),trailing=props['Tailing Icon']===undefined?true:bool(props['Tailing Icon']);
   const button=bool(props.Button),buttonNode=props.button??h(Button,{Size:'Small'});
   return h('div',{className:'figma-input '+(button?'figma-input--with-button ':'')+(props.className||''),'data-figma-variant':variant.id,'data-focus-ring':bool(props['Focus Ring']),onPointerEnter:()=>setHover(true),onPointerLeave:()=>setHover(false)},
     showLabel&&h('label',{className:'figma-input__label',htmlFor:id},props.label??'Label'),
     h('div',{className:'figma-input__shell'},variant.focusRing&&h('span',{className:'figma-focus'}),bool(variant.properties.Hover)&&h('span',{className:'figma-overlay'}),
         h('div',{className:'figma-input__control'},leading&&h(Icon,{name:props['leading-icon']??'supervised_user_circle',side:'leading',iconSet:props.iconSet,fill:props.iconFill,weight:props.iconWeight,grade:props.iconGrade,opsz:props.iconOpticalSize}),
         h('input',{id,className:'figma-input__input',value,placeholder:props.input??'Placeholder',disabled:!active,'aria-label':showLabel?undefined:(props['aria-label']??props.label??'Input'),'aria-invalid':bool(props.Error)||undefined,onChange:e=>{setText(e.target.value);props.onChange?.(e)},onFocus:e=>{setFocused(true);props.onFocus?.(e)},onBlur:e=>{setFocused(false);props.onBlur?.(e)},onKeyDown:props.onKeyDown,onKeyUp:props.onKeyUp}),
         trailing&&h(Icon,{name:props['tailing-icon']??'date_range',side:'trailing',iconSet:props.iconSet,fill:props.iconFill,weight:props.iconWeight,grade:props.iconGrade,opsz:props.iconOpticalSize})),button&&h('div',{className:'figma-input__action'},leading&&buttonNode)));
 }
 function ProgressBar(props){
   const Type=props.Type??props.type??'Not Started';
   const showLegend=props.Legend!==undefined?bool(props.Legend):(props.legend!==undefined?bool(props.legend):true);
   const standardValues={'Not Started':0,'In Progress':30,'Error':30,'Warning':30,'Success':100};
   const val=props.value!==undefined?Number(props.value):(standardValues[Type]??0);
   const pct=Type==='Not Started'?0:Type==='Success'?100:val;
   const fillWidth=Type==='Not Started'?'8px':`${Math.min(100,Math.max(0,val))}%`;
   return h('div',{className:'figma-progress-bar '+(props.className||''),'data-type':Type,role:'progressbar','aria-valuenow':val,'aria-valuemin':0,'aria-valuemax':100,style:props.style},
     h('div',{className:'figma-progress-bar__track-container'},
       h('div',{className:'figma-progress-bar__track'},
         h('div',{className:'figma-progress-bar__fill',style:{width:fillWidth}}))),
     showLegend&&h('div',{className:'figma-progress-bar__legend'},
       h('span',null,`${pct}%`),
       Type==='Error'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--error'},h(Icon,{name:'error_outline',iconSet:props.iconSet})),
       Type==='Warning'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--warning'},h(Icon,{name:'warning_amber',iconSet:props.iconSet})),
       Type==='Success'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--success'},h(Icon,{name:'check_circle',iconSet:props.iconSet}))));
 }
 function ProgressPie(props){
   const Type=props.Type??props.type??'Not Started';
   const showLegend=props.Legend!==undefined?bool(props.Legend):(props.legend!==undefined?bool(props.legend):true);
   const standardValues={'Not Started':0,'In Progress':32,'Error':32,'Warning':32,'Success':100};
   const val=props.value!==undefined?Number(props.value):(standardValues[Type]??0);
   const pct=Type==='Not Started'?0:Type==='Success'?100:val;
   const fillColors={'Not Started':'var(--va-semantic-color-tokens-border-subtle, #b7aa9d)','In Progress':'var(--va-semantic-color-tokens-status-info-fill, #6f2ee1)','Error':'var(--va-semantic-color-tokens-status-error-fill, #bc0016)','Warning':'var(--va-semantic-color-tokens-status-warning-fill, #a53800)','Success':'var(--va-semantic-color-tokens-status-success-fill, #006c2c)'};
   const trackColors={'Error':'var(--va-semantic-color-tokens-status-error-surface, #fff8f8)','Warning':'var(--va-semantic-color-tokens-status-warning-surface, #fff8f0)','Success':'var(--va-semantic-color-tokens-status-success-surface, #f0fdf4)','In Progress':'var(--va-semantic-color-tokens-background-neutral-default, #fbf9f7)','Not Started':'var(--va-semantic-color-tokens-background-neutral-default, #fbf9f7)'};
   const fillColor=fillColors[Type]||fillColors['In Progress'],trackColor=trackColors[Type]||trackColors['In Progress'];
   const degrees=pct*3.6;
   const conic=Type==='Success'?fillColor:Type==='Not Started'?trackColor:`conic-gradient(from -90deg, ${fillColor} 0deg ${degrees}deg, ${trackColor} ${degrees}deg 360deg)`;
   return h('div',{className:'figma-progress-pie '+(props.className||''),'data-type':Type,role:'progressbar','aria-valuenow':val,'aria-valuemin':0,'aria-valuemax':100,style:props.style},
     h('div',{className:'figma-progress-pie__visual',style:{background:conic,border:'0.4px solid var(--va-semantic-color-tokens-border-subtle, #b7aa9d)'}}),
     showLegend&&h('div',{className:'figma-progress-pie__legend'},
       Type==='Error'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--error'},h(Icon,{name:'error_outline',iconSet:props.iconSet})),
       Type==='Warning'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--warning'},h(Icon,{name:'warning_amber',iconSet:props.iconSet})),
       h('span',null,`${pct}%`)));
 }
 function ProgressDonut(props){
   const Type=props.Type??props.type??'Not Started';
   const showLegend=props.Legend!==undefined?bool(props.Legend):(props.legend!==undefined?bool(props.legend):true);
   const standardValues={'Not Started':0,'In Progress':32,'Error':32,'Warning':32,'Success':100};
   const val=props.value!==undefined?Number(props.value):(standardValues[Type]??0);
   const pct=Type==='Not Started'?0:Type==='Success'?100:val;
   const r=19,circumference=2*Math.PI*r,offset=circumference*(1-pct/100);
   const fillColors={'Not Started':'transparent','In Progress':'var(--va-semantic-color-tokens-status-info-fill, #6f2ee1)','Error':'var(--va-semantic-color-tokens-status-error-fill, #bc0016)','Warning':'var(--va-semantic-color-tokens-status-warning-fill, #a53800)','Success':'var(--va-semantic-color-tokens-status-success-fill, #006c2c)'};
   const trackColors={'Error':'var(--va-semantic-color-tokens-status-error-surface, #fff8f8)','Warning':'var(--va-semantic-color-tokens-status-warning-surface, #fff8f0)','Success':'var(--va-semantic-color-tokens-status-success-surface, #f0fdf4)','In Progress':'#e8e2dc','Not Started':'#e8e2dc'};
   return h('div',{className:'figma-progress-donut '+(props.className||''),'data-type':Type,role:'progressbar','aria-valuenow':val,'aria-valuemin':0,'aria-valuemax':100,style:props.style},
     h('svg',{className:'figma-progress-donut__svg',viewBox:'0 0 48 48'},
       h('circle',{cx:24,cy:24,r,fill:'none',stroke:trackColors[Type]||'#e8e2dc',strokeWidth:4.5}),
       pct>0&&h('circle',{cx:24,cy:24,r,fill:'none',stroke:fillColors[Type]||fillColors['In Progress'],strokeWidth:4.5,strokeDasharray:circumference,strokeDashoffset:offset,strokeLinecap:'round'})),
     showLegend&&h('div',{className:'figma-progress-donut__center'},
       Type==='Error'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--error'},h(Icon,{name:'error_outline',iconSet:props.iconSet})),
       Type==='Warning'&&h('span',{className:'figma-progress-status-icon figma-progress-status-icon--warning'},h(Icon,{name:'warning_amber',iconSet:props.iconSet})),
       h('span',null,`${pct}%`)));
 }
 function Loader(props){
   const Type=props.Type??props.type??'Circular';
   if(Type==='Circular'){
     return h('div',{className:'figma-loader figma-loader--circular '+(props.className||''),style:props.style,role:'status','aria-label':'Loading'},
       h('svg',{className:'figma-loader__spinner',viewBox:'0 0 48 48'},
         h('circle',{cx:24,cy:24,r:19,fill:'none',stroke:'var(--va-semantic-color-tokens-border-subtle, #e8e2dc)',strokeWidth:4}),
         h('circle',{cx:24,cy:24,r:19,fill:'none',stroke:'var(--va-semantic-color-tokens-border-primary, #3b672d)',strokeWidth:4,strokeDasharray:'119.38',strokeDashoffset:'80',strokeLinecap:'round'})));
   }
   if(Type==='Bar'){
     return h('div',{className:'figma-loader figma-loader--bar '+(props.className||''),style:props.style,role:'status','aria-label':'Loading'},
       h('div',{className:'figma-loader__bar-indicator'}));
   }
   return h('div',{className:'figma-loader figma-loader--skeleton '+(props.className||''),style:props.style,role:'status','aria-label':'Loading content'});
 }
 function SegmentedChild(props){
   const Type=props.Type??props.type??'Default';
   const showDesc=props.Description!==undefined?bool(props.Description):(props.description!==undefined?bool(props.description):true);
   const showIcon=props.Icon!==undefined?bool(props.Icon):(props.icon!==undefined?bool(props.icon):true);
   const title=props.title??'Title',body=props.body??'Body';
   const iconNode=props.iconNode??(typeof props.icon==='object'?props.icon:null);
   return h('div',{className:'figma-segmented-child '+(props.className||''),'data-type':Type,'data-description':showDesc,style:props.style,onClick:props.onClick},
     h('div',{className:'figma-segmented-child__header'},
       showIcon&&h('div',{className:'figma-segmented-child__icon-wrapper'},
         iconNode||h(Icon,{name:'home',side:'leading',iconSet:props.iconSet}),
         Type==='Error'&&h('span',{className:'figma-segmented-child__badge figma-progress-status-icon--error'},h(Icon,{name:'error',iconSet:props.iconSet})),
         Type==='Warning'&&h('span',{className:'figma-segmented-child__badge figma-progress-status-icon--warning'},h(Icon,{name:'warning',iconSet:props.iconSet}))),
       h('div',{className:'figma-segmented-child__details'},
         h('p',{className:'figma-segmented-child__title'},title),
         showDesc&&h('p',{className:'figma-segmented-child__body'},body))),
     h('div',{className:'figma-segmented-child__progress'}));
 }
 function StepperChild(props){
   const Type=props.Type??props.type??'Default';
   const showDesc=props.Description!==undefined?bool(props.Description):(props.description!==undefined?bool(props.description):true);
   const showIcon=props.Icon!==undefined?bool(props.Icon):(props.icon!==undefined?bool(props.icon):true);
   const title=props.title??'Title',body=props.body??'Body';
   const slotVisible=props.slotVisible!==undefined?bool(props.slotVisible):!!props.children;
   const iconNode=props.iconNode??(typeof props.icon==='object'?props.icon:null);
   return h('div',{className:'figma-stepper-child '+(props.className||''),'data-type':Type,'data-description':showDesc,style:props.style,onClick:props.onClick},
     h('div',{className:'figma-stepper-child__track'}),
     h('div',{className:'figma-stepper-child__content'},
       h('div',{className:'figma-stepper-child__header'},
         showIcon&&h('div',{className:'figma-stepper-child__icon-wrapper'},
           iconNode||h(Icon,{name:'home',side:'leading',iconSet:props.iconSet}),
           Type==='Error'&&h('span',{className:'figma-stepper-child__badge figma-progress-status-icon--error'},h(Icon,{name:'error',iconSet:props.iconSet})),
           Type==='Warning'&&h('span',{className:'figma-stepper-child__badge figma-progress-status-icon--warning'},h(Icon,{name:'warning',iconSet:props.iconSet}))),
         h('div',{className:'figma-stepper-child__details'},
           h('p',{className:'figma-stepper-child__title'},title),
           showDesc&&h('p',{className:'figma-stepper-child__body'},body))),
       slotVisible&&props.children&&h('div',{className:'figma-stepper-child__slot'},props.children)));
 }
 function SegmentedProgress(props){
   return h('div',{className:'figma-segmented-progress '+(props.className||''),role:'group',style:props.style},props.children);
 }
 function Stepper(props){
   return h('div',{className:'figma-stepper '+(props.className||''),role:'list',style:props.style},props.children);
 }
 return {Button,IconButton,Chip,Selection,InputField,Icon,ProgressBar,ProgressPie,ProgressDonut,Loader,Loaders:Loader,SegmentedChild,StepperChild,SegmentedProgress,Stepper};
}
