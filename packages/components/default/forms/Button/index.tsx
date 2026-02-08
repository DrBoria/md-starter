import React from "react";
import type { IconName } from "../../common/Icons";
import { LucideIcon } from "../../common/Icons";
import { Loader } from "../../feedback/Loading";
import { StyledButton } from "./styles";

export type ButtonSize = "small" | "medium" | "large" | "icon";
export type ButtonWeight =
  | "bold"
  | "hollow"
  | "outline"
  | "light"
  | "none"
  | "link";
export type ButtonTone =
  | "active"
  | "passive"
  | "negative"
  | "neutral"
  | "positive"
  | "warning"
  | "help";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $fullWidth?: boolean;
  /* Legacy props support */
  icon?: IconName;
  iconPosition?: "left" | "right";

  /* New props */
  iconLeft?: IconName;
  iconRight?: IconName;

  text?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  tone?: ButtonTone;
  weight?: ButtonWeight;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = "left",
  iconLeft,
  iconRight,
  text,
  isLoading = false,
  children,
  disabled = false,
  className,
  size = "medium",
  tone = "active",
  weight = "bold",
  $fullWidth = false,
  ...props
}) => {
  const hasContent = Boolean(text || children);

  // Resolve icons: favor new props, fallback to legacy
  const resolvedIconLeft = iconLeft || (icon && iconPosition === "left" ? icon : undefined);
  const resolvedIconRight = iconRight || (icon && iconPosition === "right" ? icon : undefined);

  // Auto-detect icon mode if no content
  const isIconOnly = (resolvedIconLeft || resolvedIconRight) && !hasContent && !isLoading;
  const effectiveSize = isIconOnly ? "icon" : size;

  return (
    <StyledButton
      className={className}
      $tone={tone}
      $weight={weight}
      $size={effectiveSize}
      $fullWidth={$fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader />}
      {!isLoading && resolvedIconLeft && (
        <LucideIcon name={resolvedIconLeft} />
      )}
      {hasContent && (
        <span>
          {text}
          {children}
        </span>
      )}
      {!isLoading && resolvedIconRight && (
        <LucideIcon name={resolvedIconRight} />
      )}
    </StyledButton>
  );
};

export { Button };

