import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  box-shadow: ${({ theme }) => theme.effects.depth.outer.strong};
  color: ${({ theme }) => theme.colors.sectionContent};
  
  .close-button {
      background: ${({ theme }) => theme.colors.overlay};

      &:hover {
          background: ${({ theme }) => theme.colors.overlayActive};
          transform: rotate(90deg);
      }
  }
`;
