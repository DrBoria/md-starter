import { css, keyframes } from "styled-components";

const floatUp = keyframes`
  from { opacity: 0; transform: translate(-50%, 5px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Float Bubble */
  background: rgb(255 255 255 / 10%);
  backdrop-filter: blur(8px);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 12px;
  color: ${({ theme }) => theme?.colors?.text || 'white'};
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  animation: ${floatUp} 0.3s ease-out forwards;
`;
