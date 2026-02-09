import { css } from "styled-components";

export const liquidGlassTheme = css<{ $active?: boolean }>`
  /* LIQUID GLASS THEME: Pagination */
  background: rgb(255 255 255 / 10%);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $active }) => $active && css`
      background: rgb(255 255 255 / 30%);
      box-shadow: 0 0 10px rgb(255 255 255 / 40%);
      border-color: white;
  `}

  &:hover {
      background: rgb(255 255 255 / 20%);
      transform: scale(1.1);
  }
`;
