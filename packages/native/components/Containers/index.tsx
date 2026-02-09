import styled from "styled-components/native";
import { View, Dimensions } from "react-native";

import { withFullWidth, withOffsetBottom, withOffsetsRight } from '@md/native/components/helpers';
import type { TFullWidth } from '@md/native/components/helpers';

// ... (lines 6-36 skipped in replacement content, but I will target the import line and the component line separately if possible, or use replace_file_content for the whole block)
// Actually, I can do it in one go if lines are close, but they are far.
// I will do 2 replaces.


const { height: screenHeight } = Dimensions.get('window');

const WithoutHeightLimit = ($noHeightLimit: boolean | undefined) =>
  $noHeightLimit ? {
    height: 'auto',
    minHeight: screenHeight,
    maxHeight: undefined,
  } : {};

/** @component */
export const BasicSection = styled(View) <{ $noHeightLimit?: boolean }>`
  padding: ${({ theme: { offsets } }) => offsets.section}px;
  width: 100%;
  min-height: ${({ theme }) => {
    const screenH = theme.screens.mobile?.height || screenHeight;
    const headerH = parseInt(theme.elements.header?.height || '0', 10);
    return screenH - headerH;
  }}px;
  
  background-color: ${({ theme }) => theme.colors.section};

  ${({ $noHeightLimit }) => WithoutHeightLimit($noHeightLimit)}
`;

export const PageContainer = styled(View)`
  min-height: ${screenHeight}px;
  padding: ${({ theme }) => theme.offsets.section}px;
  padding-top: ${({ theme }) => theme.elements.header?.height}px;
  background-color: ${({ theme }) => theme.colors.section};
`;

export const HeadingContainer = styled(View) <TFullWidth>`
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

const OneLineContainer = styled(View) <{ $width?: '1/2' | '1/3' }>`
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


const Section = styled(View) <{ $direction?: 'horizontal' | 'horizontal-reversed' | 'vertical' | 'top'; $sectionSize?: 'full' | 'medium' | 'half' | 'dot-section' | 'footsteps' }>`
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
