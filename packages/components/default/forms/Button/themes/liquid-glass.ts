import { css } from "styled-components";

export const liquidGlassTheme = css<{ $tone?: string }>`
  /* LIQUID GLASS THEME */
  border-radius: ${({ theme }) => theme?.borderRadius || '12px'};
  backdrop-filter: blur(10px);
  background: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 20%);
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-family: ${({ theme }) => theme?.fontFamily || 'sans-serif'};
  
  /* Glass gradient based on tone */
  ${({ $tone, theme }) => {
    switch ($tone) {
      case "active":
        return css`background: linear-gradient(135deg, rgb(255 255 255 / 10%) 0%, rgb(255 255 255 / 5%) 100%); border-color: ${theme?.colors?.highlighted || 'rgba(0,123,255,0.5)'}; color: ${theme?.colors?.highlighted || 'black'};`;
      case "positive":
        return css`background: linear-gradient(135deg, rgb(76 175 80 / 20%) 0%, rgb(76 175 80 / 10%) 100%); border-color: rgb(76 175 80 / 40%); color: ${theme?.colors?.successText || 'green'};`;
      case "negative":
        return css`background: linear-gradient(135deg, rgb(244 67 54 / 20%) 0%, rgb(244 67 54 / 10%) 100%); border-color: rgb(244 67 54 / 40%); color: ${theme?.colors?.errorText || 'red'};`;
      default:
        return css`background: rgb(255 255 255 / 5%); color: ${theme?.colors?.sectionContent || 'black'};`;
    }
  }}

  &:hover {
    transform: translateY(-2px);
    background: rgb(255 255 255 / 20%);
    border-color: rgb(255 255 255 / 40%);
    box-shadow: 0 8px 15px rgb(0 0 0 / 10%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  }
`;
