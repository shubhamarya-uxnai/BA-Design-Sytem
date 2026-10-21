export const contract=await fetch(new URL('./figma-contract.json',import.meta.url)).then(r=>{if(!r.ok)throw Error('Figma component contract unavailable');return r.json()});
const bool=v=>v===true||v==='True'||v==='true';
export function resolveButton(props={}){
 const Enabled=props.Enabled===undefined?true:bool(props.Enabled),Pressed=Enabled&&bool(props.Pressed),Hover=Enabled&&(Pressed||bool(props.Hover));
 const properties={Type:props.Type||'Primary',Size:props.Size||'Large',Enabled:String(Enabled),Pressed:String(Pressed),Hover:String(Hover)};
 return contract.button.variants.find(v=>Object.entries(v.properties).every(([k,val])=>val.toLowerCase()===String(properties[k]).toLowerCase()));
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
 return {Button,InputField,Icon};
}
