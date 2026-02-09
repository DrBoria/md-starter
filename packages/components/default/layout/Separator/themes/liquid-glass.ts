import { css } from "styled-components";

export const liquidGlassTheme = css`
  height: ${({ theme }) => theme.border.size}px;
  background: ${({ theme }) => theme.colors.overlayActive};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin: ${({ theme }) => theme.offsets.section} 0;
`;
