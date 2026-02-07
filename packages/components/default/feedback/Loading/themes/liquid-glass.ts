import { css, keyframes } from "styled-components";

const liquidPulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
`;

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Pulsing Orb */
  
  /* We might want a different SVG for liquid glass, but we'll apply effects to the existing one */
  img, svg {
    filter: blur(1px) drop-shadow(0 0 5px rgb(255 255 255 / 50%));
    animation: ${liquidPulse} 1.5s ease-in-out infinite;
  }
`;
