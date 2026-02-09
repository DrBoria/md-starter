import { css } from "styled-components";

export const vikingTheme = css`
  color: ${({ theme }) => theme.colors.highlighted};
  font-family: ${({ theme }) => theme.fontFamily};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    color: ${({ theme }) => theme.colors.highlightedText};
    text-shadow: ${({ theme }) => theme.effects.glow.small};
    text-decoration: none;

    &::after {
      content: ' ᛫';
    }
  }
`;
