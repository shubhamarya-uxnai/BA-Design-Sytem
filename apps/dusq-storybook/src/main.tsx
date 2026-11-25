import React from 'react';
import { createRoot } from 'react-dom/client';

// DUSQ Design System Core Tokens & Typographic Classes
import '../../../dist/fonts.css';
import '../../../dist/tokens.css';
import '../../../dist/text-styles.css';

// BA React Component Styles & Material Fonts
import '../../../dist/figma-components.css';
import '../../../dist/chips-selection.css';
import '../../../dist/progress-indicator.css';
import '../../../dist/input-fields.css';

// DUSQ Website Component & Layout Styles
import '@dusq-preview/styles.css';

// Storybook App & Canvas Styles
import './storybook.css';

import { App } from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container element #root not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
