export interface ColorToken {
  name: string;
  cssVar: string;
  rgb: string;
  hex: string;
  cWhite: number;
  cBlack: number;
  role?: string;
  isBrandAccent?: boolean;
}

export interface SemanticTokenGroup {
  category: string;
  description: string;
  tokens: {
    name: string;
    cssVar: string;
    lightValue: string;
    darkValue: string;
    lightRef: string;
    darkRef: string;
    description: string;
  }[];
}

export const DUSQ_BRAND_ACCENT: ColorToken = {
  name: 'DUSQ Brand Accent',
  cssVar: '--ba-color-themes-primary-400',
  rgb: 'rgb(240, 101, 13)',
  hex: '#F0650D',
  cWhite: 3.2,
  cBlack: 6.57,
  role: 'Primary brand action accent, dot accents, active indicators',
  isBrandAccent: true,
};

export const WARM_NEUTRAL_LADDER: ColorToken[] = [
  { name: 'neutral-0', cssVar: '--ba-primitive-color-tokens-neutral-0', rgb: 'rgb(250, 248, 245)', hex: '#FAF8F5', cWhite: 1.06, cBlack: 19.81, role: 'Canvas / Cream Page Surface' },
  { name: 'neutral-50', cssVar: '--ba-primitive-color-tokens-neutral-50', rgb: 'rgb(235, 231, 228)', hex: '#EBE7E4', cWhite: 1.21, cBlack: 17.38, role: 'Surface Secondary / Card Tint' },
  { name: 'neutral-100', cssVar: '--ba-primitive-color-tokens-neutral-100', rgb: 'rgb(221, 215, 210)', hex: '#DDD7D2', cWhite: 1.39, cBlack: 15.12, role: 'Surface Subtle / Hover' },
  { name: 'neutral-150', cssVar: '--ba-primitive-color-tokens-neutral-150', rgb: 'rgb(206, 199, 193)', hex: '#CEC7C1', cWhite: 1.62, cBlack: 13.01, role: 'Card stroke faint' },
  { name: 'neutral-200', cssVar: '--ba-primitive-color-tokens-neutral-200', rgb: 'rgb(194, 185, 175)', hex: '#C2B9AF', cWhite: 1.86, cBlack: 11.28, role: 'Border subtle / Hairline divider' },
  { name: 'neutral-250', cssVar: '--ba-primitive-color-tokens-neutral-250', rgb: 'rgb(183, 170, 157)', hex: '#B7AA9D', cWhite: 2.18, cBlack: 9.64, role: 'Metric divider / Border' },
  { name: 'neutral-300', cssVar: '--ba-primitive-color-tokens-neutral-300', rgb: 'rgb(172, 157, 141)', hex: '#AC9D8D', cWhite: 2.53, cBlack: 8.31, role: 'Border default / Inactive pill stroke' },
  { name: 'neutral-350', cssVar: '--ba-primitive-color-tokens-neutral-350', rgb: 'rgb(163, 144, 124)', hex: '#A3907C', cWhite: 2.96, cBlack: 7.10, role: 'Border strong' },
  { name: 'neutral-400', cssVar: '--ba-primitive-color-tokens-neutral-400', rgb: 'rgb(154, 131, 109)', hex: '#9A836D', cWhite: 3.49, cBlack: 6.03, role: 'Border interactive / Carousel next' },
  { name: 'neutral-450', cssVar: '--ba-primitive-color-tokens-neutral-450', rgb: 'rgb(143, 120, 97)', hex: '#8F7861', cWhite: 4.15, cBlack: 5.06, role: 'Secondary icon / Icon border' },
  { name: 'neutral-500', cssVar: '--ba-primitive-color-tokens-neutral-500', rgb: 'rgb(132, 109, 86)', hex: '#846D56', cWhite: 4.97, cBlack: 4.23, role: 'Icon default' },
  { name: 'neutral-550', cssVar: '--ba-primitive-color-tokens-neutral-550', rgb: 'rgb(121, 98, 77)', hex: '#79624D', cWhite: 6.00, cBlack: 3.50, role: 'Tertiary label' },
  { name: 'neutral-600', cssVar: '--ba-primitive-color-tokens-neutral-600', rgb: 'rgb(109, 89, 70)', hex: '#6D5946', cWhite: 7.28, cBlack: 2.89, role: 'Secondary label' },
  { name: 'neutral-650', cssVar: '--ba-primitive-color-tokens-neutral-650', rgb: 'rgb(98, 79, 63)', hex: '#624F3F', cWhite: 8.91, cBlack: 2.36, role: 'Muted text (dark mode)' },
  { name: 'neutral-700', cssVar: '--ba-primitive-color-tokens-neutral-700', rgb: 'rgb(86, 70, 54)', hex: '#564636', cWhite: 10.95, cBlack: 1.92, role: 'Muted copy / Eyebrows' },
  { name: 'neutral-750', cssVar: '--ba-primitive-color-tokens-neutral-750', rgb: 'rgb(75, 60, 48)', hex: '#4B3C30', cWhite: 13.51, cBlack: 1.55, role: 'Subtle heading' },
  { name: 'neutral-800', cssVar: '--ba-primitive-color-tokens-neutral-800', rgb: 'rgb(63, 51, 41)', hex: '#3F3329', cWhite: 15.65, cBlack: 1.34, role: 'Secondary dark surface' },
  { name: 'neutral-850', cssVar: '--ba-primitive-color-tokens-neutral-850', rgb: 'rgb(50, 40, 33)', hex: '#322821', cWhite: 17.20, cBlack: 1.22, role: 'Pill arrow container dark hover' },
  { name: 'neutral-900', cssVar: '--ba-primitive-color-tokens-neutral-900', rgb: 'rgb(26, 24, 22)', hex: '#1A1816', cWhite: 18.23, cBlack: 1.15, role: 'Primary Ink / Header bg / Pill default' },
  { name: 'neutral-950', cssVar: '--ba-primitive-color-tokens-neutral-950', rgb: 'rgb(17, 17, 17)', hex: '#111111', cWhite: 18.88, cBlack: 1.11, role: 'Night black / MeetTeam bg / Deepest ink' },
];

export const ORANGE_LADDER: ColorToken[] = [
  { name: 'orange-0', cssVar: '--ba-primitive-color-tokens-orange-0', rgb: 'rgb(255, 248, 240)', hex: '#FFF8F0', cWhite: 1.05, cBlack: 19.94, role: 'Comparison DUSQ column tint' },
  { name: 'orange-100', cssVar: '--ba-primitive-color-tokens-orange-100', rgb: 'rgb(253, 230, 210)', hex: '#FDE6D2', cWhite: 1.21, cBlack: 17.43, role: 'Subtle orange wash' },
  { name: 'orange-200', cssVar: '--ba-primitive-color-tokens-orange-200', rgb: 'rgb(251, 203, 168)', hex: '#FBCBA8', cWhite: 1.48, cBlack: 14.21, role: 'Eyebrow text on dark surfaces' },
  { name: 'orange-300', cssVar: '--ba-primitive-color-tokens-orange-300', rgb: 'rgb(247, 163, 102)', hex: '#F7A366', cWhite: 2.02, cBlack: 10.39, role: 'Focus ring subtle / Dark mode accent' },
  { name: 'orange-400', cssVar: '--ba-primitive-color-tokens-orange-400', rgb: 'rgb(240, 101, 13)', hex: '#F0650D', cWhite: 3.2, cBlack: 6.57, role: 'Core primitive orange token', isBrandAccent: true },
  { name: 'orange-500', cssVar: '--ba-primitive-color-tokens-orange-500', rgb: 'rgb(232, 93, 4)', hex: '#E85D04', cWhite: 3.5, cBlack: 6.0, role: 'DUSQ active hover accent' },
  { name: 'orange-600', cssVar: '--ba-primitive-color-tokens-orange-600', rgb: 'rgb(198, 75, 0)', hex: '#C64B00', cWhite: 4.76, cBlack: 4.41, role: 'Deep orange fill' },
  { name: 'orange-700', cssVar: '--ba-primitive-color-tokens-orange-700', rgb: 'rgb(158, 59, 0)', hex: '#9E3B00', cWhite: 6.82, cBlack: 3.08, role: 'Dark orange stroke' },
  { name: 'orange-800', cssVar: '--ba-primitive-color-tokens-orange-800', rgb: 'rgb(115, 42, 0)', hex: '#732A00', cWhite: 10.19, cBlack: 2.06, role: 'Comparison table DUSQ header' },
  { name: 'orange-900', cssVar: '--ba-primitive-color-tokens-orange-900', rgb: 'rgb(64, 23, 0)', hex: '#401700', cWhite: 15.67, cBlack: 1.34, role: 'Deepest orange shadow' },
];

export const STATUS_PALETTES: { name: string; description: string; tokens: ColorToken[] }[] = [
  {
    name: 'Blue / Informative',
    description: 'Used for status information, clinical sensor readouts, and advisory banners',
    tokens: [
      { name: 'blue-0', cssVar: '--ba-primitive-color-tokens-blue-0', rgb: 'rgb(246, 250, 255)', hex: '#F6FAFF', cWhite: 1.05, cBlack: 20.04, role: 'Info Surface Light' },
      { name: 'blue-100', cssVar: '--ba-primitive-color-tokens-blue-100', rgb: 'rgb(202, 217, 237)', hex: '#CAD9ED', cWhite: 1.43, cBlack: 14.66, role: 'Info Tint' },
      { name: 'blue-200', cssVar: '--ba-primitive-color-tokens-blue-200', rgb: 'rgb(161, 189, 223)', hex: '#A1BDDF', cWhite: 1.93, cBlack: 10.86, role: 'Info Stroke subtle' },
      { name: 'blue-300', cssVar: '--ba-primitive-color-tokens-blue-300', rgb: 'rgb(112, 163, 217)', hex: '#70A3D9', cWhite: 2.65, cBlack: 7.93, role: 'Info Focus' },
      { name: 'blue-400', cssVar: '--ba-primitive-color-tokens-blue-400', rgb: 'rgb(60, 138, 220)', hex: '#3C8ADC', cWhite: 3.58, cBlack: 5.86, role: 'Info Fill Primary' },
      { name: 'blue-500', cssVar: '--ba-primitive-color-tokens-blue-500', rgb: 'rgb(1, 110, 223)', hex: '#016EDF', cWhite: 4.89, cBlack: 4.30, role: 'Info Interactive' },
      { name: 'blue-600', cssVar: '--ba-primitive-color-tokens-blue-600', rgb: 'rgb(0, 83, 208)', hex: '#0053D0', cWhite: 6.67, cBlack: 3.15, role: 'Info Text Dark' },
      { name: 'blue-700', cssVar: '--ba-primitive-color-tokens-blue-700', rgb: 'rgb(0, 61, 180)', hex: '#003DB4', cWhite: 9.03, cBlack: 2.33, role: 'Info Strong' },
      { name: 'blue-800', cssVar: '--ba-primitive-color-tokens-blue-800', rgb: 'rgb(0, 44, 135)', hex: '#002C87', cWhite: 12.28, cBlack: 1.71, role: 'Info Dark border' },
      { name: 'blue-900', cssVar: '--ba-primitive-color-tokens-blue-900', rgb: 'rgb(0, 26, 78)', hex: '#001A4E', cWhite: 16.70, cBlack: 1.26, role: 'Info Dark surface' },
    ],
  },
  {
    name: 'Green / Success',
    description: 'Sleep efficiency improvement, clinical validation pass, and success metrics',
    tokens: [
      { name: 'green-0', cssVar: '--ba-primitive-color-tokens-green-0', rgb: 'rgb(240, 253, 244)', hex: '#F0FDF4', cWhite: 1.05, cBlack: 20.06, role: 'Success Surface' },
      { name: 'green-100', cssVar: '--ba-primitive-color-tokens-green-100', rgb: 'rgb(192, 223, 203)', hex: '#C0DFCB', cWhite: 1.43, cBlack: 14.66, role: 'Success Tint' },
      { name: 'green-200', cssVar: '--ba-primitive-color-tokens-green-200', rgb: 'rgb(141, 199, 162)', hex: '#8DC7A2', cWhite: 1.94, cBlack: 10.82, role: 'Success Stroke' },
      { name: 'green-300', cssVar: '--ba-primitive-color-tokens-green-300', rgb: 'rgb(73, 179, 116)', hex: '#49B374', cWhite: 2.63, cBlack: 7.98, role: 'Success Fill Light' },
      { name: 'green-400', cssVar: '--ba-primitive-color-tokens-green-400', rgb: 'rgb(0, 156, 78)', hex: '#009C4E', cWhite: 3.58, cBlack: 5.87, role: 'Success Primary Fill' },
      { name: 'green-500', cssVar: '--ba-primitive-color-tokens-green-500', rgb: 'rgb(0, 131, 57)', hex: '#008339', cWhite: 4.88, cBlack: 4.31, role: 'Success Text AA' },
      { name: 'green-600', cssVar: '--ba-primitive-color-tokens-green-600', rgb: 'rgb(0, 108, 44)', hex: '#006C2C', cWhite: 6.60, cBlack: 3.18, role: 'Success Text AAA' },
      { name: 'green-700', cssVar: '--ba-primitive-color-tokens-green-700', rgb: 'rgb(0, 85, 36)', hex: '#005524', cWhite: 9.03, cBlack: 2.32, role: 'Success Dark' },
      { name: 'green-800', cssVar: '--ba-primitive-color-tokens-green-800', rgb: 'rgb(0, 62, 27)', hex: '#003E1B', cWhite: 12.32, cBlack: 1.70, role: 'Success Dark Border' },
      { name: 'green-900', cssVar: '--ba-primitive-color-tokens-green-900', rgb: 'rgb(0, 36, 12)', hex: '#00240C', cWhite: 16.70, cBlack: 1.26, role: 'Success Dark Surface' },
    ],
  },
  {
    name: 'Red / Error & Microarousal Alert',
    description: 'Sleep fragmentation alerts, error states, and heart-rate spike warnings',
    tokens: [
      { name: 'red-0', cssVar: '--ba-primitive-color-tokens-red-0', rgb: 'rgb(255, 248, 248)', hex: '#FFF8F8', cWhite: 1.05, cBlack: 20.03, role: 'Error Surface Light' },
      { name: 'red-100', cssVar: '--ba-primitive-color-tokens-red-100', rgb: 'rgb(237, 210, 210)', hex: '#EDD2D2', cWhite: 1.42, cBlack: 14.75, role: 'Error Tint' },
      { name: 'red-200', cssVar: '--ba-primitive-color-tokens-red-200', rgb: 'rgb(224, 174, 174)', hex: '#E0AEAE', cWhite: 1.94, cBlack: 10.84, role: 'Error Stroke Light' },
      { name: 'red-300', cssVar: '--ba-primitive-color-tokens-red-300', rgb: 'rgb(220, 136, 137)', hex: '#DC8889', cWhite: 2.65, cBlack: 7.93, role: 'Error Accent Dark' },
      { name: 'red-400', cssVar: '--ba-primitive-color-tokens-red-400', rgb: 'rgb(224, 92, 94)', hex: '#E05C5E', cWhite: 3.58, cBlack: 5.86, role: 'Error Primary Fill' },
      { name: 'red-500', cssVar: '--ba-primitive-color-tokens-red-500', rgb: 'rgb(215, 43, 51)', hex: '#D72B33', cWhite: 4.90, cBlack: 4.28, role: 'Error Text AA' },
      { name: 'red-600', cssVar: '--ba-primitive-color-tokens-red-600', rgb: 'rgb(188, 0, 22)', hex: '#BC0016', cWhite: 6.67, cBlack: 3.15, role: 'Error Text AAA' },
      { name: 'red-700', cssVar: '--ba-primitive-color-tokens-red-700', rgb: 'rgb(151, 0, 14)', hex: '#97000E', cWhite: 9.04, cBlack: 2.32, role: 'Error Strong' },
      { name: 'red-800', cssVar: '--ba-primitive-color-tokens-red-800', rgb: 'rgb(113, 0, 9)', hex: '#710009', cWhite: 12.31, cBlack: 1.71, role: 'Error Dark Border' },
      { name: 'red-900', cssVar: '--ba-primitive-color-tokens-red-900', rgb: 'rgb(67, 5, 0)', hex: '#430500', cWhite: 16.66, cBlack: 1.26, role: 'Error Dark Surface' },
    ],
  },
  {
    name: 'Teal & Purple (Neuroscience Accents)',
    description: 'Vagal nerve stimulation frequency and slow-wave sleep indicators',
    tokens: [
      { name: 'teal-300', cssVar: '--ba-primitive-color-tokens-teal-300', rgb: 'rgb(0, 179, 159)', hex: '#00B39F', cWhite: 2.64, cBlack: 7.95, role: 'Vagal sensor indicator' },
      { name: 'teal-500', cssVar: '--ba-primitive-color-tokens-teal-500', rgb: 'rgb(0, 127, 114)', hex: '#007F72', cWhite: 4.91, cBlack: 4.28, role: 'Vestibular frequency band' },
      { name: 'purple-300', cssVar: '--ba-primitive-color-tokens-purple-300', rgb: 'rgb(164, 150, 220)', hex: '#A496DC', cWhite: 2.63, cBlack: 7.97, role: 'REM sleep wave' },
      { name: 'purple-500', cssVar: '--ba-primitive-color-tokens-purple-500', rgb: 'rgb(127, 82, 234)', hex: '#7F52EA', cWhite: 4.89, cBlack: 4.30, role: 'Deep sleep slow-wave' },
    ],
  },
];

export const SEMANTIC_TOKEN_GROUPS: SemanticTokenGroup[] = [
  {
    category: 'Surfaces & Backgrounds',
    description: 'Background layers adapting from DUSQ warm cream to deep charcoal in dark mode',
    tokens: [
      {
        name: 'Page Background',
        cssVar: '--ba-semantic-color-tokens-background-neutral-page',
        lightValue: '#EBE7E4',
        darkValue: '#111111',
        lightRef: '--ba-primitive-color-tokens-neutral-50',
        darkRef: '--ba-primitive-color-tokens-neutral-950',
        description: 'Root page canvas background',
      },
      {
        name: 'Default Surface',
        cssVar: '--ba-semantic-color-tokens-background-neutral-default',
        lightValue: '#FAF8F5',
        darkValue: '#1A1816',
        lightRef: '--ba-primitive-color-tokens-neutral-0',
        darkRef: '--ba-primitive-color-tokens-neutral-900',
        description: 'Standard card and container background',
      },
      {
        name: 'Raised Surface',
        cssVar: '--ba-semantic-color-tokens-background-neutral-raised',
        lightValue: '#DDD7D2',
        darkValue: '#3F3329',
        lightRef: '--ba-primitive-color-tokens-neutral-100',
        darkRef: '--ba-primitive-color-tokens-neutral-800',
        description: 'Elevated popovers, floating chips, tooltips',
      },
      {
        name: 'Shallow Surface',
        cssVar: '--ba-semantic-color-tokens-background-neutral-shallow',
        lightValue: '#C2B9AF',
        darkValue: '#564636',
        lightRef: '--ba-primitive-color-tokens-neutral-200',
        darkRef: '--ba-primitive-color-tokens-neutral-700',
        description: 'Inset containers, clinical data metrics panels',
      },
      {
        name: 'Primary Accent Background',
        cssVar: '--ba-semantic-color-tokens-background-primary-default',
        lightValue: '#C64B00',
        darkValue: '#F0650D',
        lightRef: '--ba-primitive-color-tokens-orange-600',
        darkRef: '--ba-primitive-color-tokens-orange-400',
        description: 'Primary button active fills and highlighted steps',
      },
      {
        name: 'Primary Subtle Background',
        cssVar: '--ba-semantic-color-tokens-background-primary-subtle',
        lightValue: '#FDE6D2',
        darkValue: '#401700',
        lightRef: '--ba-primitive-color-tokens-orange-100',
        darkRef: '--ba-primitive-color-tokens-orange-900',
        description: 'Comparison table highlighted DUSQ column tint',
      },
    ],
  },
  {
    category: 'Foreground & Typography',
    description: 'High-contrast text tokens ensuring WCAG AA / AAA readability on all backgrounds',
    tokens: [
      {
        name: 'Primary Text',
        cssVar: '--ba-semantic-color-tokens-foreground-neutral-default',
        lightValue: '#1A1816',
        darkValue: '#FAF8F5',
        lightRef: '--ba-primitive-color-tokens-neutral-900',
        darkRef: '--ba-primitive-color-tokens-neutral-0',
        description: 'Main titles, card headings, and primary body text',
      },
      {
        name: 'Muted / Subtle Text',
        cssVar: '--ba-semantic-color-tokens-foreground-neutral-subtle',
        lightValue: '#564636',
        darkValue: '#C2B9AF',
        lightRef: '--ba-primitive-color-tokens-neutral-700',
        darkRef: '--ba-primitive-color-tokens-neutral-200',
        description: 'Eyebrows, secondary notes, descriptions, timestamps',
      },
      {
        name: 'Inverse Text',
        cssVar: '--ba-semantic-color-tokens-foreground-inverse-default',
        lightValue: '#FAF8F5',
        darkValue: '#1A1816',
        lightRef: '--ba-primitive-color-tokens-neutral-0',
        darkRef: '--ba-primitive-color-tokens-neutral-900',
        description: 'Text inside dark pill buttons, header navigation, hero actions',
      },
      {
        name: 'Primary Brand Text',
        cssVar: '--ba-semantic-color-tokens-foreground-primary-default',
        lightValue: '#401700',
        darkValue: '#FFF8F0',
        lightRef: '--ba-primitive-color-tokens-orange-900',
        darkRef: '--ba-primitive-color-tokens-orange-0',
        description: 'Step numbers (01, 02, 03), logo dot accent, key stats',
      },
    ],
  },
  {
    category: 'Borders & Dividers',
    description: 'Subtle warm hairline strokes maintaining structure without visual noise',
    tokens: [
      {
        name: 'Subtle Border',
        cssVar: '--ba-semantic-color-tokens-border-subtle',
        lightValue: '#B7AA9D',
        darkValue: '#6D5946',
        lightRef: '--ba-primitive-color-tokens-neutral-250',
        darkRef: '--ba-primitive-color-tokens-neutral-600',
        description: 'Card outlines, step card borders, hairline section separators',
      },
      {
        name: 'Default Border',
        cssVar: '--ba-semantic-color-tokens-border-default',
        lightValue: '#846D56',
        darkValue: '#9A836D',
        lightRef: '--ba-primitive-color-tokens-neutral-500',
        darkRef: '--ba-primitive-color-tokens-neutral-400',
        description: 'Inactive pill buttons, tabs, input field borders',
      },
      {
        name: 'Strong Border',
        cssVar: '--ba-semantic-color-tokens-border-strong',
        lightValue: '#624F3F',
        darkValue: '#B7AA9D',
        lightRef: '--ba-primitive-color-tokens-neutral-650',
        darkRef: '--ba-primitive-color-tokens-neutral-250',
        description: 'Active tab outlines, carousel controls, high-contrast borders',
      },
      {
        name: 'Primary Focus Ring',
        cssVar: '--ba-semantic-color-tokens-border-primary',
        lightValue: '#C64B00',
        darkValue: '#F7A366',
        lightRef: '--ba-primitive-color-tokens-orange-600',
        darkRef: '--ba-primitive-color-tokens-orange-300',
        description: 'Interactive focus rings, keyboard accessibility outlines (3px)',
      },
    ],
  },
  {
    category: 'Status & Clinical Indicators',
    description: 'Clinical feedback states for sleep sensors, errors, warnings, and success',
    tokens: [
      {
        name: 'Error Surface / Alert',
        cssVar: '--ba-semantic-color-tokens-status-error-surface',
        lightValue: '#FFF8F8',
        darkValue: '#430500',
        lightRef: '--ba-primitive-color-tokens-red-0',
        darkRef: '--ba-primitive-color-tokens-red-900',
        description: 'Sleep microarousal alert background',
      },
      {
        name: 'Error Fill',
        cssVar: '--ba-semantic-color-tokens-status-error-fill',
        lightValue: '#BC0016',
        darkValue: '#DC8889',
        lightRef: '--ba-primitive-color-tokens-red-600',
        darkRef: '--ba-primitive-color-tokens-red-300',
        description: 'Microarousal spike marker, error icons',
      },
      {
        name: 'Success Surface',
        cssVar: '--ba-semantic-color-tokens-status-success-surface',
        lightValue: '#F0FDF4',
        darkValue: '#00240C',
        lightRef: '--ba-primitive-color-tokens-green-0',
        darkRef: '--ba-primitive-color-tokens-green-900',
        description: 'Deep sleep stabilization indicator',
      },
      {
        name: 'Success Fill',
        cssVar: '--ba-semantic-color-tokens-status-success-fill',
        lightValue: '#006C2C',
        darkValue: '#49B374',
        lightRef: '--ba-primitive-color-tokens-green-600',
        darkRef: '--ba-primitive-color-tokens-green-300',
        description: 'Clinical data upward trend, verified status badges',
      },
    ],
  },
];
