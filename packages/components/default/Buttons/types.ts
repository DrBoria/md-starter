import type { JSXElementConstructor, ReactElement } from "react";

export interface IButtonBaseProps {
  isVertical?: boolean;
  $fullWidth?: boolean;
}

export interface IUpdateButtonProps extends IButtonBaseProps {
  isPristine: boolean;
  onUpdate: () => void;
}

export interface IResetButtonProps extends IButtonBaseProps {
  onReset: () => void;
}

export interface IDeleteButtonProps extends IButtonBaseProps {
  onDelete: () => void;
}

export type ButtonViewFunction = (
  onClick?: () => unknown,
  isDisabled?: boolean,
  refetch?: () => unknown,
) => ReactElement<unknown, string | JSXElementConstructor<unknown>>;
