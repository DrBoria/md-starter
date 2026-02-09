import { css } from "styled-components";

export const liquidGlassTheme = css<{ $active?: boolean }>`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: 50%;
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $active, theme }) => $active && css`
      background: ${theme.colors.overlayActive};
      box-shadow: ${theme.effects.glow.soft};
      border-color: ${theme.colors.sectionContent};
  `}

  &:hover {
      background: ${({ theme }) => theme.colors.overlayActive};
      transform: scale(1.1);
  }
`;
