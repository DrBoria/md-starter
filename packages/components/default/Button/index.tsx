import styled, { css } from 'styled-components';

import { basicFont } from '../Typography';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '@md/styles';

type TButtonTypes = 'navigation' | 'menu';

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
        color: ${({ theme }) => theme.colors.sectionContent};
        text-transform: uppercase;

        border: none;
      `;
    case 'navigation':
    default:
      return css`
        color: ${({ theme }) => theme.colors.sectionContent};
        text-transform: uppercase;

        border: ${({ theme }) => `${theme.border.size} solid ${theme.colors.sectionContent}`};
      `;
  }
};

const Button = styled.button<TButton>`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent};

  font: ${basicFont};

  background: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.border.radius};
  outline: inherit;
  cursor: pointer;

  ${({ type }) => ButtonTypes(type)}
`;

export default Button;
