import { css } from "styled-components";

export const liquidGlassTheme = css`
  color: ${({ theme }) => theme.colors.sectionContent};
  text-decoration: none;
  border-bottom: ${({ theme }) => theme.border.size}px dotted ${({ theme }) => theme.colors.overlayActive};
  transition: all 0.2s;
  
  &:hover {
    border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
    box-shadow: ${({ theme }) => theme.shadows.small};
    background: ${({ theme }) => theme.colors.overlay};
    border-radius: ${({ theme }) => theme.border.radius}px;
    padding: 0 ${({ theme }) => theme.offsets.elementContent};
  }
`;
