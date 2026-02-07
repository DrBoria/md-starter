import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Red Alert */
  background: rgb(244 67 54 / 10%);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgb(244 67 54 / 20%);
  color: ${({ theme }) => theme?.colors?.errorText || '#ff6b6b'};
  backdrop-filter: blur(4px);
  margin-top: 4px;
  font-size: 0.85rem;
  box-shadow: 0 2px 4px rgb(244 67 54 / 10%);
`;
