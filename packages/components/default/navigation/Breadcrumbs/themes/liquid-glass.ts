import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  padding: ${({ theme }) => theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
`;
