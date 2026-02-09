import type { DefaultTheme } from "styled-components";
import { css, keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  color: ${({ theme }) => theme.colors.sectionContent};
  font-family: ${({ theme }) => theme.fontFamily};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.font.spacing};
  padding: ${({ theme }) => theme.offsets.elementContent};
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
  
  .status-dot {
    box-shadow: ${({ theme }) => theme.effects.glow.small};
    border-radius: 0;
    transform: rotate(45deg);
  }

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'processing' && css`
     border-color: ${theme.colors.highlighted};
     color: ${theme.colors.highlighted};
     .status-dot { animation: ${pulseAnimation} 2s infinite; }
  `}

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'success' && css`
     border-color: ${theme.colors.successText};
     color: ${theme.colors.successText};
  `}

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'failed' && css`
     border-color: ${theme.colors.errorText};
     color: ${theme.colors.errorText};
  `}
`;
