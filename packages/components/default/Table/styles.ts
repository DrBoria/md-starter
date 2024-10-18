import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-column-gap: ${({ theme }) => theme.offsets.batweenElements};
  grid-template-rows: 1fr;
  grid-template-columns: ${({ colsTemplate }: { colsTemplate: string }) => colsTemplate};
  align-items: center;
`;
