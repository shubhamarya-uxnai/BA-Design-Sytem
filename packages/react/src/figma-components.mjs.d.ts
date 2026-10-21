declare module "../../../source/figma-components.mjs" {
  export function createFigmaComponents(react: unknown): {
    Button: unknown;
    InputField: unknown;
    Icon: unknown;
  };
  export function resolveButton(props?: Record<string, unknown>): unknown;
  export function resolveInput(props?: Record<string, unknown>): unknown;
}
