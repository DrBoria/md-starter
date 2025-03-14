// Import the necessary modules
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Styled container for the tooltip
const ToolTipContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
`;

// Styled text element for the tooltip
const ToolTipText = styled.span<{ position: string }>`
  visibility: hidden;
  min-width: 120px;
  background-color: ${({ theme }) => theme.colors.sectionContent}; // Dark background from theme (#202020)
  color: ${({ theme }) => theme.colors.overlay}; // Light text color from theme (#e6e6e6)
  text-align: center;
  border-radius: ${({ theme }) => theme.variables.border.radius}px; // Border radius from theme (4px)
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile}px; // Padding from theme (8px)

  /* Position the tooltip based on the dynamic 'position' prop */
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.navigationElement}; // Z-index from theme (1000)
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

// Interface for Tooltip component props
interface TooltipProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
  $fullWidth?: boolean;
}

// Tooltip functional component
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
