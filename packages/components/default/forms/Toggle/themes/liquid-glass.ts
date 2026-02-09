import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius}px;
  padding: ${({ theme }) => theme.offsets.elementContent};
  margin-bottom: ${({ theme }) => theme.offsets.elementContent};
  
  .toggle-header {
    font-weight: 600;
  }
`;
