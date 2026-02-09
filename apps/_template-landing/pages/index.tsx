import React from "react";
import styled from "styled-components";
import { PageContainer } from "@md/sections";

const Section = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.offsets.section};
  box-sizing: border-box;
  text-align: center;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.sectionContent};
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.overlay};
    color: ${({ theme }) => theme.colors.sectionContent};
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.font.sizes.large};
  margin-bottom: ${({ theme }) => theme.offsets.elementContent};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.font.sizes.regular};
  font-weight: 300;
  opacity: 0.8;
`;

export default function LandingPage() {
  return (
    <PageContainer>
      <Section>
        <Title>Welcome to [Project Name]</Title>
        <Subtitle>A modern, scalable foundation for your next big idea.</Subtitle>
      </Section>
      <Section>
        <Title>Features</Title>
        <Subtitle>Fast, Secure, and Customizable.</Subtitle>
      </Section>
      <Section>
        <Title>Get Started</Title>
        <Subtitle>Edit this page in <code>apps/landing/pages/index.tsx</code></Subtitle>
      </Section>
    </PageContainer>
  );
}
