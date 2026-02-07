import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme?.colors?.disabled || '#d0d5dd'};
  margin: 8px 0;

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
