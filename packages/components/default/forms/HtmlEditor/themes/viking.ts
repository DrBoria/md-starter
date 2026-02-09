import { css } from "styled-components";

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  box-shadow: ${({ theme }) => theme.effects.depth.inner.strong};
  font-family: ${({ theme }) => theme.font.family.code};

  pre, textarea {
    color: ${({ theme }) => theme.colors.sectionContent};
    text-shadow: ${({ theme }) => theme.effects.depth.outer.soft};
  }
`;
