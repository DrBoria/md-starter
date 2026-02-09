import { css } from "styled-components";

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  padding: ${({ theme }) => theme.offsets.elementContent};

  .header-cell {
    background: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.highlighted};
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;
    border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
  }

  .day-cell {
    width: 100%;
    aspect-ratio: 1;
    background: transparent;
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.sectionContent};
    font-family: ${({ theme }) => theme.fontFamily};
    
    &:hover {
      background: ${({ theme }) => theme.colors.highlighted};
      color: ${({ theme }) => theme.colors.highlightedText};
      box-shadow: ${({ theme }) => theme.effects.glow.medium};
    }

    &.prev-month {
      color: ${({ theme }) => theme.colors.disabled};
      opacity: 0.5;
    }
  }
`;
