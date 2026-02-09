import React from "react";

import { Loader } from "@md/components/default/feedback";
import styled, { css } from "styled-components";

interface BadgeProps {
  $status?: string;
  isLoading?: boolean;
}

export const BadgeContainer = styled.div<BadgeProps>`
  padding: ${({ theme }) => theme.offsets.elementContent} calc(2 * ${({ theme }) => theme.offsets.elementContent});
  border-radius: ${({ theme }) => theme.border.radius}px;
  font-weight: 500;
  text-transform: capitalize;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.font.family.text};
  gap: ${({ theme }) => theme.offsets.betweenElements};
  ${({ $status, theme }) => {
    switch ($status) {
      case "approval": return css`background-color: ${theme.colors.warningBackground};`;
      case "success": return css`background-color: ${theme.colors.successBackground};`;
      case "failed": return css`background-color: ${theme.colors.errorBackground};`;
      default: return css`background-color: ${theme.colors.section};`;
    }
  }}
  ${({ $status, theme }) => {
    switch ($status) {
      case "approval": return css`color: ${theme.colors.warningText};`;
      case "success": return css`color: ${theme.colors.successText};`;
      case "failed": return css`color: ${theme.colors.errorText};`;
      default: return css`color: ${theme.colors.sectionContent};`;
    }
  }}
`;

export const Badge: React.FC<BadgeProps & { children?: React.ReactNode }> = ({
  $status,
  isLoading,
  children,
}) => {
  return (
    <BadgeContainer $status={$status}>
      {isLoading && <Loader $size="small" className="mr-2" />}
      {children}
    </BadgeContainer>
  );
};
