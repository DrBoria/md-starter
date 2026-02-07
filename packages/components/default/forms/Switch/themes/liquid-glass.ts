import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Switch (Glass Pill) */
  
  background-color: rgb(255 255 255 / 10%);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  
  .switch-slider {
     background-color: transparent;
     
     &::before {
        box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
        background: white;
     }
  }

  input:checked + .switch-slider {
     background-color: rgb(0 255 0 / 20%); /* Green tint */
  }
`;
