import React from 'react';
import styled, { DefaultTheme } from "styled-components";
import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

const ProgressContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.section};
    border: ${({ theme }: { theme: DefaultTheme }) => theme.border.size} solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.sectionContent};
    height: ${({ theme }: { theme: DefaultTheme }) => `calc(${theme.border.size} * 8)`};
    display: flex;
    align-items: center;
    border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.border.radius};

    margin-right: ${withOffsetsRight};
    margin-bottom: ${withOffsetBottom};
`;

const ProgressBarIndicator = styled.div<{ percentage: number }>`
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.sectionContent};
    width: ${(props) => props.percentage}%;
    height: 100%;
`;

type TProgressBarProps = {
  percentage: number;
} & TWithBasicElementOffsets &
  TFullWidth;

const ProgressBar = ({ percentage, ...props }: TProgressBarProps) => {
  return (
    <ProgressContainer {...props}>
      <ProgressBarIndicator percentage={percentage} />
    </ProgressContainer>
  );
};

export { ProgressBar };
