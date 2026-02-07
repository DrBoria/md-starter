import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Separator */
  height: 4px;
  background: transparent;
  background-image: linear-gradient(to right, transparent, ${({ theme }) => theme?.colors?.disabled || '#555'}, transparent);
  border-radius: 50%;
  margin: 16px 0;
  
  &::after {
    content: '♦';
    display: block;
    text-align: center;
    position: relative;
    top: -10px;
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    background: ${({ theme }) => theme.colors.surface};
    width: 20px;
    margin: 0 auto;
  }
`;
