import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: BasicSection (Cave/Stone Hall) */
  box-shadow: inset 0 0 20px rgb(0 0 0 / 80%);
  border-top: 1px solid ${({ theme }) => theme?.colors?.disabled || '#555'};
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.disabled || '#555'};
  background-image: ${({ theme }) => theme?.effects?.texture};
  
  /* Additional decorative elements could be added via ::before/::after */
`;
