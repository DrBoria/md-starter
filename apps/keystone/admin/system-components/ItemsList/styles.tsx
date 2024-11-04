
import React from "react";
import styled from "styled-components";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};

  & > div {
    flex: 1;
    padding: 10px 15px;

    // Make context fit in 1 line and cut words with ...
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;

    & > * {
      width: 100%;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }
    a {
      color: ${({ theme }) => theme.colors.sectionContent};

    }
  }

  & > a {
    color: ${({ theme }) => theme.colors.sectionContent};

  }

  // First child in row
  & > div:first-child {
    padding-left: 0;
    & > div {
      padding-left: 0;
    }
  }
  // Last child in row
  & > div:last-child {
    padding-right: 0;
  }
`;

type TSortOrder = "asc" | "desc";
interface IHeaderCellProps {
  sortOrder?: TSortOrder;
  isSortable: boolean;
  onSortChange: () => void;
  children: React.ReactNode;
}

const HeaderCellContainer = styled.div<{ $isSortable: boolean }>`
  font-weight: 600;
  text-transform: capitalize;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionContent};

  line-height: 2.5rem;
  display: flex;
  align-items: center;
  cursor: ${({ $isSortable }) => ($isSortable ? "pointer" : "default")};
`;

const Arrow = styled.span`
  margin-left: 8px;
  font-size: 0.8rem;
`;

const HeaderCell: React.FC<IHeaderCellProps> = ({
  sortOrder,
  onSortChange,
  isSortable,
  children,
}) => {
  return (
    <HeaderCellContainer onClick={onSortChange} $isSortable={isSortable}>
      {children}
      {sortOrder === "asc" && <Arrow>▲</Arrow>}
      {sortOrder === "desc" && <Arrow>▼</Arrow>}
    </HeaderCellContainer>
  );
};

const BodyCell = styled.div`
  margin: 0;
  padding: 8px;
`;

export { Table, Row, HeaderCell, BodyCell };
