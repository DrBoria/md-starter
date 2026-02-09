import { css, keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% { box-shadow: ${({ theme }) => theme.effects.glow.soft}; }
  70% { box-shadow: none; }
  100% { box-shadow: none; }
`;

export const liquidGlassTheme = css<{ $tone?: string }>`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  padding: ${({ theme }) => theme.offsets.elementContent};
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  .status-dot {
    box-shadow: ${({ theme }) => theme.effects.depth.inner.soft};
  }

  ${({ $tone, theme }) => $tone === 'processing' && css`
      background: ${theme.colors.overlay};
      border-color: ${theme.colors.highlighted};
      color: ${theme.colors.highlighted};
      
      .status-dot {
        background-color: ${theme.colors.highlighted};
        animation: ${pulseAnimation} 2s infinite;
      }
  `}

  ${({ $tone, theme }) => $tone === 'success' && css`
      background: ${theme.colors.successBackground};
      border-color: ${theme.colors.successText};
      color: ${theme.colors.successText};
      .status-dot { background-color: ${theme.colors.successText}; }
  `}

  ${({ $tone, theme }) => $tone === 'failed' && css`
      background: ${theme.colors.errorBackground};
      border-color: ${theme.colors.errorText};
      color: ${theme.colors.errorText};
      .status-dot { background-color: ${theme.colors.errorText}; }
  `}
`;
