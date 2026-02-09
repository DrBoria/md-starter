import { css } from "styled-components";

export const vikingTheme = css`
  box-shadow: ${({ theme }) => theme.effects.depth.inner.strong};
  border-top: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  background-image: ${({ theme }) => theme.effects.texture};
`;
