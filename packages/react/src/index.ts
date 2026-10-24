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

export type IconButtonProps = Omit<ComponentProps<"button">, "disabled"> & MaterialIconProps & {
  Type?: ButtonType;
  Hover?: FigmaBoolean;
  Inverse?: "False" | false;
  Enabled?: FigmaBoolean;
  Pressed?: FigmaBoolean;
  Size?: ButtonSize;
  Icon?: FigmaBoolean;
  Focus?: FigmaBoolean;
  icon?: ReactNode;
  interactive?: boolean;
};

export type ChipProps = MaterialIconProps & {
  Type?: "Primary" | "Success" | "Error";
  Style?: "Filled" | "Ghost";
  Icon?: FigmaBoolean;
  chip?: string;
  icon?: ReactNode;
  className?: string;
};

export type SelectionProps = Omit<ComponentProps<"input">, "type" | "checked" | "disabled" | "size"> & {
  Type?: "Checkbox" | "Radio" | "Toggle";
  Checked?: FigmaBoolean;
  Active?: FigmaBoolean;
  Hover?: FigmaBoolean;
  Focus?: FigmaBoolean;
  label?: string;
  showLabel?: boolean;
  onCheckedChange?: (checked: boolean) => void;
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

export type ProgressType = "Not Started" | "In Progress" | "Error" | "Warning" | "Success";

export type ProgressBarProps = MaterialIconProps & {
  Type?: ProgressType;
  type?: ProgressType;
  value?: number;
  Legend?: FigmaBoolean;
  legend?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export type ProgressPieProps = MaterialIconProps & {
  Type?: ProgressType;
  type?: ProgressType;
  value?: number;
  Legend?: FigmaBoolean;
  legend?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export type ProgressDonutProps = MaterialIconProps & {
  Type?: ProgressType;
  type?: ProgressType;
  value?: number;
  Legend?: FigmaBoolean;
  legend?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export type LoaderType = "Circular" | "Bar" | "Skeleton";

export type LoaderProps = {
  Type?: LoaderType;
  type?: LoaderType;
  className?: string;
  style?: React.CSSProperties;
};

export type StepStatusType = "Default" | "In Progress" | "Completed" | "Error" | "Warning";

export type SegmentedChildProps = MaterialIconProps & {
  Type?: StepStatusType;
  type?: StepStatusType;
  Description?: FigmaBoolean;
  description?: boolean;
  Icon?: FigmaBoolean;
  icon?: ReactNode;
  iconNode?: ReactNode;
  title?: string;
  body?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export type StepperChildProps = MaterialIconProps & {
  Type?: StepStatusType;
  type?: StepStatusType;
  Description?: FigmaBoolean;
  description?: boolean;
  Icon?: FigmaBoolean;
  icon?: ReactNode;
  iconNode?: ReactNode;
  title?: string;
  body?: string;
  slotVisible?: FigmaBoolean;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export type SegmentedProgressProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type StepperProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// The legacy Figma snapshot is JavaScript by design; this package supplies the typed public API.
// @ts-expect-error The checked-in snapshot has no runtime dependency on TypeScript.
import { createFigmaComponents, resolveButton, resolveIconButton, resolveInput } from "../../../dist/figma-components.mjs";

const runtime = createFigmaComponents(React);

export { createFigmaComponents, resolveButton, resolveIconButton, resolveInput };
export const Button = runtime.Button as React.ComponentType<ButtonProps>;
export const IconButton = runtime.IconButton as React.ComponentType<IconButtonProps>;
export const Chip = runtime.Chip as React.ComponentType<ChipProps>;
export const Selection = runtime.Selection as React.ComponentType<SelectionProps>;
export const InputField = runtime.InputField as React.ComponentType<InputFieldProps>;
export const Icon = runtime.Icon as React.ComponentType<{ name?: ReactNode; side?: "leading" | "trailing" } & MaterialIconProps>;

export const ProgressBar = runtime.ProgressBar as React.ComponentType<ProgressBarProps>;
export const ProgressPie = runtime.ProgressPie as React.ComponentType<ProgressPieProps>;
export const ProgressDonut = runtime.ProgressDonut as React.ComponentType<ProgressDonutProps>;
export const Loader = runtime.Loader as React.ComponentType<LoaderProps>;
export const Loaders = runtime.Loaders as React.ComponentType<LoaderProps>;
export const SegmentedChild = runtime.SegmentedChild as React.ComponentType<SegmentedChildProps>;
export const StepperChild = runtime.StepperChild as React.ComponentType<StepperChildProps>;
export const SegmentedProgress = runtime.SegmentedProgress as React.ComponentType<SegmentedProgressProps>;
export const Stepper = runtime.Stepper as React.ComponentType<StepperProps>;
