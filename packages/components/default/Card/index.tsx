'use client'

import React from 'react';
import styled from 'styled-components';
import { Link } from '../Link';
import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets } from '@md/styles';
import { PlainText } from '../Typography';

const CardContainer = styled.div<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  background-color: ${({ theme }) => theme.colors.section};
  border-radius: 10px;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.sectionContent};
  overflow: hidden;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.font.family.text};
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.sectionContent};
  font-family: ${({ theme }) => theme.font.family.text};
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.sectionContent};
`;

const ReadMore = styled(Link)`
  font-family: ${({ theme }) => theme.font.family.text};
  color: ${({ theme }) => theme.colors.highlighted};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface ICard extends TWithBasicElementOffsets {
    image?: string,
    title: string,
    description?: string,
    date?: string,
    readTime?: string,
    link: string,
}

const Card = ({ image, title, description, date, readTime, link, ...rest }: ICard) => {
  return (
    <CardContainer {...rest}>
      {image && <Image src={image} alt={title} />}
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <Footer>
        <PlainText>{date}</PlainText>
        <ReadMore href={link}>Read more →</ReadMore>
      </Footer>
    </CardContainer>
  );
};

export { Card };
