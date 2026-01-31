import type { ZIndexName} from '@md/styles';
import { getZIndex } from '@md/styles';
import Image from "next-image-export-optimizer";
import React from 'react';
import styled, { keyframes, css } from 'styled-components';

type IWideImageProps = {
    src: string;
    alt?: string;
    width: number;
    height: number;
    priority?: boolean;
    alignment?: 'top' | 'bottom' | 'center';
    zIndex?: ZIndexName;
    blured?: boolean;
    hidden?: boolean;
    layer?: 'front' | 'back';
    onLoad?: () => void
}
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeInZoomed = keyframes`
  0% {
    opacity: 0;
    filter: blur(20px);
    transform: translate(-50%,-50%) scale(0.9);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translate(-50%,-50%) scale(1);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const zoomOutFront = keyframes`
    0% {
        transform: translateX(-50%) scale(3);
    }
    100% {
        transform: translateX(-50%) scale(1);
    }
`;

const zoomOutBack = keyframes`
    0% {
        filter: blur(20px);
        transform: translateX(-50%) scale(1.3);
    }
    100% {
        filter: blur(0);
        transform: translateX(-50%) scale(1);
    }
`;

export const fadeInAnimation = css`
   ${fadeIn} 0.2s linear forwards;
`;

export const fadeOutAnimation = css`
   ${fadeOut} 0.2s linear forwards;
`;

export const fadeInZoomedAnimation = css`
   ${fadeInZoomed} 0.2s linear forwards;
`;

const ImageWrapper = styled(Image).attrs<{ $layer?: 'back'| 'front'; $zIndex?: ZIndexName, $isHalfSize?: boolean, $alignment?: 'top' | 'bottom' | 'center', $blured?: boolean }>({})`
    position: absolute;

    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: auto;
    opacity: 0;

    min-height: 100%;
    min-width: 100%;
    
    z-index: ${({ $zIndex = 'background' }) => getZIndex($zIndex)};

    ${({hidden}) => hidden ?
        css`
            animation: ${fadeOutAnimation};
            animation-duration: 2s;
            animation-fill-mode: forwards;
        `
            :
        css`
            animation: ${fadeInZoomedAnimation};
            animation-duration: 0.6s;
            animation-delay: 1.4s;
            animation-fill-mode: forwards;
        `
        }

    ${({ $blured }) => $blured ? css`
        filter: blur(20px);
        transform: translateX(-50%) scale(1.3);
        animation: ${fadeInAnimation};
    ` : ``}

    
    ${({ $alignment }) => $alignment && ({
        'top': `
            top: 0;
            transform: translateX(-50%);
            animation: none;
            opacity: 1;
        `,
        'bottom': `
            top: auto;
            bottom: 0;
            transform: translateX(-50%) scaleY(-1);
            animation: none;
            opacity: 1;
        `,
        'center': `
            top: 50%;
            transform: translate(-50%, -50%);
        `
    }[$alignment])};
    
    ${({ $layer }) => $layer && 
        ({
            'front': css`
                    opacity: 1;
                    animation: ${zoomOutFront};
                    animation-duration: 2s;
                `,
            'back': css`
                    opacity: 1;
                    animation: ${zoomOutBack};
                    animation-duration: 2s;
                `
        }[$layer]
        )};
`

const WideImage = React.forwardRef<HTMLImageElement, IWideImageProps>(({ src, alt = 'huge image of landscape on background', layer, hidden, width = 2040, height = 1152, priority = true, zIndex, alignment, blured, onLoad }, ref) => (
    <ImageWrapper
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        $zIndex={zIndex}
        $alignment={alignment}
        ref={ref}
        hidden={hidden}
        $blured={blured}
        $layer={layer}
        onLoad={onLoad}
    />
));

WideImage.displayName = 'WideImage';
export default WideImage;
