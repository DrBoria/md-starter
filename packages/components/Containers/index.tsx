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

const OneLineContainer = styled.div<{ width?: '1/2' | '1/3' }>`
  display: flex;
  align-items: center;
  gap: 5px;

  /* Dynamically set width based on prop */
  width: ${({ width }) => {
    switch (width) {
      case '1/2':
        return '50%';
      case '1/3':
        return '33.33%';
      default:
        return '100%';
    }
  }};
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
  OneLineContainer,
  FocusedContainer,
  LinksContainer,
  MenuItemContainer,
};
