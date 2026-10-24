# Shared components — v0.2.0

The BA repository owns component structure, attributes, React definitions, styles, fonts and the browser adapter. Consumer repositories contain no design-system folder.

## React usage

```jsx
import React from 'react';
import {createReactComponents} from 'https://cdn.jsdelivr.net/gh/shubhamarya-uxnai/BA-Design-Sytem@v0.2.0/dist/browser-components.mjs';
const {Page, Sidebar, Topbar, Surface, Button, IconButton, InputField, Display} = createReactComponents(React);

function Tool() {
  return <Page>
    <Topbar><Display>My tool</Display></Topbar>
    <Sidebar>
      <InputField id="query" label="Search" action={<Button variant="ghost">Choose</Button>} />
      <Button variant="filled" tone="primary">Apply</Button>
      <Button variant="ghost">Cancel</Button>
    </Sidebar>
    <Surface surface="raised">Preview</Surface>
  </Page>;
}
```

Load dist/consumer.css once. Native browser modules can import the URL directly; bundlers may need remote-module support or a package import configured for the host application.

## Existing tools

The existing tools retain their HTML/JavaScript engines. Static component attributes are stamped in their markup, and the remote dist/adopt.mjs React adapter maintains dynamic and selected controls using the same definitions. This is a transition bridge, not a complete rewrite of their application trees into JSX. Existing event listeners, DOM identities, upload controls and canvas logic are preserved.

The adapter imports React 19.1.0 and React DOM through esm.sh. It observes added nodes and state attributes. The CSS and static roles still render if the adapter is unavailable; dynamically inserted controls then retain their legacy styling.

## Rules

- Page: Semantic Color Tokens / Background / Neutral / Page.
- Sidebar, Topbar and default Surface: Background / Neutral / Default.
- Raised Surface: Background / Neutral / Raised.
- Ghost Button: transparent fill, semantic foreground text, border using currentColor.
- Filled Button: semantic primary/secondary background with inverse foreground.
- Disabled: dedicated semantic disabled foreground and background.
- Display: The Seasons; other typography: Instrument Sans.
- Icon dimensions: Screen Size Switch / Width and Height / L.
- InputField keeps independent leading, trailing and action slots; action can contain a complete button or dropdown control.
- ProgressBar: Linear track supporting Not Started, In Progress, Error, Warning, and Success states with percentage legend and status icons.
- ProgressPie: 48px circular pie indicator with external percentage legend.
- ProgressDonut: 48px hollow donut indicator with centered percentage legend and status indicators.
- Loader: Indeterminate loading indicators supporting Circular spinner, Bar slide, and Skeleton pulse.
- SegmentedChild: Named process stage child with Default, In Progress, Completed, Error, and Warning states and optional description.
- StepperChild: Ordered step child with status tracking bar, title, description, and extensible children slot.

Versions are pinned. Updating BA alone does not change a consumer until its stylesheet and adapter URLs adopt the new version.
