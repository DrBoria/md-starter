import styled from "styled-components";
import type { ZIndexName } from '@md/styles';
import { getZIndex } from '@md/styles';
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const StyledHeader = styled.div<{ $zIndex?: ZIndexName }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme?.elements?.header?.height || '60px'};
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 2px -2px ${({ theme }) => theme.colors.sectionContent};
  z-index: ${({ $zIndex = 'content' }) => getZIndex($zIndex)};

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
