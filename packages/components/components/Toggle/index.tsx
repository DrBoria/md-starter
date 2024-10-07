import React, { useState } from "react";
import { ChevronDownIcon } from "@keystone-ui/icons";
import styled from "styled-components";

const ArrowIcon = styled(ChevronDownIcon)<{ $rotated: boolean }>`
  width: 15px;
  height: 15px;
  transition: transform 0.3s ease-in-out; // Add transition here
  transform: ${(props) => (props.$rotated ? "rotate(180deg)" : "none")};
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
    setShowContent(!showContent);
    setState && setState(!showContent);
  };

  return (
    <div>
      <ToggleContent onClick={toggleContent}>
        <Title>{title}</Title>
        <ArrowIcon $rotated={showContent} />
      </ToggleContent>
      <ChildrensContainer $showContent={showContent}>
        {children}
      </ChildrensContainer>
    </div>
  );
};

export { Toggle };
