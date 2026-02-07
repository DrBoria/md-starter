import styled from 'styled-components';
import { vikingTheme } from './themes/viking';
import { liquidGlassTheme } from './themes/liquid-glass';

export const Grid = styled.div<{ $colsTemplate: string }>`
  display: grid;
  grid-template-columns: ${({ $colsTemplate }) => $colsTemplate};
  width: 100%;
  
  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  gap: 20px;
  align-items: center;
`;

/* Moving header styles here to share with themes */
export const StyledHeaderCell = styled.div<{ $align?: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === 'center' ? 'center' : $align === 'right' ? 'flex-end' : 'flex-start'};
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  
  /* Class for theme targeting */
  &.header-cell {
    /* Theme targeting */
  }
  
  /* Default styles if no theme overrides */
  color: ${({ theme }) => theme?.colors?.text || 'inherit'};
`;
