import styled from "styled-components/native";
import { View } from "react-native";

import { TFullWidth, TWithBasicElementOffsets, withFullWidth, withOffsetBottom, withOffsetsRight } from '../helpers';

interface ColumnsContainerProps {
  $colsRatio?: string[];
}

type TContainersProps = {
  style?: any;
};

type TSectionProps = {
  noHeightLimit?: boolean;
} & TContainersProps;

/**
 * @visibleName Containers
 */

const WithoutHeightLimit = (noHeightLimit?: boolean) =>
  noHeightLimit ? {
    height: 'auto',
    minHeight: 'calc(100% - HEADER_HEIGHT)', // Replace with dynamic value as necessary
    maxHeight: undefined,
  } : {};

export const BasicSection = styled(View)<TSectionProps>`
  font-family: ${({theme}) => theme.font.family.text};
  height: ${({ theme }) => `calc(${theme.screens.mobile.height}px - ${theme.elements.header.height})`};
  max-height: ${({ theme }) => `calc(${theme.screens.desktop.height} - ${theme.elements.header.height})`};
  padding: ${({ theme: { offsets } }) => offsets.section}px;
  width: 100%;
  
  background-color: ${({ theme }) => theme.colors.section};

  ${({ noHeightLimit }) => WithoutHeightLimit(noHeightLimit)}
`;

export const PageContainer = styled(View)`
  font-family: ${({theme}) => theme.font.family.text};
  min-height: 100vh;
  padding: ${({ theme }) => theme.offsets.section}px;
  padding-top: ${({ theme }) => theme.elements.header.height};
`;

export const HeadingContainer = styled(View)<TWithBasicElementOffsets & TFullWidth>`
  width: 40%;
  text-align: left;

  ${withFullWidth}
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const Column = styled(View)`
  flex-direction: column;
`;

const ColumnsContainer = styled(View)<ColumnsContainerProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -8px; // Adjust according to your column gap
  margin-right: -8px; // Adjust according to your column gap
`;

const DashboardCardsContainer = styled(View)`
  display: flex;
  flex-wrap: wrap;
  padding: 24px 0;
`;

const FocusedContainer = styled(View)`
  position: relative;

  &:hover > * {
    color: #fff;
    background: var(--action-color);
    border: 1px solid var(--action-color);
  }
`;

const OneLineContainer = styled(View)<{ width?: '1/2' | '1/3' }>`
  flex-direction: row;
  align-items: center;
  gap: 5px;

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

const LinksContainer = styled(View)`
  cursor: pointer;
`;

const MenuItemContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

type TSection = {
  $direction: 'horizontal' | 'horizontal-reversed' | 'vertical';
  $sectionSize: 'full' | 'medium' | 'half' | 'dot-section' | 'footsteps';
} & TWithBasicElementOffsets;


const Section = styled.View<TSection>`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;

  ${({ $direction }) => {
    switch ($direction) {
      case 'horizontal':
        return `
          display: flex;
          align-items: center;
          flex-direction: row;
        `;
      case 'horizontal-reversed':
        return `
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        `;
      case 'vertical':
        return `
          display: flex;
          flex-direction: column;
        `;
      case 'top':
        return `
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        `;
      default:
        return '';
    }
  }};

  ${({ $sectionSize }) => {
    switch ($sectionSize) {
      case 'full':
        return `
          height: 100vh;
          z-index: 10;
        `;
      case 'medium':
        return `
          height: 75vh;
        `;
      case 'half':
        return `
          height: 50vh;
        `;
      case 'dot-section':
        return `
          height: 50vh;
        `;
      case 'footsteps':
        return `
          position: absolute;
          height: auto;
          overflow: visible; // Use 'visible' instead of 'initial'
        `;
      default:
        return '';
    }
  }};
`;


const TextContainer = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export {
  TextContainer,
  Section,
  Column,
  ColumnsContainer,
  DashboardCardsContainer,
  OneLineContainer,
  FocusedContainer,
  LinksContainer,
  MenuItemContainer,
};
