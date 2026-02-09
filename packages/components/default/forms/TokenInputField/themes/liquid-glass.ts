import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  padding: ${({ theme }) => theme.offsets.section};
  
  label {
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.font.sizes.small};
    letter-spacing: ${({ theme }) => theme.font.spacing};
    opacity: 0.8;
  }
`;
