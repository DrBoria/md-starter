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
        let weightStyles = css`/* empty */`;
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

        let sizeStyles = css`/* empty */`;
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

      /* Theme Overrides */
      ${theme?.theme === 'viking' && vikingTheme}
      ${theme?.theme === 'liquid-glass' && liquidGlassTheme}
    `;
    }}
`;
