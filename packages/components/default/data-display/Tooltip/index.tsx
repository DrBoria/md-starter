import React, { useEffect, useRef, useState } from "react";
import { ToolTipContainer, ToolTipText } from "./styles";

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
      {text && <ToolTipText $position={position}>{text}</ToolTipText>}
    </ToolTipContainer>
  );
};

export { Tooltip };
