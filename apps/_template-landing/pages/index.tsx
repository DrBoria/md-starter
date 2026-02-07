import React from "react";
import styled from "styled-components";
import { PageContainer } from "@md/sections";

const Section = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.section};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
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
