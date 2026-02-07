import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Glass Field */
  background: rgb(255 255 255 / 5%);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 8px;
  color: ${({ theme }) => theme?.colors?.text || 'white'};
  transition: all 0.3s ease;
  
  &::placeholder {
      color: rgb(255 255 255 / 40%);
  }

  &:focus {
      outline: none;
      background: rgb(255 255 255 / 10%);
      border-color: rgb(255 255 255 / 40%);
      box-shadow: 0 0 15px rgb(255 255 255 / 10%);
  }
`;
