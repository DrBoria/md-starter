import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const StyledErrorValidationMessage = styled.div`
  color: ${({ theme }) => theme?.colors?.error || "red"}; /* Use theme color */
  font-size: ${({ theme }) => theme?.font?.sizes?.small || "0.875rem"};
  margin-top: ${({ theme }) => theme?.offsets?.elementContent || "4px"};

  /* Theme Support */
  ${({ theme }) => theme?.theme === "viking" && vikingTheme}
  ${({ theme }) => theme?.theme === "liquid-glass" && liquidGlassTheme}
`;

export const StyledErrorValidationContainer = styled.div<{ $isError: boolean }>`
  border-bottom: 1px solid transparent; /* Maintain height/layout */

  ${({ $isError, theme }) =>
    $isError &&
    css`
      border-bottom-color: ${theme?.colors?.error || "red"};

      /* Viking specific container styling */
      ${theme?.theme === "viking" &&
      css`
        border-bottom: 2px dashed ${theme?.colors?.error || "red"};
      `}
    `}
`;
