import { css, keyframes } from "styled-components";

const vikingRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const vikingTheme = css`
  display: flex;
  justify-content: center;
  align-items: center;

  img, svg {
    filter: drop-shadow(${({ theme }) => theme.effects.glow.medium});
    animation: ${vikingRotate} 3s linear infinite;
  }
`;
