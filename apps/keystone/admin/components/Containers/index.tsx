import styled from "styled-components";

interface ColumnsContainerProps {
  $colsRatio?: string[];
}

const ColumnsContainer = styled.div<ColumnsContainerProps>`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-rows: 1fr;
  grid-template-columns: ${({
    $colsRatio = ["1fr", "1fr"],
  }: ColumnsContainerProps) => $colsRatio.map((col) => `${col}`).join(" ")};
`;

const DashboardCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px 0;
`;

const FocusedContainer = styled.div`
  position: relative;

  &:hover > * {
    color: #fff;
    background: var(--action-color);
    border: 1px solid var(--action-color);
  }
`;

const LinksContainer = styled.div`
  cursor: pointer;

  div {
    cursor: pointer;
    color: var(--action-color);
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export {
  ColumnsContainer,
  DashboardCardsContainer,
  FocusedContainer,
  LinksContainer,
  MenuItemContainer,
};
