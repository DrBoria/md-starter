import React from "react";
import styled, { css } from "styled-components";
import type { IconName } from "../../common/Icons";
import { LucideIcon } from "../../common/Icons";
import { Loader } from "../../feedback/Spinner";

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
  $tone: ButtonTone;
  $weight: ButtonWeight;
  $size: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  gap: ${(props) =>
    props.$size !== "icon"
      ? `${props.theme.variables.offsets.betweenElements.mobile}px`
      : "0"};
  border-radius: ${({ theme }) => theme.border.radius}px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => {
    const { theme, $tone: tone, $weight: weight } = props;

    const color = (() => {
      switch (tone) {
        case "active":
          return theme.colors.highlighted;
        case "passive":
          return theme.colors.section;
        case "negative":
          return theme.colors.errorBackground;
        case "neutral":
          return theme.colors.labelBackground;
        case "positive":
          return theme.colors.successBackground;
        case "warning":
          return theme.colors.warningBackground;
        case "help":
          return theme.colors.overlayActive;
        default:
          return theme.colors.section;
      }
    })();

    const colorText = (() => {
      switch (tone) {
        case "active":
          return theme.colors.highlightedText;
        case "passive":
          return theme.colors.sectionContent;
        case "negative":
          return theme.colors.errorText;
        case "neutral":
          return theme.colors.sectionContent;
        case "positive":
          return theme.colors.successText;
        case "warning":
          return theme.colors.warningText;
        case "help":
          return theme.colors.sectionContent;
        default:
          return theme.colors.sectionContent;
      }
    })();

    // Стили для веса кнопки
    let weightStyles = "";
    switch (weight) {
      case "bold":
        weightStyles = `
          background-color: ${color};
          color: ${colorText};
        `;
        break;
      case "outline":
      case "hollow":
        weightStyles = `
          border: ${theme.variables.border.size}px solid ${colorText};
          background-color: transparent;
          color: ${colorText};
        `;
        break;
      case "light":
        weightStyles = `
          background-color: transparent;
          color: ${colorText};
        `;
        break;
      case "link":
        weightStyles = `
          background-color: transparent;
          color: ${colorText};
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
          color: ${colorText};
        `;
    }

    let sizeStyles = "";
    switch (props.$size) {
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

      /* Viking Theme Overrides */
      /* Viking Theme Overrides */
      ${({ theme, $tone }) => theme.theme === 'viking' && css`
        /* VIKING THEME AUGMENTATION (North UI) */
        /* 1. Geometry (Runes) */
        border-radius: 0;
        ${theme.colors.geometry?.cut && `clip-path: ${theme.colors.geometry.cut};`}
        
        /* 2. Typography (Cinzel) */
        font-family: ${theme.colors.fontFamily || 'serif'};
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 700;
        
        /* 3. Material (Etched Metal) */
        /* Base: "Active" Gold (highlighted) or "Passive" Steel (labelBackground) */
        background: linear-gradient(
            180deg, 
            ${theme.colors.highlighted} 0%, 
            color-mix(in srgb, ${theme.colors.highlighted}, black 20%) 100%
        );
        color: ${theme.colors.highlightedText};
        border: none; 

        /* 4. Volume (Highlight top, Shadow bottom) */
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 0 rgba(0,0,0,0.3);

        /* Tone Overrides */
        ${$tone === 'passive' && css`
          background: linear-gradient(
            180deg, 
            ${theme.colors.labelBackground} 0%, 
            color-mix(in srgb, ${theme.colors.labelBackground}, black 30%) 100%
          );
          color: ${theme.colors.sectionContent}; 
        `}

        ${$tone === 'warning' && css`
          background: linear-gradient(
            180deg, 
            ${theme.colors.warning} 0%, 
            color-mix(in srgb, ${theme.colors.warning}, black 20%) 100%
          );
          color: ${theme.colors.warningText};
        `}

        /* Interaction Physics */
        &:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: ${theme.colors.effects?.glow?.medium || `0 0 15px ${theme.colors.highlighted}60`};
        }

        &:active {
          transform: translateY(2px);
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); 
          filter: brightness(0.95);
        }

        /* 5. Decorative Frame (Knotwork) */
        &::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            
            /* Frame */
            border: 2px solid ${theme.colors.highlighted};
            opacity: 0.3;
            
            /* Cut corners for frame */
            clip-path: polygon(
                0 8px, 8px 0, 
                calc(100% - 8px) 0, 100% 8px, 
                100% calc(100% - 8px), calc(100% - 8px) 100%, 
                8px 100%, 0 calc(100% - 8px)
            );
        }

        /* HOVER Frame */
        &:hover::after {
            opacity: 1;
            box-shadow: ${theme.colors.effects?.glow?.medium}; 
        }
      `}
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
      $tone={tone}
      $weight={weight}
      $size={effectiveSize}
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
