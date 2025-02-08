import React, { ReactNode } from 'react';

import { Select, TOption } from '../Form';
import Pagination from '../PaginationOld';
import { SubTitle } from '../../default/Typography';

import { StyledHeaderCell } from './TableCels/styles';
import { Grid, PaginationContainer } from './styles';

type TTableContainerProps = {
  pagination?: {
    current: number;
    totalPages: number;
    changePage: (newPage: number) => void;
  };
  rowsPerPage?: {
    options: TOption[];
    current: number;
    changeElementsPerPage: (elementsPerPage: number) => void;
  };
  headerCols?: {
    text: string;
    align?: string;
    sort?: () => any;
    isSortable?: boolean;
  }[];
  colsTemplate: string;
  children: ReactNode;
};

const TableContainer = ({ children, headerCols, colsTemplate, pagination, rowsPerPage }: TTableContainerProps) => {
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    rowsPerPage?.changeElementsPerPage(Number.parseInt(event.target.value, 10));
  };
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => {
    pagination?.changePage(newPage);
  };

  return (
    <div>
      <Grid colsTemplate={colsTemplate}>
        {/* Table Head */}
        {headerCols?.map(({ text, sort = () => {}, isSortable, align }) => (
          <StyledHeaderCell key={text} onClick={sort} align={align}>
            <SubTitle>{text}</SubTitle>
            {isSortable && '⟠'}
          </StyledHeaderCell>
        ))}

        {/* Table Content (table cells will be here) */}
        {children}
      </Grid>

      {(pagination || rowsPerPage) && (
        <PaginationContainer>
          {/* Pagination with arrows */}
          {pagination && (
            <Pagination
              pagesCount={pagination.totalPages}
              currentPage={pagination.current}
              onChangePage={handleChangePage}
            />
          )}

          {/* Dropdawn for selction rows per page */}
          {rowsPerPage && (
            <Select
              name='rowsPerPage'
              id='rowsPerPage'
              value={rowsPerPage.options[0]}
              options={rowsPerPage.options}
              onChange={handleChangeRowsPerPage}
            />
          )}
        </PaginationContainer>
      )}
    </div>
  );
};

export default TableContainer;
