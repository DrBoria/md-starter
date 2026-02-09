import { css, keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
`;

export const liquidGlassTheme = css<{ $tone?: string }>`
  /* LIQUID GLASS THEME: Floating Pills */
  background: rgb(255 255 255 / 10%);
  backdrop-filter: blur(5px);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  padding: 4px 12px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgb(0 0 0 / 5%);
  
  .status-dot {
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 20%);
  }

  ${({ $tone }: { $tone?: string }) => $tone === 'processing' && css`
      background: rgb(3 169 244 / 10%);
      border-color: rgb(3 169 244 / 30%);
      color: #03a9f4;
      
      .status-dot {
        background-color: #03a9f4;
        animation: ${pulseAnimation} 2s infinite;
      }
  `}

  ${({ $tone }: { $tone?: string }) => $tone === 'success' && css`
      background: rgb(76 175 80 / 10%);
      border-color: rgb(76 175 80 / 30%);
      color: #4caf50;
      .status-dot { background-color: #4caf50; }
  `}

  ${({ $tone }: { $tone?: string }) => $tone === 'failed' && css`
      background: rgb(244 67 54 / 10%);
      border-color: rgb(244 67 54 / 30%);
      color: #f44336;
      .status-dot { background-color: #f44336; }
  `}
`;
