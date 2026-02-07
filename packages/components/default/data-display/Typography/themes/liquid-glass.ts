import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Modern Clean */
  
  /* Titles */
  h1, h2, h3, h4, .subtitle, .section-title, .page-title {
    font-family: sans-serif;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: ${({ theme }) => theme?.colors?.text || 'white'};
    background: linear-gradient(135deg, #fff 0%, #aaa 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgb(0 0 0 / 10%);
  }

  /* Labels */
  label {
    background: rgb(255 255 255 / 10%);
    backdrop-filter: blur(4px);
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 4px;
    color: ${({ theme }) => theme?.colors?.text || 'white'};
  }
`;
