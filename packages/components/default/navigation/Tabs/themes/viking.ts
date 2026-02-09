import { css } from "styled-components";

export const vikingTheme = css`
  &[data-orientation="vertical"] {
     border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
     background: ${({ theme }) => theme.colors.section};
  }

  .tab-list {
     background: ${({ theme }) => theme.colors.overlay};
     
     &[data-orientation="vertical"] {
        border-right: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
     }
  }

  .tab-button {
     font-family: ${({ theme }) => theme.fontFamily};
     text-transform: uppercase;
     background: transparent;
     color: ${({ theme }) => theme.colors.sectionContent};
     border: none;
     border-radius: 0;
     margin: 0;
     
     &:hover {
         color: ${({ theme }) => theme.colors.highlighted};
         text-shadow: ${({ theme }) => theme.effects.glow.small};
     }

     &[data-state="active"] {
         background: ${({ theme }) => theme.colors.section};
         color: ${({ theme }) => theme.colors.highlighted};
         
         &[data-orientation="horizontal"] {
            border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
         }
         
         &[data-orientation="vertical"] {
            border-left: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
            background: ${({ theme }) => theme.colors.overlayActive};
         }
     }
  }
`;
