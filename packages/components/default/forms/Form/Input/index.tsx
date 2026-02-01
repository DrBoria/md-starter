import styled, { css } from 'styled-components';

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
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  height: ${({ theme }) => theme?.elements?.form?.height || '40px'};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme?.offsets?.elementContent || '8px'};

  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font: ${basicFont};

  background: ${({ theme }) => theme?.colors?.overlay || 'transparent'};
  border: ${({ theme }) => theme?.border?.size || 1}px solid transparent;
  // Use theme.borders.radius (which is 0px in Viking)
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;
  
  // Viking Theme: Engraving Pattern
  ${({ theme }) => theme?.theme === 'viking' && css`
      background-color: ${theme?.colors?.overlay || 'black'}; // Deep stone
      background-image: ${theme?.effects?.texture}; /* NOISE */
      border: none; // No border, just depth
      border-radius: 0; // Cut stone
      color: ${theme?.colors?.sectionContent || 'white'}; // Light text
      
      // The "Engraved" look driven by inner shadows
      box-shadow: ${theme?.effects?.depth?.inner?.medium || 'none'};
      
      // More organic ragged edge (torn paper/rough stone)
      ${theme?.geometry?.ragged && `clip-path: ${theme.geometry.ragged};`}
      border-bottom: 2px solid ${theme?.colors?.disabled || 'gray'};

      &::placeholder {
          color: ${theme?.colors?.labelText || 'lightgray'}; // Muted text
          opacity: 0.5;
      }

      &:focus {
          outline: none;
          color: ${theme?.colors?.highlighted || 'gold'}; // Gold text
          border-bottom-color: ${theme?.colors?.highlighted || 'gold'};
          
          box-shadow: ${theme?.effects?.glow?.strong || 'none'}, ${theme?.effects?.depth?.inner?.strong || 'none'};
          caret-color: ${theme?.colors?.highlighted || 'gold'};
          filter: brightness(1.1);
      }
  `}

  &::placeholder {
    color: ${({ theme }) => theme?.colors?.labelText || 'lightgray'};
    opacity: 0.5;
    font-style: italic;
  }

  ${({ theme }) => theme?.theme !== 'viking' && `
     border: ${theme?.variables?.border?.size || 1}px solid ${theme?.colors?.sectionContent || 'black'};
     backdrop-filter: var(--glass-effect);
  `}
`;

export { Input };
