import React from 'react';
import styled, { css } from 'styled-components/native';
import type { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { withOffsetBottom, withOffsetsRight } from '@md/native/components/helpers';
import { PlainText } from '@md/native/components/Typography';

const ButtonTypes = (type: 'menu' | 'navigation' | undefined) => {
  switch (type) {
    case 'menu':
      return css`
        background-color: transparent;
      `;
    case 'navigation':
    default:
      return css`
        border: ${({ theme }) => `${theme.border.size}px solid ${theme.colors.sectionContent}`};
      `;
  }
};

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'menu' | 'navigation';
  fullWidth?: boolean;
}

const StyledButton = styled(TouchableOpacity) <{ fullWidth?: boolean; type?: 'menu' | 'navigation' }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => {
    return theme.offsets.elementContent;
  }}px;

  background-color: transparent;
  border-radius: ${({ theme }) => theme.border.radius}px;

  ${({ type }) => ButtonTypes(type)}
`;

// Define a functional component that wraps the styled button
const Button = React.forwardRef<View, ButtonProps>(({ onClick, children, type, ...props }, ref) => {
  const isText = typeof children === "string";

  return (
    <StyledButton ref={ref} onPress={onClick} type={type} {...props}>
      {isText ? (
        <PlainText style={{ textTransform: 'uppercase' }}>
          {children}
        </PlainText>
      ) : children}
    </StyledButton>
  );
});

Button.displayName = 'Button';

export { Button };
