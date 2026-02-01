import React from 'react';
import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { withOffsetBottom, withOffsetsRight } from '../helpers';
import { PlainText } from '../Typography';

const ButtonTypes = (type) => {
  switch (type) {
    case 'menu':
      return css`
        background-color: transparent;
      `;
    case 'navigation':
    default:
      return css`
        border: ${({ theme }) => `${theme?.border?.size || 0}px solid ${theme?.colors?.sectionContent || 'transparent'}`};
      `;
  }
};

const StyledButton = styled(TouchableOpacity)`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => {
    return theme?.offsets?.elementContent || 0;
  }}px;

  background-color: transparent;
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;

  ${({ type }) => ButtonTypes(type)}
`;

// Define a functional component that wraps the styled button
const Button = ({ onClick, children, type, ...props }) => {
  const isText = typeof children === "string";

  return (
    <StyledButton onPress={onClick} type={type} {...props}>
      {isText ? (
        <PlainText style={{ textTransform: 'uppercase' }}>
          {children}
        </PlainText>
      ) : children}
    </StyledButton>
  );
};

export { Button };
