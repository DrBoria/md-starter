import styled from 'styled-components';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type TFormLabelProps = {
  htmlFor: string;
} & TWithBasicElementOffsets &
  TFullWidth;

const FormLabel = styled.label<TFormLabelProps>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};

  color: ${({ theme }) => theme.colors.sectionContent};
`;

export { FormLabel };
