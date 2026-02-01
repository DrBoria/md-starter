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
  height: ${({ theme }) => theme?.elements?.form?.height || 'auto'};
  gap: ${(props) =>
    props.$size !== "icon"
      ? `${props.theme?.variables?.offsets?.betweenElements?.mobile || 0}px`
      : "0"};
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => {
    const { theme, $tone: tone, $weight: weight, $size: size } = props;

    // Стили для веса кнопки
    let weightStyles = css``;
    const color = (() => {
      switch (tone) {
        case "active":
          return theme?.colors?.highlighted || 'blue';
        case "passive":
          return theme?.colors?.section || 'gray';
        case "negative":
          return theme?.colors?.errorBackground || 'red';
        case "neutral":
          return theme?.colors?.labelBackground || 'lightgray';
        case "positive":
          return theme?.colors?.successBackground || 'green';
        case "warning":
          return theme?.colors?.warningBackground || 'orange';
        case "help":
          return theme?.colors?.overlayActive || 'lightblue';
        default:
          return theme?.colors?.section || 'gray';
      }
    })();

    const colorText = (() => {
      switch (tone) {
        case "active":
          return theme?.colors?.highlightedText || 'white';
        case "passive":
          return theme?.colors?.sectionContent || 'black';
        case "negative":
          return theme?.colors?.errorText || 'white';
        case "neutral":
          return theme?.colors?.sectionContent || 'black';
        case "positive":
          return theme?.colors?.successText || 'white';
        case "warning":
          return theme?.colors?.warningText || 'white';
        case "help":
          return theme?.colors?.sectionContent || 'black';
        default:
          return theme?.colors?.sectionContent || 'black';
      }
    })();

    switch (weight) {
      case "bold":
        weightStyles = css`
          background-color: ${color};
          color: ${colorText};
        `;
        break;
      case "outline":
      case "hollow":
        weightStyles = css`
          border: ${theme?.variables?.border?.size || 1}px solid ${colorText};
          background-color: transparent;
          color: ${colorText};
        `;
        break;
      case "light":
        weightStyles = css`
          background-color: transparent;
          color: ${colorText};
        `;
        break;
      case "link":
        weightStyles = css`
          background-color: transparent;
          color: ${colorText};
          text-decoration: underline;
        `;
        break;
      case "none":
        weightStyles = css`
          background-color: transparent;
          color: inherit;
        `;
        break;
      default:
        weightStyles = css`
          background-color: ${color};
          color: ${colorText};
        `;
    }

    let sizeStyles = css``;
    const getOffset = (val: string | number | undefined) => typeof val === 'number' ? val : parseInt(val || '8', 10);
    const mobileOffset = getOffset(theme?.variables?.offsets?.elementContent?.mobile);

    switch (size) {
      case "small":
        sizeStyles = css`
          padding: ${mobileOffset / 2}px ${mobileOffset}px;
          font-size: 12px;
        `;
        break;
      case "medium":
        sizeStyles = css`
          padding: ${mobileOffset}px ${mobileOffset * 2}px;
          font-size: 14px;
        `;
        break;
      case "large":
        sizeStyles = css`
          padding: ${mobileOffset * 1.5}px ${mobileOffset * 3}px;
          font-size: 16px;
        `;
        break;
      case "icon":
        sizeStyles = css`
          padding: ${mobileOffset}px;
          width: 32px;
          height: 32px;
        `;
        break;
      default:
        sizeStyles = css`
          padding: ${mobileOffset}px ${mobileOffset * 2}px;
          font-size: 14px;
        `;
    }

    return css`
      ${weightStyles}
      ${sizeStyles}

      /* Viking Theme Overrides */
      ${theme?.theme === 'viking' && css`
        /* VIKING THEME AUGMENTATION (Valhalla Style) */
        /* 1. Geometry: Rough Stone */
        border-radius: 0;
        ${theme?.geometry?.ragged && `clip-path: ${theme.geometry.ragged};`}
        
        /* 2. Typography: Glow on hover */
        font-family: ${theme?.colors?.fontFamily || theme?.fontFamily || theme?.font?.family?.text || 'serif'};
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 700;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* Ensure text is bright and can glow */
        color: ${theme?.colors?.highlightedText || 'white'};
        span {
          color: inherit;
          transition: text-shadow 0.2s ease;
        }
        
        /* 3. Material: Etched Stone with Texture */
        background: ${theme?.colors?.highlighted || 'gold'};
        background-image: ${theme?.effects?.texture}; /* NOISE */
        border: none; 

        /* 4. Volume: Highlight top, Shadow bottom */
        box-shadow: 
          inset 0 1px 0 rgba(255,255,255,0.4), 
          0 4px 0 rgba(0,0,0,0.5),
          ${theme?.effects?.glow?.soft};

        /* Tone Overrides */
        ${tone === 'passive' && css`
          background: ${theme?.colors?.labelBackground || 'gray'};
          background-image: ${theme?.effects?.texture};
          color: ${theme?.colors?.sectionContent || 'white'}; 
        `}

        ${tone === 'warning' && css`
          background: ${theme?.colors?.warning || 'orange'};
          background-image: ${theme?.effects?.texture};
          color: ${theme?.colors?.warningText || 'white'};
        `}

        /* 5. Interaction: Glow & Cracks */
        &:hover {
          filter: brightness(1.2);
          transform: translateY(-2px);
          box-shadow: 
            inset 0 1px 0 rgba(255,255,255,0.5), 
            0 6px 0 rgba(0,0,0,0.5),
            ${theme?.effects?.glow?.medium};
          
          /* Text/Number glow - CRITICAL FIX */
          span, svg {
            color: ${theme?.colors?.highlightedText || 'white'};
            filter: drop-shadow(0 0 5px ${theme?.colors?.highlighted || 'white'});
            text-shadow: 0 0 10px ${theme?.colors?.highlighted || 'white'};
          }
        }

        &:active {
          transform: translateY(2px);
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.7); 
          filter: brightness(0.8);
          
          /* Crack effect on click */
          &::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: ${theme?.effects?.cracks};
            background-size: cover;
            opacity: 0.6;
            pointer-events: none;
          }
        }

        /* 6. Decorative Frame (Simplified Knotwork) */
        &::after {
            content: '';
            position: absolute;
            inset: 2px;
            pointer-events: none;
            border: 1px solid ${theme?.colors?.highlighted || 'gold'};
            opacity: 0.2;
            clip-path: ${theme?.geometry?.ragged};
        }

        &:hover::after {
            opacity: 0.6;
            box-shadow: inset 0 0 10px ${theme?.colors?.highlighted || 'gold'}30;
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
      {isLoading && <Loader $size="small" />}
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
