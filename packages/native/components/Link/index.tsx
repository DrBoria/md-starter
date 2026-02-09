import React from 'react';
import styled from 'styled-components/native';
import { Link as RouterLink } from 'react-router-native'; // Import Link from react-router-native
import { PlainText } from '@md/native/components/Typography';

const StyledLink = styled(RouterLink)`
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const LinkText = styled(PlainText)`
  color: ${({ theme }) => theme.colors.sectionContent};
  &:hover {
    color: ${({ theme }) => theme.colors.sectionContent};
  }
`;

interface LinkProps {
  children: React.ReactNode;
  to: string;
}

const Link: React.FC<LinkProps> = ({ children, to }) => { // Use 'to' prop for the route
  return (
    <StyledLink to={to}>
      <LinkText>{children}</LinkText>
    </StyledLink>
  );
};

export { Link };
