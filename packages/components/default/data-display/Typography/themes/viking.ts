import { css } from "styled-components";

export const vikingTheme = css`
  h1, h2, h3, h4, .subtitle, .section-title, .page-title {
    font-family: ${({ theme }) => theme.fontFamily};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.font.spacing};
    color: ${({ theme }) => theme.colors.highlighted};
    text-shadow: ${({ theme }) => theme.effects.depth.outer.soft};
  }

  p, span, .plain-text {
    font-family: ${({ theme }) => theme.font.family.text};
    color: ${({ theme }) => theme.colors.sectionContent};
  }

  label {
    background: ${({ theme }) => theme.colors.labelBackground};
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
    padding: ${({ theme }) => theme.offsets.elementContent};
    color: ${({ theme }) => theme.colors.labelText};
  }

  .highlighted {
    color: ${({ theme }) => theme.colors.highlighted};
    font-weight: bold;
    text-shadow: ${({ theme }) => theme.effects.glow.soft};
  }
`;
