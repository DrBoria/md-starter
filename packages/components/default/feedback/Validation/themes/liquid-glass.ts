import { css } from "styled-components";

export const liquidGlassTheme = css`
  background: ${({ theme }) => theme.colors.errorBackground};
  padding: ${({ theme }) => theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.errorText};
  color: ${({ theme }) => theme.colors.errorText};
  backdrop-filter: ${({ theme }) => theme.effects.texture};
  margin-top: ${({ theme }) => theme.offsets.elementContent};
  font-size: ${({ theme }) => theme.font.sizes.small};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;
