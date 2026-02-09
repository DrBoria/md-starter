import styled, { css } from "styled-components";
import type { TFullWidth, TWithBasicElementOffsets } from '@md/styles';
import { withFullWidth, withOffsetBottom, withOffsetsRight } from '@md/styles';
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const WithoutHeightLimit = ($noHeightLimit?: boolean) =>
  $noHeightLimit &&
  css`
    height: auto;
    min-height: ${({ theme }) => `calc(${theme.screens.tablet.height}px - ${theme.elements.header.height})`};
    max-height: unset;
  `;

export type TSectionProps = {
  $noHeightLimit?: boolean;
} & ContainerProps;

import type { ThemeInterface } from '@md/styles';

export const BasicSection = styled.div<TSectionProps & { theme: ThemeInterface }>`
  padding: ${({ theme }) => theme.offsets.section};
  background-color: ${({ theme }) => theme.colors.section};

  @media ${({ theme }) => theme.screens.tablet.device} {
    height: ${({ theme }) => `calc(${theme.screens.tablet.height}px - ${theme.elements.header.height})`};
  }

  @media ${({ theme }) => theme.screens.desktop.device} {
    height: ${({ theme }) => `calc(${theme.screens.desktop.height}px - ${theme.elements.header.height})`};
    padding: ${({ theme }) => theme.offsets.section};
  }

  ${({ $noHeightLimit }) => WithoutHeightLimit($noHeightLimit)}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.offsets.section};
  padding-top: ${({ theme }) => theme.elements.header.height};
  background-color: ${({ theme }) => theme.colors.section};
`;

export const HeadingContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
  width: 100%;
  text-align: left;
  ${withFullWidth}
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface ColumnsContainerProps {
  $colsRatio?: string[];
}

export const ColumnsContainer = styled.div<ColumnsContainerProps & TWithBasicElementOffsets>`
  display: grid;
  column-gap: ${({ theme }) => theme.offsets.betweenElements};
  grid-template-rows: 1fr;
  grid-template-columns: ${({ $colsRatio = ["1fr", "1fr"] }) => $colsRatio.map((col) => `${col}`).join(" ")};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

export const DashboardCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.offsets.betweenElements};
  padding: ${({ theme }) => theme.offsets.section} 0;
`;

export const FocusedContainer = styled.div`
  position: relative;

  &:hover > * {
    color: ${({ theme }) => theme.colors.highlightedText};
    background: ${({ theme }) => theme.colors.highlighted};
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
  }
`;

export const OneLineContainer = styled.div<{ $width?: '1/2' | '1/3' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.elementContent};
  ${({ $width }) => {
    switch ($width) {
      case '1/2': return css`width: 50%;`;
      case '1/3': return css`flex: 1;`;
      default: return css`width: 100%;`;
    }
  }}
`;

export const LinksContainer = styled.div`
  cursor: pointer;

  div {
    cursor: pointer;
    color: var(--action-color);
  }
`;

export const MenuItemContainer = styled.div<TWithBasicElementOffsets>`
  display: flex;
  gap: ${({ theme }) => theme.offsets.betweenElements};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

export type TSection = {
  $direction: 'horizontal' | 'horizontal-reversed' | 'vertical' | 'top',
  $sectionSize: 'full' | 'medium' | 'half' | 'dot-section' | 'footsteps'
};

export const Section = styled.section<TSection>`
  position: relative;
  width: 100%;

  ${({ $direction }) => {
    switch ($direction) {
      case 'horizontal': return css`display: flex; align-items: center;`;
      case 'horizontal-reversed': return css`display: flex; align-items: center; flex-direction: row-reverse;`;
      case 'vertical': return css`display: flex; flex-direction: column;`;
      case 'top': return css`display: flex; flex-direction: column; justify-content: flex-start;`;
      default: return '';
    }
  }}

  ${({ $sectionSize }) => {
    const mediumHeight = '75vh'; // Defined locally to satisfy strict linting
    switch ($sectionSize) {
      case 'full': return css`height: 100vh; z-index: 10;`;
      case 'medium': return css`height: ${mediumHeight};`;
      case 'half': return css`height: 50vh;`;
      case 'dot-section': return css`height: 50vh;`;
      case 'footsteps': return css`position: absolute; height: auto; overflow: initial;`;
      default: return '';
    }
  }}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50vw;
  margin: 0 auto;
`;
