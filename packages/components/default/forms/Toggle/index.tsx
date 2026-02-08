import React, { useState } from "react";
import { LucideIcon } from "../../common/Icons";
import { MainContainer, ToggleContent, Title, ArrowContainer, ChildrensContainer } from "./styles";

interface ToggleProps {
  children: React.ReactNode;
  title: string | JSX.Element;
  defaultState?: boolean;
  setState?: (value: boolean) => void;
  className?: string; // Add className prop support
}

const Toggle: React.FC<ToggleProps> = ({
  children,
  title,
  defaultState = true,
  setState,
  className,
}) => {
  const [showContent, setShowContent] = useState(defaultState);

  const toggleContent = () => {
    const newState = !showContent;
    setShowContent(newState);
    setState?.(newState);
  };

  return (
    <MainContainer className={className}>
      <ToggleContent onClick={toggleContent} className="toggle-header">
        <Title>{title}</Title>
        <ArrowContainer $rotated={showContent} className="arrow-container">
          <LucideIcon name="ChevronDown" />
        </ArrowContainer>
      </ToggleContent>
      <ChildrensContainer $showContent={showContent}>
        {children}
      </ChildrensContainer>
    </MainContainer>
  );
};

export { Toggle };
export default Toggle;

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
