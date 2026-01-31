import styled, { css } from 'styled-components';

import { basicFont } from '../../../data-display/Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TRadioProps = {
  name: string;
  id?: string;
  value: string | number;
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
  
  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
      appearance: none; /* Remove default radio */
      display: grid;
      place-items: center;
      width: calc(${theme.elements.form.height} / 2);
      height: calc(${theme.elements.form.height} / 2);
      
      background-color: #0b0e0f;
      box-shadow: ${theme.colors.effects?.depth?.inner?.medium};
      border: 1px solid ${theme.colors.disabled};
      border-radius: 50%; /* Radios are round, even in Valhalla? Or maybe diamond? Let's stick to round for now or use diamond geometry */
      clip-path: none;
      
      &::before {
          content: '•';
          color: transparent;
          font-size: 24px;
          line-height: 0;
          transition: 0.2s;
      }
      
      &:checked {
          border-color: ${theme.colors.highlighted};
          box-shadow: ${theme.colors.effects?.glow?.medium};
          
          &::before {
              content: 'ᛟ'; /* Othala (Heritage) */
              color: ${theme.colors.highlighted};
              font-size: 16px;
              text-shadow: ${theme.colors.effects?.glow?.soft};
          }
      }
  `}
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
