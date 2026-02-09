import { css } from "styled-components";

export const liquidGlassTheme = css`
  h1, h2, h3, h4, .subtitle, .section-title, .page-title {
    font-family: ${({ theme }) => theme.font.family.title};
    font-weight: 700;
    letter-spacing: ${({ theme }) => theme.font.spacing};
    color: ${({ theme }) => theme.colors.sectionContent};
    text-shadow: ${({ theme }) => theme.shadows.small};
  }

  label {
    background: ${({ theme }) => theme.colors.overlay};
    backdrop-filter: ${({ theme }) => theme.effects.texture};
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlayActive};
    border-radius: ${({ theme }) => theme.border.radius}px;
    color: ${({ theme }) => theme.colors.labelText};
  }
`;
