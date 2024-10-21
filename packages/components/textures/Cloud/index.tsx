import React, { FC, forwardRef, ForwardedRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import cloudFilter from './clouds.svg'

const encodedFilter = encodeURIComponent(cloudFilter).replace(/'/g, '%27').replace(/"/g, '%22');

const moveLeftFromCurrentPosition = keyframes`
    from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw);
  }
`
// Keyframes for animations
const moveLeft = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100vw);
  }
`;

const moveLeftFromCenter = keyframes`
  0% {
    transform: translateX(0vw);
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
    transform: translateX(0vw);
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
    ${moveLeft} 140s linear infinite;
`

const moveLeftAnimationRule190 = css`
    ${moveLeft} 190s linear 15s infinite;
`

const moveLeftAnimationRule210 = css`
    ${moveLeft} 210s linear 30s infinite;
`

const moveInitialAnimationRule = css`
    ${moveLeftFromCenter} 210s linear forwards;
`

const moveRightInitialAnimationRule = css`
    ${moveRightFromCenter} 210s linear forwards;
`

// Main Cloud component using styled-components
export const CloudContainer = styled.div<ICloudProps>`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.animatedElements};
  width: 35vw;
  max-width: 400px;
  height: 100px;
  transform: translateX(100vw);
  animation: ${moveLeftAnimationRule190};
  margin: -150px;

  ${({ size }) => size === 'small' ? css`
    width: 15vw;
    max-width: 300px;
    animation: ${moveLeftAnimationRule140};
  ` : ''}

  ${({ size }) => size === 'big' && css`
    width: 65vw;
    max-width: 700px;
    animation: ${moveLeftAnimationRule210};
  `}

  ${({ position }) => position?.includes('top') && `
    top: 10vh;
  `}

  ${({ position }) => position?.includes('left') && `
    left: 20vw;
  `}

  ${({ position }) => position?.includes('bottom') && `
    bottom: 40vh;
  `}

  ${({ position }) => position?.includes('right') && `
    right: 20vw;
  `}

  ${({ $isinitial }) => 
  $isinitial ? css`
      transform: translateX(0vw);
      animation: ${moveInitialAnimationRule};
    `
  : ''}

  ${({$manual, top, left, direction}) => $manual ? css`
    top: ${top || 0}px;
    left: ${left || 0}px; 
    animation: ${direction === 'right' ? moveRightInitialAnimationRule : moveInitialAnimationRule};
    transform: none;
  ` : ``}
`;

// Cloud Layers
const cloudLayerBaseCSS = `
  position: relative;
  border-radius: 50%;
`;

export const CloudBase = styled.div`
  ${cloudLayerBaseCSS}
  width: 100%;
  height: 100%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-base');
  box-shadow: 200px 170px 19px 40px #66797f70;
`;

export const CloudBack = styled.div`
  ${cloudLayerBaseCSS}
  margin-top: -90px;
  height: 35%;
  width: 80%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-back');
  box-shadow: 200px 200px 10px 40px #66797f10;
`;

export const CloudMid = styled.div`
  ${cloudLayerBaseCSS}
  margin-top: -80px;
  width: 90%;
  height: 35%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-mid');
  box-shadow: 210px 250px 28px 30px #667d8320;
`;

export const CloudFront = styled.div`
  ${cloudLayerBaseCSS}
  margin-top: -75px;
  left: -20px;
  width: 100%;
  height: 40%;
  filter: url('data:image/svg+xml;utf8,${encodedFilter}#filter-front');
  box-shadow: 210px 272px 30px 0px #94a6a640;
`;

export type ICloudProps = { size?: 'small' | 'big' | 'medium', position?: ('top' | 'left' | 'bottom' | 'right')[], $isinitial?: boolean, top?: number, left?: number, $manual?: boolean, direction?: 'left' | 'right' };

const Cloud = forwardRef<HTMLDivElement, ICloudProps>(
  ({ size, position, $isinitial, top, left, $manual, direction }, ref) =>(
    <CloudContainer ref={ref} size={size} position={position} $isinitial={$isinitial} $manual={$manual} direction={direction} top={top} left={left}>
        <CloudBase />
        <CloudBack />
        <CloudMid />
        <CloudFront />
    </CloudContainer>
));

Cloud.displayName = 'Cloud';
export { Cloud };
