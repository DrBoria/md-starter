import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
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
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.sectionContent};
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

const ReadMore = styled.a`
  color: ${({ theme }) => theme.colors.highlighted};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface ICard {
    image?: string,
    title: string,
    description?: string,
    date?: string,
    readTime?: string
}

const Card = ({ image, title, description, date, readTime }: ICard) => {
  return (
    <CardContainer>
      <Image src={image} alt={title} />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <Footer>
        <span>{date}</span>
        <span>{readTime} min read</span>
        <ReadMore>Read more →</ReadMore>
      </Footer>
    </CardContainer>
  );
};

export { Card };
