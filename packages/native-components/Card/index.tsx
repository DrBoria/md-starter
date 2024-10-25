import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image as RNImage, Text, View } from 'react-native';

const CardContainer = styled(TouchableOpacity)`
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
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      {description && <Text style={{ fontSize: 14 }}>{description}</Text>}
    </Content>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      {date && <Text>{date}</Text>}
      {readTime && <Text>{readTime} min read</Text>}
    </View>
  </CardContainer>
);

export { Card };
