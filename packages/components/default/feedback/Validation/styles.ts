import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const StyledErrorValidationMessage = styled.div`
  color: ${({ theme }) => theme.colors.errorText};
  font-size: ${({ theme }) => theme.font.sizes.small};
  margin-top: ${({ theme }) => theme.offsets.elementContent};

  /* Theme Support */
  ${({ theme }) => theme?.theme === "viking" && vikingTheme}
  ${({ theme }) => theme?.theme === "liquid-glass" && liquidGlassTheme}
`;

export const StyledErrorValidationContainer = styled.div<{ $isError: boolean }>`
  border-bottom: 1px solid transparent;

  ${({ $isError, theme }) =>
    $isError &&
    css`
      border-bottom-color: ${theme.colors.errorText};

      ${theme?.theme === "viking" &&
      css`
        border-bottom: calc(${theme.border.size} * 2) dashed ${theme.colors.errorText};
      `}
    `}
`;
