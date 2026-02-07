import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Modal */
  background: rgb(40 40 40 / 70%);
  backdrop-filter: blur(20px);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 20px;
  box-shadow: 0 20px 50px rgb(0 0 0 / 30%);
  color: white;
  
  .close-button {
      background: rgb(255 255 255 / 10%);

      &:hover {
          background: rgb(255 255 255 / 20%);
          transform: rotate(90deg);
      }
  }
`;
