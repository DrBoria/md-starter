import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Toggle (Dwarven Door) */
  border-bottom: 2px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
  
  .toggle-header {
    font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
    text-transform: uppercase;

    &:hover {
      color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
      text-shadow: 0 0 5px ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    }
  }

  .arrow-container {
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  }
`;
