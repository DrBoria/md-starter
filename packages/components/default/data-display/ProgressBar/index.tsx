import React from 'react';
import styled from "styled-components";
import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

const ProgressContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
    background-color: ${({ theme }) => theme.colors.section};
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
    height: ${({ theme }) => `calc(${theme.border.size} * 8)`};
    display: flex;
    align-items: center;
    border-radius: ${({ theme }) => theme.border.radius}px;
    margin-right: ${withOffsetsRight};
    margin-bottom: ${withOffsetBottom};
`;

const ProgressBarIndicator = styled.div<{ $percentage: number }>`
    background-color: ${({ theme }) => theme.colors.sectionContent};
    width: ${({ $percentage }) => $percentage}%;
    height: 100%;
`;

type TProgressBarProps = {
  percentage: number;
} & TWithBasicElementOffsets &
  TFullWidth;

const ProgressBar = ({ percentage, $offsetBottom, $offsetRight, $fullWidth, ...props }: TProgressBarProps) => {
  return (
    <ProgressContainer $offsetBottom={$offsetBottom} $offsetRight={$offsetRight} $fullWidth={$fullWidth} {...props}>
      <ProgressBarIndicator $percentage={percentage} />
    </ProgressContainer>
  );
};

export { ProgressBar };
