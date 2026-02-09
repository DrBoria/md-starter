import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;
