import { ResponsiveContainer } from 'recharts';
import styled, { css } from 'styled-components';

import { basicFont } from '../../Typography';

import type { TComponentProps, TProps } from './types';

const Wrapper = styled(({ $variant, $referenceLine, ...props }: any) => <ResponsiveContainer {...props} />)<TComponentProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.colors.section};

  .recharts-surface {
    padding: ${({ theme }) => theme.offsets.betweenElements};
  }

  .recharts-cartesian-axis-line {
    stroke: ${({ theme }) => theme.colors.sectionContent};
  }

  .recharts-text {
    color: ${({ theme }) => theme.colors.sectionContent};
    font: ${basicFont};
  }

  .recharts-cartesian-axis-tick-line {
    display: none;
  }

  .recharts-reference-line {
    stroke-dasharray: 10 10;
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

      stroke: ${({ theme }) => theme.colors.section};
    }
  }

  .recharts-layer path {
    stroke-width: 0.25rem;
  }

  ${({ $variant, theme: { colors } }) => {
    const color = ($variant === 'green' || $variant === 'red') ? colors.sectionContent : colors.highlighted;
    return css`
      .recharts-reference-line line {
        stroke: ${color};
      }
      circle {
        :first-child,
        :last-child {
          fill: ${color};
        }
      }
      .recharts-layer path {
        :last-child {
          stroke: ${color};
        }
        :first-child {
          fill: ${color};
        }
      }
    `;
  }}
`;

export default Wrapper;
