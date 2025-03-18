import styled from 'styled-components';

import type { TWithBasicElementOffsets } from '@md/styles';
import { withOffsetsRight, withOffsetBottom } from '@md/styles';

/* **************************************************************** */
/* ************************** GRAPHICS **************************** */
/* **************************************************************** */

export const GraphicsContainer = styled.div<TWithBasicElementOffsets>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

export const LegendContainer = styled.div<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

export const LegendRowContainer = styled.div<TWithBasicElementOffsets>`
  display: flex;
  justify-content: space-between;

  height: ${({ theme }) => theme.elements.icons.height};

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;
