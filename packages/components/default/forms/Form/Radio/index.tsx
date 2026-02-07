import React from 'react';
import styled from 'styled-components';
import { vikingTheme } from './themes/viking';
import { liquidGlassTheme } from './themes/liquidGlass';

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

  ${HiddenRadio}:checked + & {
    background-color: ${({ theme }) => theme.colors.highlighted};
    border-color: ${({ theme }) => theme.colors.highlighted};
    
    /* Let themes override checked state style completely if needed, 
       but keeping default behavioral fallback for others */
  }

  /* Theme Support */
  ${({ theme }) => theme.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme.theme === 'liquidGlass' && liquidGlassTheme}
`;

const Radio = ({ name, id, value, checked, onChange, $offsetBottom, $offsetRight, $fullWidth, ...props }: TRadioProps) => {
  return (
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
};

export { Radio };
