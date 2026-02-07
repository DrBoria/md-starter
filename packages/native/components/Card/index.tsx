import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { PlainText } from '@md/native/components/Typography';

const CardContainer = styled(TouchableOpacity)`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.section};
  shadow-color: ${({ theme }) => theme.colors.sectionContent};
  shadow-offset: 0 4px;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  elevation: 3; /* For Android shadow */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.offsets.elementContent}px;
`;

const Title = styled(PlainText)`
  font-size: 18px;
  font-weight: 600;
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
`;

const Footer = styled(View)`
  flex-direction: column;
  align-items: flex-start;
`;

const ReadMore = styled(PlainText)`
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
  color: ${({ theme }) => theme?.colors?.highlighted || 'red'};
  font-weight: 600;
`;

const Card = ({ title, date, onPress }) => (
  <CardContainer onPress={onPress}>
    <Title $offsetBottom>{title}</Title>
    <Footer>
      {date && <PlainText>{date}</PlainText>}
      <ReadMore>Read more...</ReadMore>
    </Footer>
  </CardContainer>
);

export { Card };
