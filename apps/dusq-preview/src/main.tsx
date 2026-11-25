import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../../dist/fonts.css';
import '../../../dist/tokens.css';
import '../../../dist/text-styles.css';
import '../../../dist/figma-components.css';
import '../../../dist/chips-selection.css';
import '../../../dist/progress-indicator.css';
import '../../../dist/input-fields.css';
import './styles.css';
import './styles/dusq-loader.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
