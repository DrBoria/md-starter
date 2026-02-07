import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Code Terminal */
  background: rgb(0 0 0 / 30%);
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 8px;
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 15%);
  
  pre, textarea {
    color: #a5f3fc !important; /* Cyan-ish for text */
  }
`;
