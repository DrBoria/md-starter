import React from "react";
import styled, { keyframes } from "styled-components";

import type {
  TWithBasicElementOffsets} from "@md/styles";
import {
  withOffsetBottom,
  withOffsetsRight,
} from "@md/styles";
import { SubTitle } from "../Typography";

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  min-height: 3.625rem;
  height: 100%; // Full viewport height
  width: 100%;
  z-index: 100;
  background-color: #33333322;
  border-radius: 8px;
  margin: auto; // Ensure the container is centered on the page
`;

const spinAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div<
  { color?: string; size: "small" | "large" } & TWithBasicElementOffsets
>`
  border-width: ${({ size }) => (size === "small" ? "0.25rem" : "0.5rem")};
  border-style: solid;
  border-color: ${({ color = "#9e9e9e" }) =>
    `${color} ${color} ${color} #ddd`}; /* Custom color */
  width: ${({ size }) => (size === "small" ? "1rem" : "3.625rem")};
  height: ${({ size }) => (size === "small" ? "1rem" : "3.625rem")};
  border-radius: 50%;
  position: relative;
  animation: ${spinAnimation} 1.5s linear infinite;

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const LoadingSpinner = ({ text }: { text?: string | boolean }) => {
  return (
    <Container>
      {text && <SubTitle>{text}</SubTitle>}
      <Loader size="large" />
    </Container>
  );
};

export { LoadingSpinner };
