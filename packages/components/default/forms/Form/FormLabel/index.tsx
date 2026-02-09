import styled, { css } from 'styled-components';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TFormLabelProps = {
  htmlFor: string;
} & TWithBasicElementOffsets &
  TFullWidth;

const FormLabel = styled.label<TFormLabelProps>`
  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme.colors.sectionContent};
`;

export { FormLabel };
