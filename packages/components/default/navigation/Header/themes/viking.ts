import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Header */
  background: ${({ theme }) => theme?.colors?.section || '#222'};
  border-bottom: 4px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
  border-image: linear-gradient(to right, #8B4513, #555, #8B4513) 1;
  box-shadow: 0 4px 15px rgb(0 0 0 / 80%);
  
  /* Texture */
  background-image: ${({ theme }) => theme?.effects?.texture};
`;
