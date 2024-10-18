import { FormEventHandler } from 'react';
import styled from 'styled-components';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

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
