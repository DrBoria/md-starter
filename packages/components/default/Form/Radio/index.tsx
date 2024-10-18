import styled from 'styled-components';

import { basicFont } from '../../Typography';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type TRadioProps = {
  name: string;
  id?: string;
  value: any;
  type: 'radio';
} & TWithBasicElementOffsets &
  TFullWidth;

const RadioInput = styled.input<TRadioProps>`
  display: block;
  height: ${({ theme }) => theme.elements.form.height};
  padding: ${({ theme }) => theme.offsets.elementContent};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};

  background: ${({ theme }) => theme.colors.overlay};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
`;

const RadioContainer = styled.div<TWithBasicElementOffsets & TFullWidth>`
  display: flex;
  align-items: center;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const Radio = ({ name, id = '0', value, ...props }: TRadioProps) => (
  <RadioContainer {...props}>
    <RadioInput type='radio' id={id} name={name} value={value} />
  </RadioContainer>
);

export { Radio };
