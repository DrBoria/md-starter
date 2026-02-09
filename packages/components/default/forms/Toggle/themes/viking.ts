import { css } from "styled-components";

export const vikingTheme = css`
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  
  .toggle-header {
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;

    &:hover {
      color: ${({ theme }) => theme.colors.highlighted};
      text-shadow: ${({ theme }) => theme.effects.glow.small};
    }
  }

  .arrow-container {
    color: ${({ theme }) => theme.colors.highlighted};
  }
`;
