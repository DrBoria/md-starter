import styled, { css } from "styled-components";
import type { ButtonSize, ButtonTone, ButtonWeight } from "./index";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const StyledButton = styled.button<{
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
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  height: ${({ theme }) => theme.elements.form.height};
  ${({ $size, theme }) => $size !== "icon" && css`gap: ${theme.offsets.betweenElements};`}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${(props) => {
        const { theme, $tone: tone, $weight: weight, $size: size } = props;

        // Стили для веса кнопки
        let weightStyles = css`/* empty */`;
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
          border: ${theme.border.size} solid ${colorText};
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

        let sizeStyles = css`/* empty */`;

        switch (size) {
            case "small":
                sizeStyles = css`
          padding: ${theme.offsets.elementContent};
          font-size: ${theme.font.sizes.small};
        `;
                break;
            case "medium":
                sizeStyles = css`
          padding: ${theme.offsets.elementContent};
          font-size: ${theme.font.sizes.regular};
        `;
                break;
            case "large":
                sizeStyles = css`
          padding: ${theme.offsets.section};
          font-size: ${theme.font.sizes.regular};
        `;
                break;
            case "icon":
                sizeStyles = css`
          padding: ${theme.offsets.elementContent};
          width: ${theme.elements.icons.width};
          height: ${theme.elements.icons.height};
        `;
                break;
            default:
                sizeStyles = css`
          padding: ${theme.offsets.elementContent};
          font-size: ${theme.font.sizes.regular};
        `;
        }

        return css`
      ${weightStyles}
      ${sizeStyles}

      /* Theme Overrides */
      ${theme?.theme === 'viking' && vikingTheme}
      ${theme?.theme === 'liquid-glass' && liquidGlassTheme}
    `;
    }}
`;
