import React from "react";

import { Loader } from "@md/components/default/feedback/Loading";
import styled from "styled-components";

interface BadgeProps {
  $status?: string;
  isLoading?: boolean;
}

export const BadgeContainer = styled.div<BadgeProps>`
  padding: ${({ theme }) => theme?.offsets?.elementContent || '0'} calc(2 * ${({ theme }) =>
    theme?.offsets?.elementContent || '0'});
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;
  font-weight: 500;
  text-transform: capitalize;
  height: fit-content;
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
  gap: ${({ theme }) => theme?.variables?.offsets?.betweenElements?.mobile || 0}px;
  background-color: ${({ theme, $status }) => {
    switch ($status) {
      case "approval":
        return theme?.colors?.warningBackground || 'orange';
      case "success":
        return theme?.colors?.successBackground || 'green';
      case "failed":
        return theme?.colors?.errorBackground || 'red';
      default:
        return theme?.colors?.section || 'transparent';
    }
  }};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case "approval":
        return theme?.colors?.warningText || 'white';
      case "success":
        return theme?.colors?.successText || 'white';
      case "failed":
        return theme?.colors?.errorText || 'white';
      default:
        return theme?.colors?.sectionContent || 'inherit';
    }
  }};
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
