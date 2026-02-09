import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  color: ${({ theme }) => theme.colors.sectionContent};
  transition: all 0.3s ease;
  
  &::placeholder {
      color: ${({ theme }) => theme.colors.disabled};
  }

  &:focus {
      outline: none;
      background: ${({ theme }) => theme.colors.overlayActive};
      border-color: ${({ theme }) => theme.colors.highlighted};
      box-shadow: ${({ theme }) => theme.effects.glow.soft};
  }
`;
