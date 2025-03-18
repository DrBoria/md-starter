import type { ZIndexName} from '@md/styles';
import { getZIndex } from '@md/styles';
import Image from "next-image-export-optimizer";
import React, { forwardRef } from 'react';
import styled from 'styled-components';

type ICircleImageProps = {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    zIndex?: ZIndexName,
}

const ImageWrapper = styled(Image).attrs<{ $zIndex?: ZIndexName, $isHalfSize?: boolean }>({})`
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;

    z-index: ${({ $zIndex = 'content' }) => getZIndex($zIndex)};
`

const CircleImage = forwardRef<HTMLImageElement, ICircleImageProps>(({ src, alt = 'huge image of landscape on background', width = 2040, height = 1152, priority = false, zIndex }, ref) => (
    <ImageWrapper
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        $zIndex={zIndex}
        ref={ref}
    />
));

CircleImage.displayName = 'CircleImage';
export default CircleImage;
