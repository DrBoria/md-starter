import React, { useEffect, useState } from "react";
import { PaginationContainer, PageNumber, ArrowButton, Dots } from "./styles";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxPagesToShow = isMobile ? 3 : 8;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PageNumber
            key={i}
            $active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PageNumber>,
        );
      }
    } else {
      let startPage = 1;
      let endPage = maxPagesToShow;

      if (currentPage > 5) {
        startPage = currentPage - 4;
        endPage = currentPage + 5;
      }

      if (endPage > totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      }

      if (startPage > 1) {
        pages.push(
          <PageNumber
            key={1}
            $active={1 === currentPage}
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
            $active={i === currentPage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </PageNumber>,
        );
      }

      if (endPage < totalPages) {
        pages.push(<Dots key="end-dots">...</Dots>);
        pages.push(
          <PageNumber
            key={totalPages}
            $active={totalPages === currentPage}
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
