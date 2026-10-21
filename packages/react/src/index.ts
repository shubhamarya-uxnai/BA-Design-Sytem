import React, { type ComponentProps, type ReactNode } from "react";

export type ButtonType = "Primary" | "Default" | "Ghost";
export type ButtonSize = "Large" | "Small";
export type FigmaBoolean = boolean | "True" | "False" | "true" | "false";
export type MaterialIconSet = "symbols" | "classic";
export type MaterialIconProps = { iconSet?: MaterialIconSet; iconFill?: 0 | 1; iconWeight?: number; iconGrade?: number; iconOpticalSize?: number };

export type ButtonProps = Omit<ComponentProps<"button">, "disabled"> & MaterialIconProps & {
  Type?: ButtonType;
  Hover?: FigmaBoolean;
  Enabled?: FigmaBoolean;
  Pressed?: FigmaBoolean;
  Size?: ButtonSize;
  Button?: string;
  "Leading Icon"?: FigmaBoolean;
  "Tailing Icon"?: FigmaBoolean;
  "leading-icon"?: ReactNode;
  "tailing-icon"?: ReactNode;
  "Focus Ring"?: FigmaBoolean;
  interactive?: boolean;
  children?: ReactNode;
};

export type InputFieldProps = Omit<ComponentProps<"input">, "value" | "defaultValue"> & MaterialIconProps & {
  Active?: FigmaBoolean;
  Error?: FigmaBoolean;
  Typed?: FigmaBoolean;
  Typing?: FigmaBoolean;
  Hover?: FigmaBoolean;
  Label?: FigmaBoolean;
  label?: string;
  input?: string;
  Button?: FigmaBoolean;
  "Leading Icon"?: FigmaBoolean;
  "Tailing Icon"?: FigmaBoolean;
  "leading-icon"?: ReactNode;
  "tailing-icon"?: ReactNode;
  "Focus Ring"?: FigmaBoolean;
  button?: ReactNode;
  value?: string;
  interactive?: boolean;
};

// The legacy Figma snapshot is JavaScript by design; this package supplies the typed public API.
// @ts-expect-error The checked-in snapshot has no runtime dependency on TypeScript.
import { createFigmaComponents, resolveButton, resolveInput } from "../../../source/figma-components.mjs";

const runtime = createFigmaComponents(React);

export { createFigmaComponents, resolveButton, resolveInput };
export const Button = runtime.Button as React.ComponentType<ButtonProps>;
export const InputField = runtime.InputField as React.ComponentType<InputFieldProps>;
export const Icon = runtime.Icon as React.ComponentType<{ name?: ReactNode; side?: "leading" | "trailing" } & MaterialIconProps>;
