import React from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";

import { LucideIcon } from "../../../common/Icons";

// Styled component for the button container with theme-based styles
const ButtonWithArrowContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  min-width: 300px;
  justify-content: space-between;
  border: ${({ theme }) =>
    `${theme?.border?.size || 1}px solid ${theme?.colors?.overlay || "gray"}`};
  border-radius: 12px;
  padding: ${({ theme }) =>
    theme?.offsets?.elementContent || "8px"}; /* Using theme offset */
  cursor: pointer;
  color: ${({ $disabled, theme }) =>
    $disabled
      ? theme?.colors?.disabled || "silver"
      : theme?.colors?.sectionContent ||
        "inherit"}; /* Text/icon color based on disabled state */

  /* Styles applied when the button is disabled */
  ${({ $disabled, theme }) =>
    $disabled &&
    `
    border: ${theme?.border?.size || 1}px solid ${theme?.colors?.overlayActive || "blue"};
    cursor: default;
  `}

  /* Hover styles */
  &:hover {
    text-decoration: underline;
    border: ${({ theme }) =>
      `${theme?.border?.size || 1}px solid ${theme?.colors?.sectionContent || "gold"}`};

    /* Override hover styles when disabled */
    ${({ $disabled, theme }) =>
      $disabled &&
      `
    border: ${theme?.border?.size || 1}px solid ${theme?.colors?.overlayActive || "blue"};
    text-decoration: none;
  `}
  }

  ${({ theme }) =>
    theme?.theme === "viking" &&
    `
    border: ${theme?.border?.size || 1}px solid ${theme?.colors?.sectionContent || "gold"};
    background-color: ${theme?.colors?.section || "black"};

    span { color: ${theme?.colors?.sectionContent || "gold"}; }

    &:hover {
      border: ${theme?.border?.size || 1}px solid ${theme?.colors?.overlayActive || "white"};
    }
  `}
`;

const ArrowIcon = styled(LucideIcon)`
  width: ${({ theme }) => (theme as any)?.elements?.buttons?.arrow?.size || 24}px;
  height: ${({ theme }) => (theme as any)?.elements?.buttons?.arrow?.size || 24}px;
`;

interface ButtonWithArrowProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

// Button component
export const ButtonWithArrow: React.FC<ButtonWithArrowProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <ButtonWithArrowContainer onClick={onClick} $disabled={disabled}>
      {children}
      {/* Icon with size from theme, color inherited from container */}
      <ArrowIcon name="ChevronRight" />
    </ButtonWithArrowContainer>
  );
};
