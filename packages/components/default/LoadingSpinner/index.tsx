import React from "react";
import styled, { keyframes } from "styled-components";
import { SubTitle } from "../Typography";
import {
  TWithBasicElementOffsets,
  withOffsetBottom,
  withOffsetsRight,
} from "@md/styles";

// Spin animation
const spinAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// Container styled with theme values
const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.variables.offsets.betweenElements.mobile}px; // Theme-based gap
  justify-content: center;
  align-items: center;
  min-height: 3.625rem;
  height: 100%; // Full viewport height
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.overlay}; // Theme-based z-index
  background-color: ${({ theme }) => theme.colors.overlay}; // Theme-based background
  border-radius: ${({ theme }) => theme.variables.border.radius}px; // Theme-based radius
  margin: auto; // Center the container
`;

// Loader styled with theme values
export const Loader = styled.div<
  { color?: string; size: "small" | "large" } & TWithBasicElementOffsets
>`
  border-width: ${({ size }) => (size === "small" ? "0.25rem" : "0.5rem")}; // Size-specific border width
  border-style: solid;
  border-color: ${({ color, theme }) =>
    `${color || theme.colors.labelBackground} ${color || theme.colors.labelBackground} ${color || theme.colors.labelBackground} ${
      theme.colors.labelBackground
    }33`}; // Theme-based color with transparency
  width: ${({ size }) => (size === "small" ? "1rem" : "3.625rem")}; // Size-specific width
  height: ${({ size }) => (size === "small" ? "1rem" : "3.625rem")}; // Size-specific height
  border-radius: 50%;
  position: relative;
  animation: ${spinAnimation} 1.5s linear infinite; // Spin animation
  margin-right: ${withOffsetsRight}; // Offset utility
  margin-bottom: ${withOffsetBottom}; // Offset utility
`;

// LoadingSpinner component
const LoadingSpinner = ({ text }: { text?: string | boolean }) => {
  return (
    <Container>
      {text && <SubTitle>{text}</SubTitle>}
      <Loader size="large" />
    </Container>
  );
};

export { LoadingSpinner };
