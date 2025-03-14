// Import the necessary modules
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ToolTipContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
`;

const ToolTipText = styled.span<{ position: string }>`
  visibility: hidden;
  min-width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: var(--basic-padding);

  /* Position the tooltip based on the dynamic 'position' prop */
  position: absolute;
  z-index: 1000;
  left: 50%;
  margin-left: -60px;
  ${({ position }) => (position === "top" ? "bottom: 100%;" : "top: 100%;")}

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;

  ${ToolTipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

interface TooltipProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
  $fullWidth?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  className,
  $fullWidth,
}) => {
  const [position, setPosition] = useState("top");
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If the tooltip is too close to the bottom, position it on top
      if (tooltipRect.bottom > viewportHeight) {
        setPosition("top");
      }
      // If the tooltip is too close to the top, position it at the bottom
      else if (tooltipRect.top < 100) {
        setPosition("bottom");
      } else {
        setPosition("top");
      }
    }
  }, []); // Only run on mount

  return (
    <ToolTipContainer
      ref={tooltipRef}
      className={className}
      $fullWidth={$fullWidth}
    >
      {children}
      {text && <ToolTipText position={position}>{text}</ToolTipText>}
    </ToolTipContainer>
  );
};

export { Tooltip };
