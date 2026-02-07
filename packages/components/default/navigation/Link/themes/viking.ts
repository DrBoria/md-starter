import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Link */
  color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    color: ${({ theme }) => theme?.colors?.highlightedText || 'white'};
    text-shadow: 0 0 5px ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    text-decoration: none;

    &::after {
      content: ' ᛫'; /* Rune dot */
    }
  }
`;
