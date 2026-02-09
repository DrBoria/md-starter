import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
  box-shadow: ${({ theme }) => theme.effects.depth.outer.medium};
  overflow: hidden;
  
  .header-cell {
    background: ${({ theme }) => theme.colors.overlayActive};
    color: ${({ theme }) => theme.colors.sectionContent};
    font-weight: 600;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.font.sizes.small};
    letter-spacing: ${({ theme }) => theme.font.spacing};
    border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlay};
    padding: ${({ theme }) => theme.offsets.section};
  }

  & > div {
     border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlay};
     transition: background 0.3s ease;
  }

  & > div:hover {
     background: ${({ theme }) => theme.colors.overlay};
  }
`;
