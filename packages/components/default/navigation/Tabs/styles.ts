import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

import type { ThemeInterface } from '@md/styles';

export const TabsContainer = styled.div<{ $orientation: 'horizontal' | 'vertical', $expanded?: boolean; theme: ThemeInterface }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $orientation }) => $orientation === 'vertical' ? 'row' : 'column'};
  
  /* Vertical Specific Layout */
  ${({ $orientation, $expanded, theme }) => $orientation === 'vertical' && css`
      display: grid;
      grid-template-columns: calc(${theme.elements.form.height} * 5) 1fr;
      ${$expanded && css`
        height: 100vh;
        padding-top: ${theme.elements.header?.height};
        box-sizing: border-box;
      `}
      min-height: 0;
      border: ${theme.border.size} solid ${theme.colors.sectionContent};
      border-radius: ${theme.border.radius}px;
      background: ${theme.colors.section};
      overflow: hidden;
  `}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const TabList = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ $orientation }) => $orientation === 'vertical' ? 'column' : 'row'};
  
  ${({ $orientation, theme }) => $orientation === 'vertical' && css`
      border-right: ${theme.border.size} solid ${theme.colors.sectionContent};
      background: ${theme.colors.overlay};
      overflow-y: auto;
      height: 100%;
      min-width: calc(${theme.elements.form.height} * 5);
  `}

  ${({ $orientation, theme }) => $orientation === 'horizontal' && css`
      border-bottom: ${theme.border.size} solid ${theme.colors.sectionContent};
  `}
`;

export const TabButton = styled.button<{ $active: boolean, $orientation: 'horizontal' | 'vertical' }>`
  cursor: pointer;
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.sectionContent};
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: ${({ $orientation }) => $orientation === 'vertical' ? 'flex-start' : 'center'};
  ${({ $orientation, theme }) => $orientation === 'horizontal' && css`min-width: ${theme.elements.form.minWidth};`}
  
  /* Generic Hover */
  &:hover {
    background-color: ${({ theme }) => theme.colors.overlayActive};
  }

  /* Active State Logic */
  ${({ $active, $orientation, theme }) => $active && css`
      font-weight: bold;
      
      ${$orientation === 'horizontal' && css`
          border-bottom: calc(${theme.border.size} * 2) solid ${theme.colors.highlighted};
          color: ${theme.colors.highlighted};
      `}
      
      ${$orientation === 'vertical' && css`
          background-color: ${theme.colors.section};
          border-left: calc(${theme.border.size} * 3) solid ${theme.colors.highlighted};
          color: ${theme.colors.highlighted};
      `}
  `}
`;

export const TabPanel = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  padding: ${({ theme }) => theme.offsets.elementContent};
  flex: 1;
  overflow: auto;
  
  /* Vertical content needs to take full height */
  ${({ $orientation }) => $orientation === 'vertical' && css`
      height: 100%;
      display: flex;
      flex-direction: column;
  `}
`;
