import { css, keyframes } from "styled-components";

const liquidPulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

export const liquidGlassTheme = css`
  img, svg {
    filter: drop-shadow(${({ theme }) => theme.effects.glow.soft});
    animation: ${liquidPulse} 1.5s ease-in-out infinite;
  }
`;
