import styled, { css } from "styled-components";
import { devices, TFullWidth, TWithBasicElementOffsets, withFullWidth, withOffsetBottom, withOffsetsRight } from '@md/styles';

interface ColumnsContainerProps {
  $colsRatio?: string[];
}

type TContainersProps = {
  className?: string;
  style?: any;
};

type TSectionProps = {
  noHeightLimit?: boolean;
} & TContainersProps;

/**
 * @visibleName Containers
 */

const WithoutHeightLimit = (noHeightLimit?: boolean) =>
  noHeightLimit &&
  css`
    height: auto;
    min-height: ${({ theme }) => `calc(${theme.screens.tablet.height} - ${theme.elements.header.height})`};
    max-height: unset;
  `;

// Use this conteiner for wrapping any section on page
// No usage restrictions
export const BasicSection = styled.div<TSectionProps>`
  height: ${({ theme }) => `calc(${theme.screens.mobile.height}px - ${theme.elements.header.height})`};
  max-height: ${({ theme }) => `calc(${theme.screens.desktop.height} - ${theme.elements.header.height})`};
  padding: ${({ theme: { offsets } }) => offsets.section};

  background-color: ${({ theme }) => theme.colors.section};

  @media ${devices.tablet} {
    height: ${({ theme }) => `calc(${theme.screens.tablet.height} - ${theme.elements.header.height})`};
  }
  @media ${devices.desktop} {
    height: ${({ theme }) => `calc(${theme.screens.desktop.height} - ${theme.elements.header.height})`};
    padding: ${({ theme }) => `${theme.offsets.section} ${theme.offsets.container}`};
  }

  ${({ noHeightLimit }) => WithoutHeightLimit(noHeightLimit)}
`;

// Use this container for wrapping all page content
// Should be used only once per page
export const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.offsets.container};
  padding-top: ${({ theme }) => theme.elements.header.height};
`;



/* ********* APP SPECIFIC CONTAINERS ********** */

// Got partial width
export const HeadingContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
  width: 40%;

  text-align: left;

  ${withFullWidth}
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;


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
