import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View } from 'react-native';
import { PlainText } from '../Typography';

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
  font-weight: bold;
`;

const Footer = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.sectionContent};
`;

const ReadMore = styled(PlainText)`
  color: ${({ theme }) => theme.colors.highlighted};
  font-weight: bold;
`;

interface ICard {
  image?: string;
  title: string;
  description?: string;
  date?: string;
  readTime?: string;
  onPress?: () => void;
}

const Card = ({ title, description, date, onPress }: ICard) => (
  <CardContainer onPress={onPress}>
    <Title offsetBottom>{title}</Title>
    <Footer>
      {date && <PlainText>{date}</PlainText>}
      <ReadMore>Read more...</ReadMore>
    </Footer>
  </CardContainer>
);

export { Card };
