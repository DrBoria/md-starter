import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Link */
  color: ${({ theme }) => theme?.colors?.text || 'white'};
  text-decoration: none;
  border-bottom: 1px dotted rgb(255 255 255 / 50%);
  transition: all 0.2s;
  
  &:hover {
    border-bottom: 1px solid white;
    box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
    background: rgb(255 255 255 / 5%);
    border-radius: 4px;
    padding: 0 2px;
  }
`;
