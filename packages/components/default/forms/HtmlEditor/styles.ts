import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const CodeEditorContainer = styled.div<{ $fullHeight?: boolean }>`
  border-radius: 4px;
  margin-bottom: 4px;
  overflow: auto;
  height: ${({ $fullHeight }) => ($fullHeight ? "100%" : "400px")};
  border: 1px solid ${({ theme }) => theme?.colors?.disabled || '#ccc'}; /* Default border */

  pre {
    background-color: transparent;
  }

  div {
    line-height: 1.9;
  }
  
  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
