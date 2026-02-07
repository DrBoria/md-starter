import { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, 10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

export const vikingTheme = css`
  /* VIKING THEME: Rune Stone Tooltip */
  background: ${({ theme }) => theme?.colors?.surface || '#2c2c2c'};
  color: ${({ theme }) => theme?.colors?.highlightedText || 'gold'};
  border: 1px solid ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  border-radius: 0;
  font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 50%);
  animation: ${fadeIn} 0.2s ease-out forwards;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    margin-left: -6px;
    border-width: 6px;
    border-style: solid;
    border-color: ${({ theme }) => theme?.colors?.highlighted || 'gold'} transparent transparent transparent;
  }
`;
