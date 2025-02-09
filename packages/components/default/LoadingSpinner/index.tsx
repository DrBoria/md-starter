import React from "react";
import styled from "styled-components";

import { SubTitle } from "../Typography";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full viewport height
  width: 100%;
  z-index: 100;
  background-color: #33333322; // Set a dark background color
  margin: auto; // Ensure the container is centered on the page
`;

const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: #aaa #bbb #aaa #bbb; // Adjusted to use darker greys
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  animation: spin 2s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ text }: { text: string | boolean }) => {
  return (
    <Container>
      <SubTitle>{text}</SubTitle>
      <Loader />
    </Container>
  );
};

export { LoadingSpinner };
