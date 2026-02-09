import styled, { css, keyframes } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const StateContainer = styled.div<{ $tone?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.elementContent};
  position: relative;
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  /* Theme Overrides */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const StatusDot = styled.div<{ $color: string; $animate?: boolean }>`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  position: relative;
  flex-shrink: 0;

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${pulseAnimation} 1.5s infinite ease-in-out;
    `}
`;
