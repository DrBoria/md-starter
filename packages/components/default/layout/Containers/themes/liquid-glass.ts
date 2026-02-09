import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border-top: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
`;
