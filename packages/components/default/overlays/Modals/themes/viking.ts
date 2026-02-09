import { css } from "styled-components";

export const vikingTheme = css`
  background-color: ${({ theme }) => theme.colors.section};
  background-image: ${({ theme }) => theme.effects.texture};
  color: ${({ theme }) => theme.colors.sectionContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  clip-path: ${({ theme }) => theme.geometry.cut};
  box-shadow: ${({ theme }) => theme.effects.depth.outer.medium};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
`;
