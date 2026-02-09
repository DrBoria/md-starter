import { css } from "styled-components";

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  border-image: linear-gradient(to bottom, ${({ theme }) => theme.colors.warningBackground}, ${({ theme }) => theme.colors.sectionContent}) 1;
  box-shadow: ${({ theme }) => theme.effects.depth.inner.strong};
  
  .header-cell {
    background: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.highlighted};
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.font.spacing};
    border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
    padding: ${({ theme }) => theme.offsets.section};
  }

  & > div:not(.header-cell) {
    border-bottom: ${({ theme }) => theme.border.size}px dashed ${({ theme }) => theme.colors.sectionContent};
    
    &:hover {
      background: ${({ theme }) => theme.colors.overlayActive};
    }
  }
`;
