import React from "react";
import styled from "styled-components";
import type { IconName } from "../Icons";
import { LucideIcon } from "../Icons";
import { Loader } from "../Spinner";

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
  icon?: IconName;
  iconPosition?: "left" | "right";
  text?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  tone?: ButtonTone;
  weight?: ButtonWeight;
  size?: ButtonSize;
}

const StyledButton = styled.button<{
  tone: ButtonTone;
  weight: ButtonWeight;
  size: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  gap: ${(props) =>
    props.size !== "icon"
      ? `${props.theme.variables.offsets.betweenElements.mobile}px`
      : "0"};
  border-radius: ${({ theme }) => theme.variables.border.radius}px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => {
    const { theme, tone, weight } = props;

    const color = (() => {
      switch (tone) {
        case "active":
          return theme.colors.highlighted;
        case "passive":
          return theme.colors.sectionContent;
        case "negative":
          return theme.colors.errorText;
        case "neutral":
          return theme.colors.label;
        case "positive":
          return theme.colors.successText;
        case "warning":
          return theme.colors.warningText;
        case "help":
          return theme.colors.overlayActive;
        default:
          return theme.colors.highlighted;
      }
    })();

    // Стили для веса кнопки
    let weightStyles = "";
    switch (weight) {
      case "bold":
        weightStyles = `
          background-color: ${color};
          color: white;
        `;
        break;
      case "outline":
      case "hollow":
        weightStyles = `
          border: ${theme.variables.border.size}px solid ${color};
          background-color: transparent;
          color: ${color};
        `;
        break;
      case "light":
        weightStyles = `
          background-color: transparent;
          color: ${color};
        `;
        break;
      case "link":
        weightStyles = `
          background-color: transparent;
          color: ${color};
          text-decoration: underline;
        `;
        break;
      case "none":
        weightStyles = `
          background-color: transparent;
          color: inherit;
        `;
        break;
      default:
        weightStyles = `
          background-color: ${color};
          color: white;
        `;
    }

    let sizeStyles = "";
    switch (props.size) {
      case "small":
        sizeStyles = `
          padding: ${theme.variables.offsets.elementContent.mobile / 2}px ${theme.variables.offsets.elementContent.mobile
          }px;
          font-size: 12px; /* Можно заменить на theme.font.size с модификатором */
        `;
        break;
      case "medium":
        sizeStyles = `
          padding: ${theme.variables.offsets.elementContent.mobile}px ${theme.variables.offsets.elementContent.mobile * 2
          }px;
          font-size: 14px; /* Можно заменить на theme.font.size */
        `;
        break;
      case "large":
        sizeStyles = `
          padding: ${theme.variables.offsets.elementContent.mobile * 1.5}px ${theme.variables.offsets.elementContent.mobile * 3
          }px;
          font-size: 16px; /* Можно заменить на theme.font.size с модификатором */
        `;
        break;
      case "icon":
        sizeStyles = `
          padding: ${theme.variables.offsets.elementContent.mobile}px;
          width: 32px;
          height: 32px;
        `;
        break;
      default:
        sizeStyles = `
          padding: ${theme.variables.offsets.elementContent.mobile}px ${theme.variables.offsets.elementContent.mobile * 2
          }px;
          font-size: 14px;
        `;
    }

    return `
      ${weightStyles}
      ${sizeStyles}
    `;
  }}
`;

const Button: React.FC<ButtonProps> = ({
  icon,
  iconPosition = "left",
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
  const isIconOnly = icon && !hasContent && !isLoading;
  const effectiveSize = isIconOnly ? "icon" : size;

  return (
    <StyledButton
      className={className}
      tone={tone}
      weight={weight}
      size={effectiveSize}
      $fullWidth={$fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader size="small" />}
      {!isLoading && icon && iconPosition === "left" && (
        <LucideIcon name={icon} />
      )}
      {hasContent && (
        <span>
          {text}
          {children}
        </span>
      )}
      {!isLoading && icon && iconPosition === "right" && (
        <LucideIcon name={icon} />
      )}
    </StyledButton>
  );
};

export { Button };
