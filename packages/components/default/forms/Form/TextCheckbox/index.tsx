import styled, { css } from 'styled-components';

import { basicFont } from '../../../data-display/Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TTextCheckboxProps = {
  name: string;
  id: string;
  label?: string;
} & TWithBasicElementOffsets &
  TFullWidth &
  React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxContainer = styled.div<TWithBasicElementOffsets>`
  display: inline-block;

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  
  cursor: pointer;
`;

const CheckboxInput = styled.input<TWithBasicElementOffsets & TFullWidth>`
  display: none;
  width: ${({ $fullWidth }) => $fullWidth && '100%'};

  /* Default Theme Logic */
  &:checked + label {
    color: ${({ theme }) => theme.colors.highlightedText};
    background: ${({ theme }) => theme.colors.highlighted};
  }

  & + label {
    display: flex;
    align-items: center;
    gap: 10px;
    width: ${({ $fullWidth }) => $fullWidth && '100%'};
    height: ${({ theme }) => theme.elements.form.height};
    padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile}px;
    font: ${basicFont};
    box-sizing: border-box;
    
    background: ${({ theme }) => theme.colors.overlay};
    border-radius: ${({ theme }) => theme.variables.border.radius}px;
    cursor: pointer;
  }

  & + label:hover {
    background: ${({ theme }) => theme.colors.overlayActive};
  }

  /* VIKING THEME OVERRIDE (Runes) */
  ${({ theme }) => theme.theme === 'viking' && css`
      /* Hide default background change, use rune tick instead */
      &:checked + label {
         color: ${theme.colors.highlighted};
         background: transparent;
         text-shadow: ${theme.effects?.glow?.soft};

         &::before {
             /* Active Rune */
             content: 'ᚷ'; /* Gebo (Gift) */
             font-size: 18px;
             color: ${theme.colors.highlightedText};
             background-color: ${theme.colors.highlighted};
             box-shadow: ${theme.effects?.glow?.medium};
             border-color: ${theme.colors.highlighted};
         }
      }

      & + label {
         background-color: transparent;
         color: ${theme.colors.sectionContent};
         
         /* Create pseudo-element for the box */
         &::before {
             content: '';
             display: grid;
             place-items: center;
             width: 24px;
             height: 24px;
             
             /* Material: Rough Stone */
             background-color: ${theme.colors.overlay};
             background-image: ${theme.effects?.texture};
             box-shadow: ${theme.effects?.depth?.inner?.medium};
             border: 1px solid ${theme.colors.disabled};
             clip-path: ${theme.geometry?.ragged};
             
             transition: all 0.2s ease;
         }
      }

      & + label:hover {
        background: transparent;
        color: ${theme.colors.highlighted};
      }
  `}
`;

const TextCheckbox = ({ name, id, label, $offsetBottom, $offsetRight, $fullWidth, ...props }: TTextCheckboxProps) => (
  <CheckboxContainer $offsetBottom={$offsetBottom} $offsetRight={$offsetRight}>
    <CheckboxInput id={id} name={name} type='checkbox' $fullWidth={$fullWidth} {...props} />
    <label htmlFor={id}>{label || name}</label>
  </CheckboxContainer>
);

export { TextCheckbox };
