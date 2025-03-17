import React from "react";
import { useTheme } from "styled-components";
import { Loader } from "../Spinner";
import styled from "styled-components";

interface BadgeProps {
  $status?: string;
  isLoading?: boolean;
}

export const BadgeContainer = styled.div<BadgeProps>`
  padding: ${({ theme }) => theme.offsets.elementContent} ${({ theme }) =>
    2 * theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius};
  font-weight: 500;
  text-transform: capitalize;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.font.family.text};
  gap: ${({ theme }) => theme.offsets.betweenElements.mobile};

  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case "approval":
        return theme.colors.warningBackground;
      case "success":
        return theme.colors.successBackground;
      case "failed":
        return theme.colors.errorBackground;
      default:
        return theme.colors.section;
    }
  }};

  color: ${({ theme, $status }) => {
    switch ($status) {
      case "approval":
        return theme.colors.warningText;
      case "success":
        return theme.colors.successText;
      case "failed":
        return theme.colors.errorText;
      default:
        return theme.colors.sectionContent; 
    }
  }};
`;

export const Badge: React.FC<BadgeProps & { children?: React.ReactNode }> = ({
  $status,
  isLoading,
  children,
}) => {
  const theme = useTheme();

  
  const getTextColor = () => {
    switch ($status) {
      case "approval":
        return theme.colors.warningText;
      case "success":
        return theme.colors.successText;
      case "failed":
        return theme.colors.errorText;
      default:
        return theme.colors.sectionContent;
    }
  };

  const textColor = getTextColor();

  return (
    <BadgeContainer $status={$status}>
      {isLoading && <Loader $offsetRight size="small" color={textColor} />}
      {children}
    </BadgeContainer>
  );
};
