import type { FormEventHandler } from 'react';
import styled, { css } from 'styled-components';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
} & TWithBasicElementOffsets &
  TFullWidth;

const Form = styled.form<TFormProps>`
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;
/** @component */
export default Form;
