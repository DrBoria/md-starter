import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Runestone Carvings */
  
  /* Titles/Headings */

  /* Titles/Headings */
  h1, h2, h3, h4, .subtitle, .section-title, .page-title {
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.colors.highlighted};
    text-shadow: 2px 2px 0 rgb(0 0 0 / 50%);
  }

  /* Plain Text */
  p, span, .plain-text {
    font-family: sans-serif;
    color: ${({ theme }) => theme.colors.sectionContent};
  }

  /* Labels */
  label {
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.sectionContent};
    padding: 4px 8px;
    color: ${({ theme }) => theme.colors.labelText || theme.colors.sectionContent};
    background-color: ${({ theme }) => theme.colors.labelBackground || 'transparent'};
  }

  /* Highlighted */
  .highlighted {
    color: ${({ theme }) => theme.colors.highlighted};
    font-weight: bold;
    text-shadow: ${({ theme }) => theme?.effects?.glow?.soft};
  }
`;
