import React from 'react';
import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '../helpers';
import { ReactNode } from 'react';
import { PlainText } from '../Typography';

type TButtonTypes = 'navigation' | 'menu';

type TButton = {
  onClick?: () => void; // React Native buttons use a function instead of MouseEventHandler
  className?: string;
  type?: TButtonTypes;
  children: ReactNode;
}
// & TWithBasicElementOffsets &
//   TFullWidth;

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
        border: ${({ theme }) => `${theme.border.size}px solid ${theme.colors.sectionContent}`};
      `;
  }
};

const StyledButton = styled(TouchableOpacity) <TButton>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent}px;
  

  background: transparent;
  border-radius: ${({ theme }) => theme.border.radius}px;
  outline: inherit;
  cursor: pointer;

  ${({ type }) => ButtonTypes(type)}
`;

// Define a functional component that wraps the styled button
const Button: React.FC<TButton> = ({ onClick, children, type, ...props }) => {
  const isText = typeof children === "string";

  return (
    <StyledButton onPress={onClick} {...props}>
      {isText ? <PlainText>{children}</PlainText> : children}
    </StyledButton>
  );
};

export { Button };
