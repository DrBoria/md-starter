import React from "react";
import styled from "styled-components";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const PageNumber = styled.button<{ active: boolean }>`
  background-color: ${({ active }) => (active ? "#007bff" : "#f9fafb")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: 1px solid #ccc;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const ArrowButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: none;
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #0056b3;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const Dots = styled.span`
  margin: 0 5px;
  font-weight: bold;
`;

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 8;

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PageNumber
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PageNumber>,
        );
      }
    } else {
      let startPage = 1;
      let endPage = maxPagesToShow;

      // If page greater then 5, show ... in front of pages
      if (currentPage > 5) {
        startPage = currentPage - 4;
        endPage = currentPage + 5;
      }

      // If pages amount greater then maxPagesToShow, show ... at the end of pages group
      if (endPage > totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      }

      // add 1rst page before all
      if (startPage > 1) {
        pages.push(
          <PageNumber
            key={1}
            active={1 === currentPage}
            onClick={() => onPageChange(1)}
          >
            1
          </PageNumber>,
        );
        pages.push(<Dots key="start-dots">...</Dots>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PageNumber
            key={i}
            active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PageNumber>,
        );
      }

      // add last page at the end
      if (endPage < totalPages) {
        pages.push(<Dots key="end-dots">...</Dots>);
        pages.push(
          <PageNumber
            key={totalPages}
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PageNumber>,
        );
      }
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <ArrowButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </ArrowButton>
      {renderPageNumbers()}
      <ArrowButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </ArrowButton>
    </PaginationContainer>
  );
};

export { Pagination };
