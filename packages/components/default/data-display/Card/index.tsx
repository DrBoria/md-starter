import React from 'react';
import styled from 'styled-components';
import { Link } from '@md/components/default/navigation/Link';
import type { TWithBasicElementOffsets } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';
import { PlainText } from '@md/components/default/data-display/Typography';

const CardContainer = styled.div<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  background-color: ${({ theme }) => theme?.colors?.section || 'transparent'};
  border-radius: 10px;
  box-shadow: 0 4px 6px ${({ theme }) => theme?.colors?.sectionContent || 'rgba(0,0,0,0.1)'};
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
  }

  /* VIKING THEME */
  ${({ theme }) => theme?.theme === 'viking' && `
    background-color: ${theme?.colors?.section};
    background-image: ${theme?.effects?.texture};
    border-radius: 0;
    clip-path: ${theme?.geometry?.ragged};
    box-shadow: ${theme?.effects?.depth?.outer?.medium};
    border: none;

    &:hover {
      box-shadow: ${theme?.effects?.depth?.outer?.strong}, ${theme?.effects?.glow?.soft};
      filter: brightness(1.1);
    }
  `}
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
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
`;

const ReadMore = styled(Link)`
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
  color: ${({ theme }) => theme?.colors?.highlighted || 'inherit'};
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
  link: string,
}

const Card = ({ image, title, description, date, link, ...rest }: ICard) => {
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
