import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Scroll Parchment */
  background: ${({ theme }) => theme.colors.surface};
  border: 4px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
  border-image: linear-gradient(to bottom, #8B4513, #555) 1;
  box-shadow: inset 0 0 20px rgb(0 0 0 / 80%);
  font-family: 'Courier New', Courier, monospace;

  /* Code area styling override if possible via container */
  pre, textarea {
    color: ${({ theme }) => theme?.colors?.text || 'white'} !important;
    text-shadow: 0 0 2px black;
  }
`;
