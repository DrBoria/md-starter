import { css } from "styled-components";

export const vikingTheme = css`
  height: ${({ theme }) => theme.border.size}px;
  background: transparent;
  background-image: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.disabled}, transparent);
  border-radius: 50%;
  margin: ${({ theme }) => theme.offsets.section} 0;
  
  &::after {
    content: '♦';
    display: block;
    text-align: center;
    position: relative;
    top: ${({ theme }) => theme.offsets.elementContent};
    color: ${({ theme }) => theme.colors.highlighted};
    background: ${({ theme }) => theme.colors.section};
    width: ${({ theme }) => theme.elements.icons.width};
    margin: 0 auto;
  }
`;
