import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Glass Tabs */
  
  /* Container */
  &[data-orientation="vertical"] {
     background: rgb(255 255 255 / 5%);
     backdrop-filter: blur(10px);
     border: 1px solid rgb(255 255 255 / 10%);
     border-radius: 16px;
  }

  /* List */
  .tab-list {
     background: rgb(0 0 0 / 10%);
     
     &[data-orientation="vertical"] {
        border-right: 1px solid rgb(255 255 255 / 10%);
     }
  }

  /* Tab Item */
  .tab-button {
     transition: all 0.3s ease;
     opacity: 0.7;
     border-radius: 8px;
     margin: 4px;
     
     &:hover {
         background: rgb(255 255 255 / 10%);
         opacity: 1;
     }

     &[data-state="active"] {
         opacity: 1;
         background: rgb(255 255 255 / 20%);
         box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
         
         &[data-orientation="horizontal"] {
            /* Pill style already handled */
         }
         
         &[data-orientation="vertical"] {
            border-left: 2px solid white;
         }
     }
  }
`;
