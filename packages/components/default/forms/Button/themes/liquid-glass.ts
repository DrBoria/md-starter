import { css } from "styled-components";

export const liquidGlassTheme = css<{ $tone?: string }>`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  background: ${({ theme }) => theme.colors.overlay};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-family: ${({ theme }) => theme.fontFamily};
  
  ${({ $tone, theme }) => {
    switch ($tone) {
      case "active":
        return css`background: ${theme.colors.overlayActive}; border-color: ${theme.colors.highlighted}; color: ${theme.colors.highlighted};`;
      case "positive":
        return css`background: ${theme.colors.successBackground}; border-color: ${theme.colors.successText}; color: ${theme.colors.successText};`;
      case "negative":
        return css`background: ${theme.colors.errorBackground}; border-color: ${theme.colors.errorText}; color: ${theme.colors.errorText};`;
      default:
        return css`background: ${theme.colors.overlay}; color: ${theme.colors.sectionContent};`;
    }
  }}

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.overlayActive};
    border-color: ${({ theme }) => theme.colors.highlighted};
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`;
