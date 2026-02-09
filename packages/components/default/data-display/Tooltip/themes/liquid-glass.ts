import { css, keyframes } from "styled-components";

const floatUp = keyframes`
  from { opacity: 0; transform: translate(-50%, 5px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  color: ${({ theme }) => theme.colors.sectionContent};
  box-shadow: ${({ theme }) => theme.shadows.small};
  animation: ${floatUp} 0.3s ease-out forwards;
`;
