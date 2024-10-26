import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

const StyledLink = styled(TouchableOpacity)`
  padding: 10px;
  background-color: #007bff;
  border-radius: 5px;
  margin-top: 20px;
`;

const LinkText = styled(Text)`
  color: white;
  font-weight: bold;
`;

const Link = ({ children, onPress }) => {
  return (
    <StyledLink onPress={onPress}>
      <LinkText>{children}</LinkText>
    </StyledLink>
  );
};

export { Link };
