import styled from 'styled-components';

import { basicFont } from '../../Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TTextCheckboxProps = {
  name: string;
  id: string;
} & TWithBasicElementOffsets &
  TFullWidth;

const CheckboxContainer = styled.div`
  display: inline-block;

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  
  cursor: pointer;
`;

const CheckboxInput = styled.input<TWithBasicElementOffsets & TFullWidth>`
  display: none;
  width: ${({ fullWidth }) => fullWidth && '100%'};

  &:checked + label {
    color: ${({ theme }) => theme.colors.highlightedText};

    background: ${({ theme }) => theme.colors.highlighted};
  }

  & + label {
    display: inline-block;
    height: ${({ theme }) => theme.elements.form.height};
    padding: ${({ theme }) => theme.offsets.elementContent};

    font: ${basicFont};

    background: ${({ theme }) => theme.colors.overlay};
    border-radius: ${({ theme }) => theme.border.radius};
    cursor: pointer;
  }

  & + label:hover {
    background: ${({ theme }) => theme.colors.overlayActive};
  }
`;

const TextCheckbox = ({ name, id, ...props }: TTextCheckboxProps) => (
  <CheckboxContainer {...props}>
    <CheckboxInput id={id} name={name} type='checkbox' />
    <label htmlFor={id}>{name}</label>
  </CheckboxContainer>
);

export { TextCheckbox };
