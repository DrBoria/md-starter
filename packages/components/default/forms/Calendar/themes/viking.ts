import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Stone Calendar */
  
  /* GRID */
  background: ${({ theme }) => theme.colors.section};
  border: 4px solid ${({ theme }) => theme.colors.disabled};
  padding: 8px;

  /* Use theme colors for border image, fallback to solid if not supported */
  border-image: linear-gradient(to bottom, ${({ theme }) => theme.colors.disabled}, ${({ theme }) => theme.colors.section}) 1;

  .header-cell {
    background: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.highlighted};
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;
    border-bottom: 2px solid ${({ theme }) => theme.colors.highlighted};
  }

  .day-cell {
    width: 100%;
    aspect-ratio: 1;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.sectionContent};
    font-family: ${({ theme }) => theme.fontFamily};
    
    &:hover {
      background: ${({ theme }) => theme.colors.highlighted};
      color: ${({ theme }) => theme.colors.highlightedText};
      box-shadow: ${({ theme }) => theme?.effects?.glow?.medium};
    }

    &.prev-month {
      color: ${({ theme }) => theme.colors.disabled};
      opacity: 0.5;
    }
  }
`;
