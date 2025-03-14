import React from "react";
import Link from "next/link";
import { LucideIcon } from "../Icons";
import styled from "styled-components";

// Define the type for breadcrumb items
export type Breadcrumb = {
  label: string;
  link?: string;
};

// Styled component for the breadcrumb container
const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font.size}; // Default font size from theme
  color: ${({ theme }) => theme.colors.label}; // Default text color from theme
  gap: ${({ theme }) => theme.variables.offsets.betweenElements.mobile + "px"}; // Space between elements

  // Responsive gap adjustments
  @media ${({ theme }) => theme.screens.tablet.device} {
    gap: ${({ theme }) => theme.variables.offsets.betweenElements.tablet + "px"};
  }
  @media ${({ theme }) => theme.screens.desktop.device} {
    gap: ${({ theme }) => theme.variables.offsets.betweenElements.desktop + "px"};
  }
`;

// Styled component for breadcrumb links
const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.body}; // Default link color from theme
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary}; // Hover color from theme
  }
`;

// Styled component for active breadcrumb item
const ActiveBreadcrumb = styled.div`
  color: ${({ theme }) => theme.colors.body}; // Text color for active item
  font-weight: 500; // Medium font weight
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile + "px"}; // Padding from theme
  background-color: ${({ theme }) => theme.colors.gray100}; // Background color from theme
  border-radius: ${({ theme }) => theme.variables.border.radius + "px"}; // Border radius from theme
`;

// Styled component for chevron icons
const ChevronIcon = styled(LucideIcon)`
  width: 12px; // Matches Tailwind's w-3 (3 * 4px)
  height: 12px; // Matches Tailwind's h-3
  color: ${({ theme }) => theme.colors.gray400}; // Icon color from theme
`;

// Styled component for home icon
const HomeIcon = styled(LucideIcon)`
  width: 16px; // Matches Tailwind's w-4 (4 * 4px)
  height: 20px; // Matches Tailwind's h-5 (5 * 4px)
  color: ${({ theme }) => theme.colors.body}; // Icon color from theme
`;

// Breadcrumbs component
const Breadcrumbs: React.FC<{ items: Breadcrumb[] }> = ({ items }) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbLink href="/">
        <HomeIcon name="Home" />
      </BreadcrumbLink>

      {items.length >= 1 && <ChevronIcon name="ChevronRight" />}

      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
          ) : (
            <ActiveBreadcrumb>{item.label}</ActiveBreadcrumb>
          )}
          {index < items.length - 1 && <ChevronIcon name="ChevronRight" />}
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;
