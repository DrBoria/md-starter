import type { FormEventHandler } from 'react';
import styled from 'styled-components';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
} & TWithBasicElementOffsets &
  TFullWidth;

const Form = styled.form<TFormProps>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;
export default Form;
