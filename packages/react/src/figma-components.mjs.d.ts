declare module "../../../source/figma-components.mjs" {
  export function createFigmaComponents(react: unknown): {
    Button: unknown;
    IconButton: unknown;
    Chip: unknown;
    Selection: unknown;
    InputField: unknown;
    Icon: unknown;
    ProgressBar: unknown;
    ProgressPie: unknown;
    ProgressDonut: unknown;
    Loader: unknown;
    Loaders: unknown;
    SegmentedChild: unknown;
    StepperChild: unknown;
    SegmentedProgress: unknown;
    Stepper: unknown;
  };
  export function resolveButton(props?: Record<string, unknown>): unknown;
  export function resolveIconButton(props?: Record<string, unknown>): unknown;
  export function resolveInput(props?: Record<string, unknown>): unknown;
}

declare module "../../../dist/figma-components.mjs" {
  export function createFigmaComponents(react: unknown): {
    Button: unknown;
    IconButton: unknown;
    Chip: unknown;
    Selection: unknown;
    InputField: unknown;
    Icon: unknown;
    ProgressBar: unknown;
    ProgressPie: unknown;
    ProgressDonut: unknown;
    Loader: unknown;
    Loaders: unknown;
    SegmentedChild: unknown;
    StepperChild: unknown;
    SegmentedProgress: unknown;
    Stepper: unknown;
  };
  export function resolveButton(props?: Record<string, unknown>): unknown;
  export function resolveIconButton(props?: Record<string, unknown>): unknown;
  export function resolveInput(props?: Record<string, unknown>): unknown;
}
