import React, { useState } from "react";
import styled from "styled-components";

import { LucideIcon } from "../Icons";

const ArrowContainer = styled.div<{ $rotated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${(props) => (props.$rotated ? "rotate(180deg)" : "none")};
  transition: transform 0.3s ease-in-out;
`;

const ToggleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: max-height 0.3s ease-in-out; // Add transition here
  overflow: hidden; // Ensure content doesn't spill outside during transition
`;

const Title = styled.span`
  width: 100%;
`;

const ChildrensContainer = styled.div<{ $showContent: boolean }>`
  padding-left: 15px;
  max-height: ${({ $showContent }) =>
    $showContent ? "2000px" : "0"}; // Use state to control max-height
  overflow: hidden; // Hide content that exceeds max-height
  transition: max-height 0.3s ease-in-out; // Smoothly animate max-height change
`;

interface ToggleProps {
  children: React.ReactNode;
  title: string | JSX.Element;
  defaultState?: boolean;
  setState?: (value: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({
  children,
  title,
  defaultState = true,
  setState,
}) => {
  const [showContent, setShowContent] = useState(defaultState);

  const toggleContent = () => {
    const newState = !showContent;
    setShowContent(newState);
    setState?.(newState);
  };

  return (
    <div>
      <ToggleContent onClick={toggleContent}>
        <Title>{title}</Title>
        <ArrowContainer $rotated={showContent}>
          <LucideIcon name="ChevronDown" />
        </ArrowContainer>
      </ToggleContent>
      <ChildrensContainer $showContent={showContent}>
        {children}
      </ChildrensContainer>
    </div>
  );
};

export { Toggle };

export const ArrowIcon = ({
  rotated,
  onClick,
}: {
  rotated: boolean;
  onClick: () => void;
}) => (
  <ArrowContainer $rotated={rotated} onClick={onClick}>
    <LucideIcon name="ChevronDown" />
  </ArrowContainer>
);
