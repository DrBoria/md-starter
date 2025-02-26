'use client'

import styled, { css } from 'styled-components';
import { basicFont } from '../Typography';
import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type TButtonTypes = 'navigation' | 'menu' | 'submit' | 'delete';

type TButton = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  isDisabled?: boolean;
  type?: TButtonTypes;
} & TWithBasicElementOffsets &
  TFullWidth;

const ButtonTypes = (type?: TButtonTypes, isDisabled?: boolean) => {
  switch (type) {
    case 'menu':
      return css`
        color: ${({ theme }) => theme.colors.sectionContent}; // Fiery text color for highlight
        text-transform: uppercase;
        border: none;
      `;
    case 'submit':
      return css`
        color: ${({ theme }) => theme.colors.highlightedText}; // Fiery text color for highlight
        background: ${({ theme }) => theme.colors.highlighted}; // Fiery text color for highlight
        text-transform: uppercase;
        border: ${({ theme }) => theme.border.size} solid ${({ theme }) => isDisabled ? theme.colors.disabled : theme.colors.highlightedText};
      `;
    case 'delete':
      return css`
        color: ${({ theme }) => theme.colors.errorText}; // Fiery text color for highlight
        background: ${({ theme }) => theme.colors.errorBackground}; // Fiery text color for highlight
        text-transform: uppercase;
        border: none;
      `;
    case 'navigation':
    default:
      return css`
        color: ${({ theme }) => theme.colors.sectionContent};
        text-transform: uppercase;
        border: ${({ theme }) => `${theme.border.size} solid ${isDisabled ? theme.colors.disabled : theme.colors.highlightedText}`}; // Bold, dark purple border
      `;
  }
};

const Button = styled.button<TButton & { isDisabled?: boolean }>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: ${({ theme }) => theme.elements.form.height};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};
  font: ${basicFont};
  background: ${({ theme, isDisabled }) => isDisabled ? theme.colors.disabled : theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
  border-radius: ${({ theme }) => theme.border.radius};
  outline: inherit;
  cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;

  ${({ type, isDisabled }) => ButtonTypes(type, isDisabled)}

  &:hover {
    background: ${({ theme, isDisabled }) => !isDisabled && theme.colors.overlay}; 
    color: ${({ theme, isDisabled }) => !isDisabled && theme.colors.sectionContent}; 
  }
  
  &:disabled {
    pointer-events: none; // Ensure the button is not clickable when disabled
  }
`;


export { Button };
