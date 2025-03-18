import React from 'react';
import styled from 'styled-components';

import { basicFont } from '../../Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TSubmitProps = {
  name: string;
  id?: string;
  value: string | number;
} & TWithBasicElementOffsets &
  TFullWidth;

const SubmitInput = styled.input<TSubmitProps>`
  display: block;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => `${theme.offsets.elementContent} calc(${theme.offsets.elementContent} * 2)`};

  color: ${({ theme }) => theme.colors.highlightedText};
  font: ${basicFont};
  font-weight: 700;

  background: ${({ theme }) => theme.colors.highlighted};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
`;

const Submit = (props: TSubmitProps) => <SubmitInput {...props} type='submit' />;

export { Submit };
