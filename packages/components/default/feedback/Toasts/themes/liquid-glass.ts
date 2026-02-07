import type { DefaultTheme } from "styled-components";
import { css, keyframes } from "styled-components";

const floatUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Floating Bubble */
  background: rgb(255 255 255 / 10%);
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 15%);
  color: ${({ theme }) => theme?.colors?.text || 'white'};
  animation: ${floatUp} 0.4s ease-out forwards;

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'positive' && css`
    border-left: 4px solid ${theme?.colors?.success || 'green'};
    background: linear-gradient(90deg, rgb(76 175 80 / 10%) 0%, rgb(255 255 255 / 5%) 100%);
  `}
  
  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'negative' && css`
    border-left: 4px solid ${theme?.colors?.error || 'red'};
    background: linear-gradient(90deg, rgb(244 67 54 / 10%) 0%, rgb(255 255 255 / 5%) 100%);
  `}

  button {
    background: rgb(255 255 255 / 10%);
    border: none;
    border-radius: 50%;
    width: 24px; 
    height: 24px;
    display: flex; 
    align-items: center; 
    justify-content: center;
    cursor: pointer;
    color: inherit;
    &:hover { background: rgb(255 255 255 / 30%); }
  }
`;
