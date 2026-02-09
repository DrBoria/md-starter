import React from 'react';
import styled, { css } from 'styled-components';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight, basicFont } from '@md/styles';

type TSubmitProps = {
  name: string;
  id?: string;
  value: string | number;
} & TWithBasicElementOffsets &
  TFullWidth;

const SubmitInput = styled.input<TSubmitProps>`
  display: block;
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => `${theme.offsets.elementContent} calc(${theme.offsets.elementContent} * 2)`};
  color: ${({ theme }) => theme.colors.highlightedText};
  font: ${basicFont};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.font.spacing};
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
      ${theme.effects?.depth?.inner?.soft}, 
      ${theme.effects?.depth?.outer?.soft},
      ${theme.effects?.glow?.soft};

    &:hover {
      filter: brightness(1.2);
      transform: translateY(-2px);
      box-shadow: 
        ${theme.effects?.depth?.inner?.medium}, 
        ${theme.effects?.depth?.outer?.medium},
        ${theme.effects?.glow?.medium};
      text-shadow: ${theme.effects?.glow?.small};
    }

    &:active {
      transform: translateY(2px);
      box-shadow: ${theme.effects?.depth?.inner?.strong}; 
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
