import styled from 'styled-components';

import { basicFont } from '../../../data-display/Typography';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';

type TInputProps = {
  name?: string;
  id?: string;
  type?: string;
  value?: unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TWithBasicElementOffsets &
  TFullWidth;

const Input = styled.input<TInputProps>`
  display: block;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};

  background: ${({ theme }) => theme.colors.overlay};
  border: ${({ theme }) => theme.border.size} solid transparent;
  // Use theme.borders.radius (which is 0px in Viking)
  border-radius: ${({ theme }) => theme.border.radius};
  
  // Viking Theme: Engraving Pattern
  ${({ theme }) => theme.theme === 'viking' && `
      background-color: ${theme.colors.overlay}; // Deep stone
      border: none; // No border, just depth
      border-radius: 0; // Cut stone
      color: ${theme.colors.sectionContent}; // Light text
      
      // The "Engraved" look driven by inner shadows
      // Using generic shadow.inner (now effects.depth.inner.medium)
      box-shadow: ${theme.colors.effects?.depth?.inner?.medium};
      
      // Ragged Edge (if configured)
      ${theme.colors.geometry?.ragged && `clip-path: ${theme.colors.geometry.ragged};`}
      border-bottom: 2px solid ${theme.colors.disabled};

      &::placeholder {
          color: ${theme.colors.labelText}; // Muted text
          opacity: 0.5;
      }

      &:focus {
          // Glow from within, logic of "Molten Gold" or "Active Rune"
          outline: none;
          color: ${theme.colors.highlighted}; // Gold text
          border-bottom-color: ${theme.colors.highlighted};
          
          box-shadow: ${theme.colors.effects?.glow?.strong};
          caret-color: ${theme.colors.highlighted};
      }
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.labelText};
    opacity: 0.5;
    font-style: italic;
  }

  ${({ theme }) => theme.theme !== 'viking' && `
     border: ${theme.variables.border.size}px solid ${theme.colors.sectionContent};
     backdrop-filter: var(--glass-effect);
  `}
`;

export { Input };
