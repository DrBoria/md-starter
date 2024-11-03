import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

import { Button } from '../Button';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type TPaginationProps = {
  pagesCount: number;
  currentPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => void;
} & TWithBasicElementOffsets &
  TFullWidth;

const Container = styled.div<TFullWidth>`
  display: flex;
  grid-gap: ${({ theme }) => theme.offsets.betweenElements};
  align-items: center;
  justify-content: center;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const Number = styled<any>(Button)`
  font-weight: 700;

  background: ${({ active, theme }) => (active ? theme.colors.overlayActive : theme.colors.overlay)};
  border: none;
`;

const Pagination = ({ pagesCount, currentPage, onChangePage }: TPaginationProps) => (
  <Container>
    <IoIosArrowBack />
    {[...new Array(pagesCount).keys()].map((pageNumber) => (
      <Number
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onChangePage(event, pageNumber);
        }}
        active={currentPage === pageNumber}
      >
        {pageNumber}
      </Number>
    ))}
    <IoIosArrowForward />
  </Container>
);

export default Pagination;
