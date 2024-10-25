import React from "react";
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
  height: ${({ theme }) => `calc(${theme.screens.mobile.height}px - ${theme.elements.header.height})`};
  max-height: ${({ theme }) => `calc(${theme.screens.desktop.height} - ${theme.elements.header.height})`};
  padding: ${({ theme: { offsets } }) => offsets.section}px;

  background-color: ${({ theme }) => theme.colors.section};

  ${({ noHeightLimit }) => WithoutHeightLimit(noHeightLimit)}
`;

export const PageContainer = styled(View)`
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
};

const Section = styled(View)<TSection>`
  position: relative;
  width: 100%;
  overflow: hidden;

  ${({ $direction }) => ({
    horizontal: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    'horizontal-reversed': {
      display: 'flex',
      flexDirection: 'row-reverse',
      alignItems: 'center',
    },
    vertical: {
      display: 'flex',
      flexDirection: 'column',
    },
  }[$direction])};

  ${({ $sectionSize }) => ({
    full: {
      height: '100vh',
      zIndex: 10,
    },
    medium: {
      height: '75vh',
    },
    half: {
      height: '50vh',
    },
    'dot-section': {
      height: '50vh',
    },
    footsteps: {
      position: 'absolute',
      height: 'auto',
      overflow: 'initial',
    },
  }[$sectionSize])};
`;

const TextContainer = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 50vw;
  margin: 0 auto;
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
