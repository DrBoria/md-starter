import type { DefaultTheme } from "styled-components";
import { css, keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const vikingTheme = css`
  /* VIKING THEME: Rune Stone Markers */
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
  color: ${({ theme }) => theme?.colors?.text || '#eee'};
  font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 12px;
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%); /* Rough cut */
  
  /* Status Dot becomes a Rune Glow */
  .status-dot {
    box-shadow: 0 0 5px currentcolor;
    border-radius: 0; /* Square rune */
    transform: rotate(45deg);
  }

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'processing' && css`
     border-color: ${theme?.colors?.highlighted || 'cyan'};
     color: ${theme?.colors?.highlighted || 'cyan'};
     .status-dot { animation: ${pulseAnimation} 2s infinite; }
  `}

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'success' && css`
     border-color: ${theme?.colors?.success || 'green'};
     color: ${theme?.colors?.successText || 'green'};
  `}

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'failed' && css`
     border-color: ${theme?.colors?.error || 'red'};
     color: ${theme?.colors?.errorText || 'red'};
  `}
`;
