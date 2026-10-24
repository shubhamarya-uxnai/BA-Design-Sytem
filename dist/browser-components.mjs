/** Shared component contracts. Consumer tools keep their own layout and behavior. */
export const VERSION = '0.3.0';
export const componentNames = ['Page','Sidebar','Topbar','Surface','Button','IconButton','InputField','Display','ProgressBar','ProgressPie','ProgressDonut','Loader','SegmentedChild','StepperChild'];
export function componentAttributes(name, props = {}) {
  const attrs = {'data-ba-component': name};
  if (name === 'Button' || name === 'IconButton') {
    attrs['data-ba-variant'] = props.variant || 'ghost';
    attrs['data-ba-tone'] = props.tone || 'neutral';
    attrs['data-ba-size'] = props.size || 'small';
  }
  if (name === 'Surface') attrs['data-ba-surface'] = props.surface || 'default';
  if (name === 'ProgressBar' || name === 'ProgressPie' || name === 'ProgressDonut') {
    attrs['data-ba-progress'] = props.progress !== undefined ? String(props.progress) : '0';
    attrs['data-ba-type'] = props.type || 'Default';
  }
  if (name === 'Loader') {
    attrs['data-ba-type'] = props.type || 'Circular';
  }
  if (name === 'SegmentedChild' || name === 'StepperChild') {
    attrs['data-ba-status'] = props.status || 'Default';
  }
  return attrs;
}
export function adoptComponent(element, name, props = {}) {
  for (const [key, value] of Object.entries(componentAttributes(name, props))) {
    if (element.getAttribute(key) !== value) element.setAttribute(key, value);
  }
  return element;
}

/** React is passed in so consumers use a single React instance. */
export function createReactComponents(React) {
  const {createElement: h, useLayoutEffect} = React;
  const make = (name, tag) => function Component({target, children, variant, tone, size, surface, progress, type, status, ...props}) {
    const attrs = componentAttributes(name,{variant,tone,size,surface,progress,type,status});
    useLayoutEffect(() => {
      if (target) adoptComponent(target,name,{variant,tone,size,surface,progress,type,status});
    },[target,variant,tone,size,surface,progress,type,status]);
    // Adoption keeps the original DOM node and its existing application listeners.
    if (target) return null;
    if (name === 'Button' || name === 'IconButton') props.type ??= 'button';
    return h(tag,{...props,...attrs},children);
  };
  const components = {
    Page: make('Page','main'), Sidebar: make('Sidebar','aside'),
    Topbar: make('Topbar','header'), Surface: make('Surface','section'),
    Button: make('Button','button'), IconButton: make('IconButton','button'),
    Display: make('Display','h1'),
    ProgressBar: make('ProgressBar','div'),
    ProgressPie: make('ProgressPie','div'),
    ProgressDonut: make('ProgressDonut','div'),
    Loader: make('Loader','div'),
    SegmentedChild: make('SegmentedChild','div'),
    StepperChild: make('StepperChild','div')
  };
  components.InputField = function InputField({target,id,label,leading,trailing,action,message,invalid,disabled,...props}) {
    useLayoutEffect(()=>{if(target)adoptComponent(target,'InputField')},[target]);
    if(target)return null;
    const messageId = id && message ? id+'-message' : undefined;
    return h('div',{'data-ba-component':'Field'},
      label && h('label',{htmlFor:id},label),
      h('div',{'data-ba-component':'InputShell','data-invalid':Boolean(invalid)},
        leading && h('span',{'data-ba-slot':'leading'},leading),
        h('input',{...props,id,disabled,'aria-invalid':invalid || undefined,'aria-describedby':messageId,'data-ba-component':'InputField'}),
        trailing && h('span',{'data-ba-slot':'trailing'},trailing),
        action && h('span',{'data-ba-slot':'action'},action)),
      message && h('p',{id:messageId,role:invalid?'alert':undefined},message));
  };
  return components;
}

export function collectComponents(document) {
  const entries = new Map();
  const add = (selector,name,props = {}) => document.querySelectorAll(selector).forEach(target=>entries.set(target,{target,name,props}));
  add('body','Page');
  add('header, .topbar, .transport, .viewer-toolbar','Topbar');
  add('aside, .side-panel','Sidebar');
  add('.viewer-panel, .panel-section, .empty-card, .modal, .ovbox, .apprpanel','Surface');
  add('h1, header .brand','Display');
  document.querySelectorAll('button, .ds-button, .ds-icon-button').forEach(target=>{
    const iconOnly = target.classList.contains('ds-icon-button') || (!target.textContent.trim() && target.hasAttribute('aria-label'));
    const selected = target.getAttribute('aria-pressed') === 'true' || target.classList.contains('active');
    const primary = target.dataset.type === 'primary' && target.dataset.fill !== 'off';
    entries.set(target,{target,name:iconOnly?'IconButton':'Button',props:{
      variant: primary || selected ? 'filled' : 'ghost',
      tone: primary || selected ? 'primary' : target.dataset.type === 'secondary' ? 'secondary' : 'neutral',
      size: target.dataset.size || 'small'
    }});
  });
  add('input:not([type=file]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]), textarea, select','InputField');
  add('.progress, .progress-bar, progress, [role="progressbar"]','ProgressBar');
  add('.loader, .loading, .spinner','Loader');
  return [...entries.values()];
}
