// Import the necessary modules
import React from "react";
import styled from "styled-components";

const ToolTipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ToolTipText = styled.span`
  visibility: hidden;
  min-width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1000;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;

  ${ToolTipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

// Define the properties your component will receive
interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

// Create a functional component for the tooltip
const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  return (
    <ToolTipContainer>
      {children}
      <ToolTipText>{text}</ToolTipText>
    </ToolTipContainer>
  );
};

export { Tooltip };
