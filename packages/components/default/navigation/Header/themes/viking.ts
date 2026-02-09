import { css } from "styled-components";

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  box-shadow: ${({ theme }) => theme.effects.depth.outer.medium};
  background-image: ${({ theme }) => theme.effects.texture};
`;
