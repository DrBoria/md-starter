import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Runestone Tablet */
  
  /* Grid Container */
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.variables.border.size}px solid ${({ theme }) => theme.colors.sectionContent};

  /* Use theme colors for border image. Fallback to solid if needed, but gradients from theme would be better if stored */
  border-image: linear-gradient(to bottom, ${({ theme }) => theme.colors.warningBackground}, ${({ theme }) => theme.colors.sectionContent}) 1;
  box-shadow: ${({ theme }) => theme?.effects?.depth?.inner?.strong};
  
  /* Header Cells */
  .header-cell {
    background: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.highlighted};
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.highlighted};
    padding: ${({ theme }) => theme.offsets.section};
    position: relative;
    
    /* Removed pseudo-element with arbitrary positioning */
  }

  /* Items (Rows) */
  & > div:not(.header-cell) {
    border-bottom: 1px dashed ${({ theme }) => theme.colors.sectionContent};
    
    &:hover {
      background: ${({ theme }) => theme.colors.overlayActive};
    }
  }
`;
