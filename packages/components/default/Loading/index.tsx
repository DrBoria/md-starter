import React from 'react';
import Image from "next-image-export-optimizer";
import styled, { css, keyframes } from 'styled-components';
import { ThemeProvider } from '@md/styles';

// Define the animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


const fadeOut = keyframes`
  0% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`;

export const fadeInAnimation = css`
   ${fadeIn} 0.2s linear forwards;
`;

export const fadeOutAnimation = css`
   ${fadeOut} 0.2s linear forwards;
`;


// Create a Wrapper div with animation and absolute positioning
const LoadingWrapper = styled.div<{ $hidden: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute; // Positioning the wrapper absolutely
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: ${({ theme }) => theme.zIndex.animatedElements};

    ${({ $hidden }) => $hidden ?
    css`
            animation: ${fadeOutAnimation};
        `
    :
    css`
            animation: ${fadeInAnimation};
        `}
`;

// Style the image with the animation
export const LoaderImage = styled(Image)`
  animation: ${rotate} 2s linear infinite; // Rotate every 2 seconds indefinitely
  height: 35vw; // Set the size of the image as required
  width: 35vw;
`;

// The actual loading indicator component
const Loading = ({ hidden }: { hidden: boolean }) => (
  <LoadingWrapper $hidden={hidden}>
    <LoaderImage src="/ouroboros.svg" alt="Loading..." priority width={700} height={700} />
  </LoadingWrapper>
);

export { Loading };

