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
  padding: ${({ theme }) => theme.offsets.elementContent} 0;
  gap: ${({ theme }) => theme.offsets.elementContent};
  align-items: center;
`;

export const StyledHeaderCell = styled.div<{ $align?: 'left' | 'center' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) =>
    $align === 'center' ? 'center' : $align === 'right' ? 'flex-end' : 'flex-start'};
  padding: ${({ theme }) => theme.offsets.elementContent};
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.sectionContent};
`;
