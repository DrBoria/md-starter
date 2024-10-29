import styled, { css } from 'styled-components';
import { basicFont } from '../Typography';
import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type TButtonTypes = 'navigation' | 'menu' | 'submit';

type TButton = {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: TButtonTypes;
} & TWithBasicElementOffsets &
  TFullWidth;

const ButtonTypes = (type?: TButtonTypes) => {
  switch (type) {
    case 'menu':
      return css`
        color: ${({ theme }) => theme.colors.sectionContent}; // Fiery text color for highlight
        text-transform: uppercase;
        border: none;
      `;
    case 'submit':
      return css`
        color: ${({ theme }) => theme.colors.sectionContent}; // Fiery text color for highlight
        text-transform: uppercase;
        border: none;
      `;
    case 'navigation':
    default:
      return css`
        color: ${({ theme }) => theme.colors.sectionContent};
        text-transform: uppercase;
        border: ${({ theme }) => `2px solid ${theme.colors.highlighted}`}; // Bold, dark purple border
      `;
  }
};

const Button = styled.button<TButton>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};
  font: ${basicFont};
  background: ${({ theme }) => theme.colors.section}; // Dark background color for an imposing look
  border-radius: ${({ theme }) => theme.border.radius};
  outline: inherit;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ type }) => ButtonTypes(type)}

  &:hover {
    background: ${({ theme }) => theme.colors.overlay}; // Slightly lighter background on hover
    color: ${({ theme }) => theme.colors.sectionContent}; // Soft off-white on hover for contrast
  }
`;

export { Button };
