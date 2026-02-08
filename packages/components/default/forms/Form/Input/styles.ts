import styled from 'styled-components';
import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight, basicFont } from '@md/styles';
import { vikingTheme } from './themes/viking';
import { liquidGlassTheme } from './themes/liquid-glass';

export type TInputProps = {
  name?: string;
  id?: string;
  type?: string;
  value?: unknown;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & TWithBasicElementOffsets &
  TFullWidth;

export const StyledInput = styled.input<TInputProps>`
  display: block;
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  height: ${({ theme }) => theme?.elements?.form?.height || '40px'};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme?.offsets?.elementContent || '8px'};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font: ${basicFont};
  background: ${({ theme }) => theme?.colors?.overlay || 'transparent'};
  border: ${({ theme }) => theme?.variables?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  border-radius: ${({ theme }) => theme?.variables?.border?.radius || 0}px;
  
  &::placeholder {
    color: ${({ theme }) => theme?.colors?.labelText || 'lightgray'};
    opacity: 0.5;
    font-style: italic;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
