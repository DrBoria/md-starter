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
    min-height: ${({ theme }) => `calc(${theme?.screens?.tablet?.height || '100vh'} - ${theme?.elements?.header?.height || '60px'})`};
    max-height: unset;
  `;

export type TSectionProps = {
  $noHeightLimit?: boolean;
} & ContainerProps;

export const BasicSection = styled.div<TSectionProps>`
  padding: ${({ theme }) => theme?.offsets?.section || '20px'};
  background-color: ${({ theme }) => theme?.colors?.section || 'transparent'};

  @media ${({ theme }) => theme?.screens?.tablet?.device || '(min-width: 768px)'} {
    height: ${({ theme }) => `calc(${theme?.screens?.tablet?.height || '100vh'} - ${theme?.elements?.header?.height || '60px'})`};
  }

  @media ${({ theme }) => theme?.screens?.desktop?.device || '(min-width: 1024px)'} {
    height: ${({ theme }) => `calc(${theme?.screens?.desktop?.height || '100vh'} - ${theme?.elements?.header?.height || '60px'})`};
    padding: ${({ theme }) => `${theme?.offsets?.section || '20px'} ${theme?.offsets?.section || '20px'}`};
  }

  ${({ $noHeightLimit }) => WithoutHeightLimit($noHeightLimit)}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme?.offsets?.section || '20px'};
  padding-top: ${({ theme }) => theme?.elements?.header?.height || '60px'};
  background-color: ${({ theme }) => theme?.colors?.section || 'inherit'};
`;

export const HeadingContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
  width: 40%;
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
  column-gap: 1rem;
  grid-template-rows: 1fr;
  grid-template-columns: ${({ $colsRatio = ["1fr", "1fr"] }) => $colsRatio.map((col) => `${col}`).join(" ")};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

export const DashboardCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px 0;
`;

export const FocusedContainer = styled.div`
  position: relative;

  &:hover > * {
    color: rgb(255 255 255);
    background: var(--action-color);
    border: 1px solid var(--action-color);
  }
`;

export const OneLineContainer = styled.div<{ $width?: '1/2' | '1/3' }>`
  display: flex;
  align-items: center;
  gap: 5px;
  width: ${({ $width }) => {
    switch ($width) {
      case '1/2': return '50%';
      case '1/3': return '33.33%';
      default: return '100%';
    }
  }};
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
  gap: 1rem;
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
    switch ($sectionSize) {
      case 'full': return css`height: 100vh; z-index: 10;`;
      case 'medium': return css`height: 75vh;`;
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
