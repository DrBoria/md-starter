import { css } from "styled-components";

export const liquidGlassTheme = css`
  background-color: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  .switch-slider {
     background-color: transparent;
     
     &::before {
        box-shadow: ${({ theme }) => theme.shadows.small};
        background: ${({ theme }) => theme.colors.highlightedText};
     }
  }

  input:checked + .switch-slider {
     background-color: ${({ theme }) => theme.colors.successBackground};
  }
`;
