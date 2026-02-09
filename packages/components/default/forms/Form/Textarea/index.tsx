import styled, { css } from 'styled-components';

import type { TWithBasicElementOffsets, TFullWidth } from '@md/styles';
import { withOffsetBottom, withOffsetsRight, basicFont } from '@md/styles';

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
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
  min-height: ${({ theme }) => `calc(${theme.elements.form.height} * 3)`};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};
  resize: vertical;
  font: ${basicFont};
  color: ${({ theme }) => theme.colors.sectionContent};
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  ${({ theme }) => theme.theme === 'viking' && css`
      background-color: ${theme.colors.overlay};
      background-image: ${theme.effects.texture};
      color: ${theme.colors.sectionContent};
      border: none;
      outline: none;
      border-bottom: ${theme.border.size} solid ${theme.colors.disabled};
      clip-path: ${theme.geometry.ragged};
      box-shadow: ${theme.effects.depth.inner.medium};

      &::placeholder {
          color: ${theme.colors.labelText};
          opacity: 0.6;
          font-style: italic;
      }

      &:focus {
          color: ${theme.colors.highlighted};
          border-bottom-color: ${theme.colors.highlighted};
          box-shadow: 
            ${theme.effects.glow.strong}, 
            ${theme.effects.depth.inner.strong};
          caret-color: ${theme.colors.highlighted};
          filter: brightness(1.1);
      }
  `}

  ${({ theme }) => theme.theme !== 'viking' && css`
     border: ${theme.border.size} solid ${theme.colors.sectionContent};
     backdrop-filter: ${theme.effects.texture};
  `}
`;

export { Textarea };
