import { css } from "styled-components";

export const liquidGlassTheme = css`
  &[data-orientation="vertical"] {
     background: ${({ theme }) => theme.colors.overlay};
     backdrop-filter: ${({ theme }) => theme.effects.texture};
     border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
     border-radius: ${({ theme }) => theme.border.radius}px;
  }

  .tab-list {
     background: ${({ theme }) => theme.colors.overlayActive};
     
     &[data-orientation="vertical"] {
        border-right: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlay};
     }
  }

  .tab-button {
     transition: all 0.3s ease;
     opacity: 0.7;
     border-radius: ${({ theme }) => theme.border.radius}px;
     margin: ${({ theme }) => theme.offsets.elementContent};
     
     &:hover {
         background: ${({ theme }) => theme.colors.overlay};
         opacity: 1;
     }

     &[data-state="active"] {
         opacity: 1;
         background: ${({ theme }) => theme.colors.overlayActive};
         box-shadow: ${({ theme }) => theme.shadows.small};
         
         &[data-orientation="vertical"] {
            border-left: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
         }
     }
  }
`;
