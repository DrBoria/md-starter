import type { DefaultTheme } from "styled-components";
import { css, keyframes } from "styled-components";

const floatUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  border-radius: ${({ theme }) => theme.border.radius}px;
  box-shadow: ${({ theme }) => theme.effects.depth.outer.medium};
  color: ${({ theme }) => theme.colors.sectionContent};
  animation: ${floatUp} 0.4s ease-out forwards;

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'positive' && css`
    border-left: calc(${theme.border.size} * 4) solid ${theme.colors.successText};
  `}

  ${({ $tone, theme }: { $tone?: string; theme: DefaultTheme }) => $tone === 'negative' && css`
    border-left: calc(${theme.border.size} * 4) solid ${theme.colors.errorText};
    background: ${theme.colors.errorBackground};
  `}

  button {
    background: ${({ theme }) => theme.colors.overlay};
    border: none;
    border-radius: 50%;
    width: ${({ theme }) => theme.elements.icons.width}; 
    height: ${({ theme }) => theme.elements.icons.height};
    display: flex; 
    align-items: center; 
    justify-content: center;
    cursor: pointer;
    color: inherit;
    &:hover { background: ${({ theme }) => theme.colors.overlayActive}; }
  }
`;
