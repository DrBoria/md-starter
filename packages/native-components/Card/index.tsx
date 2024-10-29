import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image as RNImage, View } from 'react-native';
import { PlainText } from '../Typography';

const CardContainer = styled(TouchableOpacity)`
  font-family: ${({ theme }) => theme.font.family.text};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;  
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
`;

const Image = styled(RNImage)`
  width: 100%;
  height: 150px;
`;

const Content = styled(View)`
  padding: 20px;
  font-family: ${({ theme }) => theme.font.family.text};
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
  padding: ${({ theme }) => theme.offsets.elementContent}px;

`;

interface ICard {
  image?: string;
  title: string;
  description?: string;
  date?: string;
  readTime?: string;
  onPress?: () => void;
}

const Card = ({ image, title, description, date, readTime, onPress }: ICard) => (
  <CardContainer onPress={onPress}>
    {image && <Image source={{ uri: image }} resizeMode="cover" />}
    <Content>
      <PlainText style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</PlainText>
      {description && <PlainText style={{ fontSize: 14 }}>{description}</PlainText>}
    </Content>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      {date && <PlainText>{date}</PlainText>}
      {readTime && <PlainText>{readTime} min read</PlainText>}
    </View>
  </CardContainer>
);

export { Card };
