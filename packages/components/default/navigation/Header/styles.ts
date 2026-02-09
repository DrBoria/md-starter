import styled from "styled-components";
import type { ThemeInterface, ZIndexName } from '@md/styles';
import { vikingTheme } from './themes/viking';
import { liquidGlassTheme } from "./themes/liquid-glass";

export const StyledHeader = styled.header<{ $zIndex?: ZIndexName }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }: { theme: ThemeInterface }) => theme.variables.header.height.desktop}px;
  background: ${({ theme }: { theme: ThemeInterface }) => theme.colors.section};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${({ theme }: { theme: ThemeInterface }) => theme.shadows.medium};
  z-index: ${({ theme, $zIndex }: { theme: ThemeInterface, $zIndex?: ZIndexName }) => $zIndex ? theme.zIndex[$zIndex] : theme.zIndex.content};

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
