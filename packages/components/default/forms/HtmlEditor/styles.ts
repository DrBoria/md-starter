import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const CodeEditorContainer = styled.div<{ $fullHeight?: boolean }>`
  border-radius: ${({ theme }) => theme.border.radius}px;
  margin-bottom: ${({ theme }) => theme.offsets.elementContent};
  overflow: auto;
  ${({ $fullHeight, theme }) => $fullHeight
    ? css`height: 100%;`
    : css`height: ${theme.elements.form.height};`}
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};

  pre {
    background-color: transparent;
  }

  div {
    line-height: 1.5;
  }
  
  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
