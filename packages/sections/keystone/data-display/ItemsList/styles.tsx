import React from "react";
import styled from "styled-components";

export const ItemsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TableHeader = styled.div`
  padding: ${({ theme }) => `${theme.offsets.elementContent} 0`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.offsets.betweenElements};
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
  gap: calc(var(--basic-padding) * 2);
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--basic-padding) * 2);
  width: 50%;

  @media (width <= 1024px) {
    flex-grow: 1;
  }
`;

export const Table = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  border-collapse: separate;
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
`;

export const Row = styled.div<{ $withFullSupport?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $withFullSupport }) =>
    `${$withFullSupport ? "60px" : ""} minmax(300px, 1fr) repeat(auto-fit, minmax(100px, 1fr)) 50px`};
  grid-template-rows: calc(var(--basic-padding) * 8);
  grid-auto-flow: column;
  gap: calc(var(--basic-padding) * 2);
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  min-width: fit-content;
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};

  &:first-child {
    grid-template-rows: calc(var(--basic-padding) * 6);
    background-color: var(--color-bg-secondary);

    & > label {
      background-color: var(--color-bg-secondary);
    }
  }

  &:last-child {
    border-bottom: none;
  }

  & > label {
    &:first-child {
      left: 0;
      position: sticky;
      z-index: 2;
      background-color: var(--color-bg);
      padding: 0 var(--basic-padding);
    }
  }

  & > div {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & > div {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    height: 100%;
    display: flex;
    align-items: center;

    /* Second column is the column with TITLE of list element. It has tooltip, so we need to */
    &:nth-child(2) {
      overflow: initial;
    }

    &:last-child {
      position: sticky;
      z-index: 2;
      right: 0;
      grid-column: -1;
      min-width: ${({ theme }) => theme.elements.form.height};
    }
  }


`;

type TSortOrder = "asc" | "desc";
interface IHeaderCellProps {
  sortOrder?: TSortOrder;
  isSortable: boolean;
  onSortChange: () => void;
  children: React.ReactNode;
}

export const HeaderCellContainer = styled.div<{ $isSortable: boolean }>`
  font-weight: 500;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  cursor: ${({ $isSortable }) => ($isSortable ? "pointer" : "default")};
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: var(--color-label);
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: ${({ theme }) => `${theme.screens.mobile.width}px`};

  &:first-of-type {
    padding-left: ${({ theme }) => theme.offsets.elementContent};
  }

  @media (width <= 768px) {
    max-width: ${({ theme }) => `calc(${theme.screens.mobile.width}px / 3)`};
  }
`;

export const Arrow = styled.span`
  margin-left: ${({ theme }) => theme.offsets.betweenElements};
  font-size: ${({ theme }) => theme.font.sizes.small};
`;

export const HeaderCell: React.FC<IHeaderCellProps> = ({
  sortOrder,
  onSortChange, // Provide default value
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

export const BodyCell = styled.div<{ $type?: "default" | "email" | "subject" }>`
  margin: 0;

  /* Target Keystone's CellContainer specifically */
  & > [class^="css-"] {
    padding: 0;
  }

  &.arrow-cell {
    justify-content: flex-end;
  }
`;
