import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Glass Calendar */
  background: rgb(255 255 255 / 5%);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 12px;
  border: 1px solid rgb(255 255 255 / 10%);

  .header-cell {
    background: transparent;
    color: ${({ theme }) => theme?.colors?.text || 'white'};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .day-cell {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: transparent;
    color: ${({ theme }) => theme?.colors?.text || 'white'};
    transition: all 0.2s;
    
    &:hover {
      background: rgb(255 255 255 / 20%);
      transform: scale(1.1);
    }

    &.prev-month {
      color: rgb(255 255 255 / 30%);
    }
  }
`;
