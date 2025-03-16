import React from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";

import { LucideIcon } from "../../Icons";

// Styled component for the button container with theme-based styles
const ButtonWithArrowContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  min-width: 300px;
  justify-content: space-between;
  border: ${({ theme }) => `${theme.border.size}px solid ${theme.colors.overlay}`};
  border-radius: 12px;
  padding: ${({ theme }) => theme.offsets.elementContent}; /* Using theme offset */
  cursor: pointer;
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.disabled : theme.colors.sectionContent}; /* Text/icon color based on disabled state */

  /* Styles applied when the button is disabled */
  ${({ $disabled, theme }) =>
    $disabled &&
    `
    border: ${theme.border.size}px solid ${theme.colors.overlayActive};
    cursor: default;
  `}

  /* Hover styles */
  &:hover {
    text-decoration: underline;
    border: ${({ theme }) => `${theme.border.size}px solid ${theme.colors.sectionContent}`};

    /* Override hover styles when disabled */
    ${({ $disabled, theme }) =>
      $disabled &&
      `
    border: ${theme.border.size}px solid ${theme.colors.overlayActive};
    text-decoration: none;
  `}
  }
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
  const theme = useTheme(); // Access theme values

  return (
    <ButtonWithArrowContainer onClick={onClick} $disabled={disabled}>
      {children}
      {/* Icon with size from theme, color inherited from container */}
      <LucideIcon
        name="ChevronRight"
        width={theme.elements.icons.width}
        height={theme.elements.icons.height}
      />
    </ButtonWithArrowContainer>
  );
};
