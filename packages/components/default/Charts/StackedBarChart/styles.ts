import { ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

import { basicFont } from '../../Typography';

import type { TComponentProps } from './types';

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.offsets.betweenElements};
`;

export const ColoredDot = styled.div`
  ${({ theme: { border, offsets, colors } }) => `
    background: ${colors.section};
    border-radius: ${border.circle};
    width: ${offsets.betweenElements};
    height: ${offsets.betweenElements};
    margin-right: ${offsets.betweenElements};
  `}
`;

export const Wrapper = styled(ResponsiveContainer)<TComponentProps>`
  ${({ theme: { border, offsets, colors } }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${border.radius};
    background: ${colors.section};

    .recharts-surface {
      padding: ${offsets.betweenElements};
    }

    .recharts-cartesian-axis-line {
      stroke: ${colors.sectionContent};
    }

    .recharts-text {
      font: ${basicFont};
      color: ${colors.sectionContent};
    }

    .recharts-cartesian-axis-tick-line {
      display: none;
    }

    .recharts-reference-line {
      stroke-dasharray: 10 10;
    }

    .recharts-reference-line text {
      font: ${basicFont};
      font-weight: 600;
      text-align: right;
    }

    .recharts-reference-line line {
      stroke-width: 0.125rem;
    }

    circle {
      visibility: hidden;

      :first-child,
      :last-child {
        visibility: visible;
        r: 0.45rem;
        fill-opacity: 1;
        stroke-width: 2;
        stroke: ${colors.section};
      }
    }

    .recharts-layer path {
      stroke-width: 0.25rem;
    }
  `}
`;
