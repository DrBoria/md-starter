import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border-radius: ${({ theme }) => theme.border.radius}px;
  padding: ${({ theme }) => theme.offsets.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};

  .header-cell {
    background: transparent;
    color: ${({ theme }) => theme.colors.sectionContent};
    font-weight: 700;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.font.sizes.small};
  }

  .day-cell {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: transparent;
    color: ${({ theme }) => theme.colors.sectionContent};
    transition: all 0.2s;
    
    &:hover {
      background: ${({ theme }) => theme.colors.overlayActive};
      transform: scale(1.1);
    }

    &.prev-month {
      color: ${({ theme }) => theme.colors.disabled};
    }
  }
`;
