import React from "react";
import styled from "styled-components";

const ExpandButtonComponent = styled.button<{ $expanded?: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease-in-out;
    transform: ${(props) => (props.$expanded ? "rotate(180deg)" : "none")};
  }
`;

interface ExpandButtonProps {
  onClick: () => void;
  isExpanded: boolean;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  onClick,
  isExpanded,
}) => {
  return (
    <ExpandButtonComponent onClick={onClick} $expanded={isExpanded}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 13l5 5 5-5" />
        <path d="M7 6l5 5 5-5" />
      </svg>
    </ExpandButtonComponent>
  );
};
