import styled, { css } from 'styled-components';

import { basicFont } from '@md/components/default/data-display/Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TTextareaProps = {
  name?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  value?: unknown;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & TWithBasicElementOffsets &
  TFullWidth;

const Textarea = styled.textarea<TTextareaProps>`
  display: block;
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  min-height: ${({ theme }) => `calc(${theme.elements.form.height} * 3)`}; /* Default roughly 3 rows */
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};
  resize: vertical;
  font: ${basicFont};

  /* Default Theme Base */
  color: ${({ theme }) => theme.colors.sectionContent};
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.variables.border.radius}px;
  
  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
      /* 1. Material: Dark stone with noise */
      background-color: ${theme.colors.overlay};
      background-image: ${theme.effects?.texture}; /* NOISE */
      color: ${theme.colors.sectionContent};
      border: none;
      outline: none;
      
      /* 2. Accent line bottom */
      border-bottom: 2px solid ${theme.colors.disabled};

      /* 3. Shape: Ragged Top (Torn stone slab) */
      clip-path: ${theme.geometry?.ragged || 'none'};
      
      /* 4. Depth: Engraved */
      box-shadow: ${theme.effects?.depth?.inner?.medium};

      &::placeholder {
          color: ${theme.colors.labelText};
          opacity: 0.6;
          font-style: italic;
      }

      /* 5. States: Glow & Magic */
      &:focus {
          color: ${theme.colors.highlighted};
          border-bottom-color: ${theme.colors.highlighted};
          
          /* Strong glow and crack texture imitation */
          box-shadow: 
            ${theme.effects?.glow?.strong}, 
            ${theme.effects?.depth?.inner?.strong};
          caret-color: ${theme.colors.highlighted};
          filter: brightness(1.1);
      }
  `}

  ${({ theme }) => theme.theme !== 'viking' && css`
     border: ${theme.variables.border.size}px solid ${theme.colors.sectionContent};
     backdrop-filter: var(--glass-effect);
  `}
`;

export { Textarea };
