import type React from 'react';
import styled, { css } from 'styled-components';
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
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};
  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  background: ${({ theme }) => theme.colors.overlay};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.labelText};
    opacity: 0.5;
    font-style: italic;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
