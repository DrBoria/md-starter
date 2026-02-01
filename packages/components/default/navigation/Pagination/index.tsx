import React, { useEffect, useState } from "react";
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

const PageNumber = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? (theme?.colors?.highlighted || "#007bff") : (theme?.colors?.overlay || "var(--color-bg-secondary)")};
  color: ${({ $active, theme }) => ($active ? (theme?.colors?.highlightedText || "#fff") : (theme?.colors?.sectionContent || "#000"))};
  border: 1px solid #ccc;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.highlighted || "#007bff"};
    color: ${({ theme }) => theme?.colors?.highlightedText || "#fff"};
  }

  /* VIKING THEME */
  ${({ theme, $active }) => theme?.theme === 'viking' && `
    border-radius: 0;
    clip-path: ${theme?.geometry?.ragged};
    background-image: ${theme?.effects?.texture};
    
    /* Active state: Dark background with Glowing Green Digit */
    background-color: ${$active ? theme?.colors?.overlayActive : theme?.colors?.overlay};
    color: ${$active ? theme?.colors?.highlighted : theme?.colors?.sectionContent};
    
    border: none;
    box-shadow: ${$active ? theme?.effects?.glow?.medium : theme?.effects?.depth?.inner?.medium};
    height: ${theme?.elements?.form?.height};
    min-width: ${theme?.elements?.form?.height};
    font-family: ${theme?.font?.family?.text};
    font-weight: 700;
    font-size: 1.2rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme?.colors?.overlayActive};
      color: ${theme?.colors?.highlighted};
      box-shadow: ${theme?.effects?.glow?.medium};
      filter: brightness(1.2);
      text-shadow: 0 0 8px ${theme?.colors?.highlighted};
    }
  `}
`;

const ArrowButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme?.colors?.highlighted || "#007bff"};
  border: none;
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme?.colors?.highlightedText || "#0056b3"};
    text-shadow: 0 0 8px ${({ theme }) => theme?.colors?.highlighted || "transparent"};
  }

  &:disabled {
    color: ${({ theme }) => theme?.colors?.disabled || "#ccc"};
    cursor: not-allowed;
  }

  /* VIKING THEME */
  ${({ theme }) => theme?.theme === 'viking' && `
    font-family: ${theme?.font?.family?.text};
    text-transform: uppercase;
    letter-spacing: 1px;
  `}
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
      // If total pages are less than or equal to maxPagesToShow, show all pages
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

      // add last page at the end
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
