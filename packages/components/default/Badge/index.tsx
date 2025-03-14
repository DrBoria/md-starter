import React from "react";
import { useTheme } from "styled-components";
import { Loader } from "../Spinner";
import styled from "styled-components";

interface BadgeProps {
  $status?: string;
  isLoading?: boolean;
}

// Компонент BadgeContainer с использованием значений из темы
export const BadgeContainer = styled.div<BadgeProps>`
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile + "px"} ${({ theme }) =>
    2 * theme.variables.offsets.elementContent.mobile + "px"};
  border-radius: ${({ theme }) => theme.variables.border.radius + "px"};
  font-weight: 500;
  text-transform: capitalize;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.font.family.text};
  gap: ${({ theme }) => theme.variables.offsets.betweenElements.mobile + "px"};
  
  /* Адаптивный gap для разных экранов */
  @media ${({ theme }) => theme.screens.tablet.device} {
    gap: ${({ theme }) => theme.variables.offsets.betweenElements.tablet + "px"};
  }
  @media ${({ theme }) => theme.screens.desktop.device} {
    gap: ${({ theme }) => theme.variables.offsets.betweenElements.desktop + "px"};
  }

  /* Цвет фона в зависимости от статуса */
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

  /* Цвет текста в зависимости от статуса */
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

// Компонент Badge
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
