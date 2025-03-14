import React from "react";
import styled from "styled-components";

interface BadgeProps {
  $status?: string;
  isLoading?: boolean;
}

const getStatusColor = ($status?: string) => {
  switch ($status) {
    case "approval":
      return "#92400E";
    case "success":
      return "#065F46";
    case "failed":
      return "#991B1B";
    default:
      return "#374151";
  }
};

export const BadgeContainer = styled.div<BadgeProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-transform: capitalize;
  height: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ $status }) => {
    if (!$status) return "#E5E7EB";
    switch ($status) {
      case "approval":
        return "#FEF3C7";
      case "success":
        return "#D1FAE5";
      case "failed":
        return "#FEE2E2";
      default:
        return "#E5E7EB";
    }
  }};
  color: ${({ $status }) => getStatusColor($status)};
`;

export const Badge: React.FC<BadgeProps & { children?: React.ReactNode }> = ({
  $status,
  isLoading,
  children,
}) => {
  const color = getStatusColor($status);

  return (
    <BadgeContainer $status={$status}>
      {isLoading && <Loader $offsetRight size="small" color={color} />}
      {children}
    </BadgeContainer>
  );
};
