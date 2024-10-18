import React from 'react';
import styled from 'styled-components';

import { basicFont } from '../../Typography';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

import ArrowDownIcon from './arrow_down.svg';

export type TOption = { value: any; text: string };
type TSelectProps = {
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  value: any;
  defaultText?: string;
  options: TOption[];
} & TWithBasicElementOffsets &
  TFullWidth;

const SelectInput = styled.select`
  display: block;
  width: 100%;
  height: ${({ theme }) => theme.elements.form.height};
  padding: ${({ theme }) => theme.offsets.elementContent};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};

  background: ${({ theme }) => theme.colors.overlay};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  outline: 0;
  box-shadow: none;
  cursor: pointer;

  appearance: none;

  &:invalid {
    color: ${({ theme }) => theme.colors.disabled};
  }
`;

const Option = styled.option`
  color: ${({ theme }) => theme.colors.sectionContent};

  background: ${({ theme }) => theme.colors.overlay};

  &:disabled {
    color: ${({ theme }) => theme.colors.disabled};
  }
`;

const SelectContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
  position: relative;

  display: flex;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  overflow: hidden;
`;

const Label = styled.label`
  position: absolute;
  top: ${({ theme }) => theme.offsets.elementContent};
  right: ${({ theme }) => theme.offsets.elementContent};

  width: ${({ theme }) => `calc(${theme.elements.form.height} - ${theme.offsets.elementContent} * 2)`};
  height: ${({ theme }) => `calc(${theme.elements.form.height} - ${theme.offsets.elementContent} * 2)`};
`;

const Select = ({ name, id, options, value = '0', defaultText = 'Choose goal', onChange }: TSelectProps) => (
  <SelectContainer>
    <SelectInput id={id} name={name} defaultValue={value} required onChange={onChange}>
      <Option disabled value='0'>
        {defaultText}
      </Option>
      {options.map((option: TOption, index: number) => (
        <Option key={index} value={option.value}>
          {option.text}
        </Option>
      ))}
    </SelectInput>

    <Label htmlFor={id}>
      <img src={ArrowDownIcon} alt='' />
    </Label>
  </SelectContainer>
);

export { Select };
