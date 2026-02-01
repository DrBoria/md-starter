import React from 'react';
import styled, { css } from 'styled-components';

import { basicFont } from '../../../data-display/Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TRadioProps = {
  name: string;
  id?: string;
  value: string | number;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TWithBasicElementOffsets &
  TFullWidth;

const RadioContainer = styled.label<TWithBasicElementOffsets & TFullWidth>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => `calc(${theme.elements.form.height} / 1.5)`};
  height: ${({ theme }) => `calc(${theme.elements.form.height} / 1.5)`};
  
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  
  cursor: pointer;
  position: relative;
  user-select: none;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const RadioMark = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  
  background-color: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.disabled};
  border-radius: 50%;
  transition: all 0.2s ease;

  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
    border-radius: 0;
    clip-path: ${theme.geometry?.ragged};
    background-image: ${theme.effects?.texture};
    box-shadow: ${theme.effects?.depth?.inner?.medium};
    border: 1px solid ${theme.colors.disabled};
    
    &::before {
      content: '';
      color: ${theme.colors.highlighted};
      font-size: 14px;
      font-weight: 700;
      transition: all 0.2s ease;
      opacity: 0;
      transform: scale(0.5);
    }
  `}

  ${HiddenRadio}:checked + & {
    background-color: ${({ theme }) => theme.colors.highlighted};
    border-color: ${({ theme }) => theme.colors.highlighted};

    ${({ theme }) => theme.theme === 'viking' && css`
      background-color: ${theme.colors.overlayActive};
      box-shadow: ${theme.effects?.glow?.medium};
      border-color: ${theme.colors.highlighted};

      &::before {
        content: 'ᛟ'; /* Othala Rune */
        opacity: 1;
        transform: scale(1);
        text-shadow: ${theme.effects?.glow?.soft};
      }
    `}
  }
`;

const Radio = ({ name, id, value, checked, onChange, $offsetBottom, $offsetRight, $fullWidth, ...props }: TRadioProps) => (
  <RadioContainer $offsetBottom={$offsetBottom} $offsetRight={$offsetRight} $fullWidth={$fullWidth}>
    <HiddenRadio 
      id={id} 
      name={name} 
      value={value} 
      checked={checked} 
      onChange={onChange} 
      {...props} 
    />
    <RadioMark />
  </RadioContainer>
);

export { Radio };
