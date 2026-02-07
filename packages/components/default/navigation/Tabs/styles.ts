import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const TabsContainer = styled.div<{ $orientation: 'horizontal' | 'vertical', $expanded?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $orientation }) => $orientation === 'vertical' ? 'row' : 'column'};
  
  /* Vertical Specific Layout */
  ${({ $orientation, $expanded }) => $orientation === 'vertical' && css`
      display: grid;
      grid-template-columns: 300px 1fr;
      height: ${$expanded ? "calc(100vh - 200px)" : "100%"};
      min-height: 0;
      border: 1px solid ${({ theme }) => theme?.colors?.sectionContent || '#ccc'};
      border-radius: 4px;
      background: ${({ theme }) => theme?.colors?.section || 'white'};
      overflow: hidden;
  `}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const TabList = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  display: flex;
  flex-direction: ${({ $orientation }) => $orientation === 'vertical' ? 'column' : 'row'};
  
  ${({ $orientation }) => $orientation === 'vertical' && css`
      border-right: 1px solid ${({ theme }) => theme?.colors?.sectionContent || '#ccc'};
      background: ${({ theme }) => theme?.colors?.overlay || '#f9f9f9'};
      overflow-y: auto;
      height: 100%;
      min-width: 300px;
  `}

  ${({ $orientation }) => $orientation === 'horizontal' && css`
      border-bottom: 1px solid ${({ theme }) => theme?.colors?.sectionContent || '#ccc'};
  `}
`;

export const TabButton = styled.button<{ $active: boolean, $orientation: 'horizontal' | 'vertical' }>`
  cursor: pointer;
  padding: ${({ theme }) => theme?.offsets?.elementContent || '12px'};
  background-color: transparent;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: ${({ $orientation }) => $orientation === 'vertical' ? 'flex-start' : 'center'};
  min-width: ${({ $orientation }) => $orientation === 'horizontal' ? '120px' : 'auto'};
  
  /* Generic Hover */
  &:hover {
    background-color: ${({ theme }) => theme?.colors?.overlayActive || 'rgba(0,0,0,0.05)'};
  }

  /* Active State Logic */
  ${({ $active, $orientation, theme }) => $active && css`
      font-weight: bold;
      
      ${$orientation === 'horizontal' && css`
          border-bottom: 2px solid ${theme?.colors?.highlighted || 'blue'};
          color: ${theme?.colors?.highlighted || 'blue'};
      `}
      
      ${$orientation === 'vertical' && css`
          background-color: ${theme?.colors?.section || 'white'};
          border-left: 3px solid ${theme?.colors?.highlighted || 'blue'};
          color: ${theme?.colors?.highlighted || 'blue'};
      `}
  `}
`;

export const TabPanel = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  padding: ${({ theme }) => theme?.offsets?.elementContent || '16px'};
  flex: 1;
  overflow: auto;
  
  /* Vertical content needs to take full height */
  ${({ $orientation }) => $orientation === 'vertical' && css`
      height: 100%;
      display: flex;
      flex-direction: column;
  `}
`;
