import { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.highlightedText};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
  border-radius: 0;
  font-family: ${({ theme }) => theme.fontFamily};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.font.spacing};
  box-shadow: ${({ theme }) => theme.effects.depth.outer.medium};
  animation: ${fadeIn} 0.2s ease-out forwards;

  &::after {
    content: '';
    position: absolute;
    bottom: ${({ theme }) => theme.offsets.elementContent};
    left: 50%;
    margin-left: ${({ theme }) => theme.offsets.elementContent};
    border-width: ${({ theme }) => theme.offsets.elementContent};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.highlighted} transparent transparent transparent;
  }
`;
