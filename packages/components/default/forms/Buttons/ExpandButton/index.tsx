import React from "react";
import styled from "styled-components";

const ExpandButtonComponent = styled.button<{ $expanded?: boolean }>`
  position: absolute;
  /* Positioning using theme offsets for sections, adjusts responsively: 24px mobile, 48px tablet, 96px desktop */
  bottom: ${({ theme }) => theme.offsets.section};
  right: ${({ theme }) => theme.offsets.section};
  /* Background color set to a light gray from theme, closest to white */
  background-color: ${({ theme }) => theme.colors.section};
  /* Border using theme size (1px) and overlay color (#e6e6e6), close to original #e5e7eb */
  border: ${({ theme }) => `${theme.variables.border.size}px solid ${theme.colors.overlay}`};
  /* Circular border radius from theme */
  border-radius: ${({ theme }) => theme.border.circle};
  /* Width and height calculated: icon size (20px) + 2 * element content offset (e.g., 8px) */
  width: calc(${({ theme }) => theme.elements.icons.width} + 2 * ${({ theme }) => theme.offsets.elementContent});
  height: calc(${({ theme }) => theme.elements.icons.height} + 2 * ${({ theme }) => theme.offsets.elementContent});
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* Shadow kept as is since no shadow values in theme, subtle default shadow */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    /* Hover shadow increased, kept as is due to no theme shadow values */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  svg {
    /* SVG size matches theme's icon dimensions */
    width: ${({ theme }) => theme.elements.icons.width};
    height: ${({ theme }) => theme.elements.icons.height};
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
