import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styled from 'styled-components';

import { Button } from '../Button';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type PaginationProps = {
  pagesCount: number;
  currentPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, page: number) => void;
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

const Number = styled(Button)<{ active: boolean }>`
  font-weight: 700;

  background: ${({ active, theme }) => (active ? theme.colors.overlayActive : theme.colors.overlay)};
  border: none;
`;

const Pagination = ({ pagesCount, currentPage, onChangePage }: PaginationProps) => (
  <Container>
    <IoIosArrowBack />
    {Array.from({ length: pagesCount }, (_, i) => (
      <Number
        key={i}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          onChangePage(event, i);
        }}
        active={currentPage === i}
      >
        {i + 1}
      </Number>
    ))}
    <IoIosArrowForward />
  </Container>
);

export default Pagination;
