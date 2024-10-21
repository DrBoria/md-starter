import styled from 'styled-components';
import React, { FC, ReactNode, useRef, useState } from 'react';
import { Column, ColumnsContainer } from '../Containers';
import { CircleImage } from '../../next/Images';
import { PlainText, SectionTitle } from '../Typography';
import { debounce, useIsMobile } from '@md/utils';
import ConditionalWrapper from '../ConditionalWrapper';
import ArrowIcon from './arrow.svg'

const CarouselPage = styled.div<{ $isMobile: boolean | null, $slidsCount: number }>`
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
    height: 100%;
    
    display: grid;
    grid-template-columns: repeat(${({ $slidsCount }) => $slidsCount}, 100%);
    grid-template-rows: 1fr;

    ${({ $isMobile }) => $isMobile ? `
            overflow-x: scroll;
        ` : `
            overflow-x: hidden;
    `}

    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-color: transparent transparent;
    
    // Analogue of smooth animations
    scroll-behavior: smooth;

    &.active {
        scroll-snap-type: unset;
    }
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`;

const Slide = styled.div`
    scroll-snap-align: center;
    display: flex;
`

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const CarouselButton = styled.div<{ $side: 'prev' | 'next', $isActive: boolean }>`
    z-index: ${({ theme }) => theme.zIndex.alert};
    position: absolute;

    top: 50%;
    bottom: 0;
    transform: translateY(-50%);
    user-select: none;

    ${({ $side, theme }) => ({
        'prev': `
            left: ${theme.offsets.page};
        `,
        'next': `
            right: ${theme.offsets.page};
            transform: translateY(-50%) scaleX(-1);
        `
    }[$side])};

    & polyline{
        ${({ $isActive }) => $isActive ? `
            fill: transparent;
            stroke-miterlimit: 10;
            stroke-width: 3px;
            stroke: #000000;

            cursor: pointer;
        ` : `
            fill: transparent;
            stroke-miterlimit: 10;
            stroke-width: 3px;
            stroke: #818181;
        `}
    }
`;

type TCarouselSlide = {
    url: string,
    title: string,
    text: string | ReactNode,
}

type TCarouselProps = {
    slides: TCarouselSlide[];
    reversed?: boolean;
}

const Carousel: FC<TCarouselProps> = ({ slides, reversed = false }) => {
    const previousScrollPositionRef = useRef(0);
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0);

    const isMobile = useIsMobile();
    const carousel = useRef<(HTMLDivElement | null)>(null);

    // Buttons handler
    const onSlide = (direction: 'prev' | 'next') => {
        if (!carousel.current) return;

        const slideWidth = carousel.current.offsetWidth;
        const currentScrollLeft = carousel.current.scrollLeft;
        if (direction === 'next') {
            if (slides.length - 1 <= currentSlideNumber) return;

            setCurrentSlideNumber(Math.min(currentSlideNumber + 1, slides.length - 1));
            carousel.current.scrollLeft = currentScrollLeft + slideWidth;
        } else {
            if (currentSlideNumber <= 0) return;

            setCurrentSlideNumber(Math.max(currentSlideNumber - 1, 0));
            carousel.current.scrollLeft = currentScrollLeft - slideWidth;
        }
    }

    const handleScroll = debounce((e) => {
        if (!isMobile || !carousel.current) return;

        const scrollLeft = e.target.scrollLeft;
        const direction = scrollLeft - previousScrollPositionRef.current;

        if (direction < 0) {
            setCurrentSlideNumber(Math.max(currentSlideNumber - 1, 0));
        } else if (direction > 0) {
            setCurrentSlideNumber(Math.min(currentSlideNumber + 1, slides.length - 1));
        }

        // Update the previous scroll position for the next invocation
        previousScrollPositionRef.current = scrollLeft;
    }, 50)

    return (
        <Container>
            <CarouselButton $side='prev' onClick={() => onSlide('prev')} dangerouslySetInnerHTML={{ __html: ArrowIcon }} $isActive={currentSlideNumber > 0} />
            <CarouselPage ref={(el) => { carousel.current = el; }} onScroll={handleScroll} $slidsCount={slides.length} $isMobile={isMobile}>
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                    >
                        <ConditionalWrapper Wrapper={isMobile ? Column : ColumnsContainer}>
                            {isMobile || reversed ? (
                                <>
                                    <Column>
                                        <CircleImage src={slide.url} />
                                    </Column>
                                    <Column>
                                        <SectionTitle>
                                            {slide.title}</SectionTitle>
                                        <PlainText>
                                            {slide.text}
                                        </PlainText>
                                    </Column>
                                </>
                            ) :
                                (
                                    <>
                                        <Column>
                                            <SectionTitle>
                                                {slide.title}</SectionTitle>
                                            <PlainText>
                                                {slide.text}
                                            </PlainText>
                                        </Column>
                                        <Column>
                                            <CircleImage src={slide.url} />
                                        </Column>
                                    </>
                                )
                            }
                        </ConditionalWrapper>
                    </Slide>
                ))}

            </CarouselPage>
            <CarouselButton $side='next' onClick={() => onSlide('next')} dangerouslySetInnerHTML={{ __html: ArrowIcon }} $isActive={currentSlideNumber < slides.length - 1} />
        </Container>
    )
};

export { Carousel };
