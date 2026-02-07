import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Field Container */
  border: 4px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
  border-image: linear-gradient(to bottom, #8B4513, #555) 1;
  background: ${({ theme }) => theme?.colors?.surface || '#2c2c2c'};
  padding: 16px;
  
  label {
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    text-shadow: 0 0 2px black;
  }
`;
