import React from 'react';
import styled, { css } from 'styled-components';

import { basicFont } from '../../../data-display/Typography';

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
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => `${theme.offsets.elementContent} calc(${theme.offsets.elementContent} * 2)`};
  color: ${({ theme }) => theme.colors.highlightedText};
  font: ${basicFont};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: ${({ theme }) => theme.colors.highlighted};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
    border-radius: 0;
    clip-path: ${theme.geometry?.ragged};
    background-image: ${theme.effects?.texture};
    box-shadow: 
      inset 0 1px 0 rgb(255 255 255 / 40%), 
      0 4px 0 rgb(0 0 0 / 50%),
      ${theme.effects?.glow?.soft};

    &:hover {
      filter: brightness(1.2);
      transform: translateY(-2px);
      box-shadow: 
        inset 0 1px 0 rgb(255 255 255 / 50%), 
        0 6px 0 rgb(0 0 0 / 50%),
        ${theme.effects?.glow?.medium};
      text-shadow: 0 0 10px ${theme.colors.highlighted || 'white'};
    }

    &:active {
      transform: translateY(2px);
      box-shadow: inset 0 2px 5px rgb(0 0 0 / 70%); 
      filter: brightness(0.8);
    }
  `}
`;

const Submit = ({ $offsetBottom, $offsetRight, $fullWidth, ...props }: TSubmitProps) => (
  <SubmitInput
    {...props}
    $offsetBottom={$offsetBottom}
    $offsetRight={$offsetRight}
    $fullWidth={$fullWidth}
    type="submit"
  />
);

export { Submit };
