import { css } from "styled-components";

export const vikingTheme = css`
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  background: ${({ theme }) => theme.colors.section};
  padding: ${({ theme }) => theme.offsets.section};
  
  label {
    color: ${({ theme }) => theme.colors.highlighted};
    text-shadow: ${({ theme }) => theme.effects.depth.outer.soft};
  }
`;
