import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import cloudFilter from './clouds.svg'

const encodedFilter = encodeURIComponent(cloudFilter).replace(/'/g, '%27').replace(/"/g, '%22');

const moveLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw);
  }
`;

const moveLeftFromCenter = keyframes`
  0% {
    transform: translateX(0);
  }
  99% {
    transform: translateX(-100vw);
    display: block;
  }
  100% {
    display: none;
  }
`;

const moveRightFromCenter = keyframes`
  0% {
    transform: translateX(0);
  }
  99% {
    transform: translateX(100vw);
    display: block;
  }
  100% {
    display: none;
  }
`;

const moveLeftAnimationRule140 = css`
    animation: ${moveLeft} 140s linear infinite;
`

const moveLeftAnimationRule190 = css`
    animation: ${moveLeft} 190s linear 15s infinite;
`

const moveLeftAnimationRule210 = css`
    animation: ${moveLeft} 210s linear 30s infinite;
`

const moveInitialAnimationRule = css`
    animation: ${moveLeftFromCenter} 210s linear forwards;
`

const moveRightInitialAnimationRule = css`
    animation: ${moveRightFromCenter} 210s linear forwards;
`

const CLOUD_WIDTH_FACTOR = 5;

import type { ThemeInterface } from '@md/styles';

const CloudContainer = styled.div<ICloudProps & { theme: ThemeInterface }>`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.animatedElements};
  width: calc(${({ theme }) => theme.elements.form.height} * ${CLOUD_WIDTH_FACTOR} * 1.5);
  max-width: 50vw;
  height: ${({ theme }) => theme.elements.form.height};
  transform: translateX(100vw);
  ${moveLeftAnimationRule190}
  margin: calc(${({ theme }) => theme.elements.form.height} * -3);

  ${({ $size, theme }) => $size === 'small' && css`
    width: calc(${theme.elements.form.height} * 5 * 0.5);
    max-width: 50vw;
    ${moveLeftAnimationRule140}
  `}

  ${({ $size, theme }) => $size === 'big' && css`
    width: calc(${theme.elements.form.height} * 5 * 2.5);
    max-width: 50vw;
    ${moveLeftAnimationRule210}
  `}

  ${({ $position }) => $position?.includes('top') && `
    top: 10vh;
  `}

  ${({ $position }) => $position?.includes('left') && `
    left: 20vw;
  `}

  ${({ $position }) => $position?.includes('bottom') && `
    bottom: 40vh;
  `}

  ${({ $position }) => $position?.includes('right') && `
    right: 20vw;
  `}

  ${({ $isinitial }) =>
    $isinitial ? css`
      transform: translateX(0);
      ${moveInitialAnimationRule}
    `
      : ''}

  ${({ $manual, $top, $left, $direction, theme }) => $manual ? css`
    top: calc(${theme.elements.form.height} * ${$top || 0} / 50);
    left: calc(${theme.elements.form.height} * ${$left || 0} / 50); 
    ${$direction === 'right' ? moveRightInitialAnimationRule : moveInitialAnimationRule}
    transform: none;
  ` : ``}
`;

export const CloudLayerBaseCSS = `
  position: relative;
  border-radius: 50%;
`;

export const CloudBase = styled.div`
  ${CloudLayerBaseCSS}
  width: 100%;
  height: 100%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-base');
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

export const CloudBack = styled.div`
  ${CloudLayerBaseCSS}
  margin-top: calc(${({ theme }) => theme.elements.form.height} * -2);
  height: 50%;
  width: 100%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-back');
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const CloudMid = styled.div`
  ${CloudLayerBaseCSS}
  margin-top: calc(${({ theme }) => theme.elements.form.height} * -1.5);
  width: 100%;
  height: 50%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-mid');
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

export const CloudFront = styled.div`
  ${CloudLayerBaseCSS}
  margin-top: calc(${({ theme }) => theme.elements.form.height} * -1.5);
  left: calc(${({ theme }) => theme.elements.icons.width} * -1);
  width: 100%;
  height: 50%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-front');
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

export type ICloudProps = { $size?: 'small' | 'big' | 'medium', $position?: ('top' | 'left' | 'bottom' | 'right')[], $isinitial?: boolean, $top?: number, $left?: number, $manual?: boolean, $direction?: 'left' | 'right' };

export const Cloud = ({ $size, $position, $isinitial, $top, $left, $manual, $direction }: ICloudProps) => {
  return (
    <CloudContainer $size={$size} $position={$position} $isinitial={$isinitial} $manual={$manual} $direction={$direction} $top={$top} $left={$left}>
      <CloudBase />
      <CloudBack />
      <CloudMid />
      <CloudFront />
    </CloudContainer>
  );
};

Cloud.displayName = 'Cloud';
export default Cloud;
