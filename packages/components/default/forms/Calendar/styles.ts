import styled from 'styled-components';
import { vikingTheme } from './themes/viking';
import { liquidGlassTheme } from './themes/liquid-glass';

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  
  /* Helper classes targeted by themes */

  /* .header-cell, .day-cell */
  
  /* Default styles */
  .header-cell {
     display: flex;
     align-items: center;
     justify-content: center;
     padding: 8px;
     background-color: ${({ theme }) => theme?.colors?.section};
     color: ${({ theme }) => theme?.colors?.sectionContent};
  }

  .day-cell {
     display: flex;
     align-items: center;
     justify-content: center;
     cursor: pointer;
     padding: 8px;
     background-color: ${({ theme }) => theme?.colors?.section};
     color: ${({ theme }) => theme?.colors?.sectionContent};
     
     &:hover {
        background-color: ${({ theme }) => theme?.colors?.sectionContent};
        color: ${({ theme }) => theme?.colors?.section};
     }

     &.prev-month {
         opacity: 0.5;
     }
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
