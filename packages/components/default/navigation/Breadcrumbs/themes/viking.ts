import { css } from "styled-components";

export const vikingTheme = css`
  font-family: ${({ theme }) => theme.fontFamily};
  text-transform: uppercase;
  
  .breadcrumb-separator {
    color: ${({ theme }) => theme.colors.highlighted};
  }
  
  .active-crumb {
    color: ${({ theme }) => theme.colors.highlighted};
    text-shadow: ${({ theme }) => theme.effects.glow.small};
  }
`;
