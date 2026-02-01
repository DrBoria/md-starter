import styled from "styled-components/native";
import { View, Dimensions } from "react-native";

import { withFullWidth, withOffsetBottom, withOffsetsRight } from '../helpers';

const { height: screenHeight } = Dimensions.get('window');

const WithoutHeightLimit = ($noHeightLimit) =>
  $noHeightLimit ? {
    height: 'auto',
    minHeight: screenHeight, 
    maxHeight: undefined,
  } : {};

/** @component */
export const BasicSection = styled(View)`
  padding: ${({ theme: { offsets } }) => offsets?.section || 0}px;
  width: 100%;
  min-height: ${({ theme }) => {
    const screenH = theme?.screens?.mobile?.height || screenHeight;
    const headerH = parseInt(theme?.elements?.header?.height || '0', 10);
    return screenH - headerH;
  }}px;
  
  background-color: ${({ theme }) => theme?.colors?.section || 'transparent'};

  ${({ $noHeightLimit }) => WithoutHeightLimit($noHeightLimit)}
`;

export const PageContainer = styled(View)`
  min-height: ${screenHeight}px;
  padding: ${({ theme }) => theme?.offsets?.section || 0}px;
  padding-top: ${({ theme }) => theme?.elements?.header?.height || 0}px;
  background-color: ${({ theme }) => theme?.colors?.section || 'transparent'};
`;

export const HeadingContainer = styled(View)`
  width: 40%;

  ${withFullWidth}
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const Column = styled(View)`
  flex-direction: column;
`;

const ColumnsContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DashboardCardsContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 24px 0;
`;

const FocusedContainer = styled(View)`
  position: relative;
`;

const OneLineContainer = styled(View)`
  flex-direction: row;
  align-items: center;

  width: ${({ $width }) => {
    switch ($width) {
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
`;

const MenuItemContainer = styled(View)`
  flex-direction: row;
`;


const Section = styled(View)`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;

  ${({ $direction }) => {
    switch ($direction) {
      case 'horizontal':
        return `
          align-items: center;
          flex-direction: row;
        `;
      case 'horizontal-reversed':
        return `
          align-items: center;
          flex-direction: row-reverse;
        `;
      case 'vertical':
        return `
          flex-direction: column;
        `;
      case 'top':
        return `
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
          height: ${screenHeight}px;
        `;
      case 'medium':
        return `
          height: ${screenHeight * 0.75}px;
        `;
      case 'half':
        return `
          height: ${screenHeight * 0.5}px;
        `;
      case 'dot-section':
        return `
          height: ${screenHeight * 0.5}px;
        `;
      case 'footsteps':
        return `
          position: absolute;
          height: auto;
          overflow: visible;
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
