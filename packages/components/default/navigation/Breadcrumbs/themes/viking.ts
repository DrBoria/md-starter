import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Breadcrumbs */
  font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
  text-transform: uppercase;
  
  .breadcrumb-separator {
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  }
  
  .active-crumb {
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    text-shadow: 0 0 5px ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  }
`;
