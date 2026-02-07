import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Stone Tabs */
  
  /* Container overrides */
  &[data-orientation="vertical"] {
     border: 4px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
     border-image: linear-gradient(to bottom, #8B4513, #555) 1;
     background: ${({ theme }) => theme?.colors?.section || '#222'};
  }

  &[data-orientation="horizontal"] {
     /* Horizontal specific */
  }

  /* List overrides */
  .tab-list {
     background: ${({ theme }) => theme.colors.overlay};
     
     &[data-orientation="vertical"] {
        border-right: 2px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
     }
  }

  /* Tab Item */
  .tab-button {
     font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
     text-transform: uppercase;
     background: transparent;
     color: ${({ theme }) => theme?.colors?.sectionContent || '#aaa'};
     border: none;
     border-radius: 0;
     margin: 0;
     
     &:hover {
         color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
         text-shadow: 0 0 5px ${({ theme }) => theme?.colors?.highlighted || 'gold'};
     }

     &[data-state="active"] {
         background: ${({ theme }) => theme?.colors?.section || '#222'};
         color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
         
         &[data-orientation="horizontal"] {
            border-bottom: 3px solid ${({ theme }) => theme?.colors?.highlighted || 'gold'};
         }
         
         &[data-orientation="vertical"] {
            border-left: 4px solid ${({ theme }) => theme?.colors?.highlighted || 'gold'};
            background: linear-gradient(90deg, rgb(255 215 0 / 10%), transparent);
         }
     }
  }
`;
