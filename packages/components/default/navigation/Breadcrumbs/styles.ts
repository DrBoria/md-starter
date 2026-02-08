/* stylelint-disable media-query-no-invalid */
/* stylelint-disable media-query-no-invalid */
import styled from "styled-components";
import Link from "next/link";
import { LucideIcon } from "@md/components/default/common";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme?.font?.sizes?.regular || '1rem'};
  color: ${({ theme }) => theme?.colors?.labelBackground || 'gray'};
  gap: ${({ theme }) => (theme?.variables?.offsets?.betweenElements?.mobile || 8) + "px"};

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${({ theme }) => theme?.screens?.tablet?.device || '(min-width: 768px)'} {
    gap: ${({ theme }) => (theme?.variables?.offsets?.betweenElements?.tablet || 12) + "px"};
  }

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${({ theme }) => theme?.screens?.desktop?.device || '(min-width: 1024px)'} {
    gap: ${({ theme }) => (theme?.variables?.offsets?.betweenElements?.desktop || 16) + "px"};
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme?.colors?.highlighted || 'blue'};
  }
`;

export const ActiveBreadcrumb = styled.div`
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font-weight: 500;
  padding: ${({ theme }) => (theme?.variables?.offsets?.elementContent?.mobile || 4) + "px"};
  background-color: ${({ theme }) => theme?.colors?.overlay || 'transparent'};
  border-radius: ${({ theme }) => (theme?.variables?.border?.radius || 4) + "px"};
  
  /* Class for targeting in theme files */
  &.active-crumb { /* empty */ } 
`;

export const ChevronIcon = styled(LucideIcon)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme?.colors?.disabled || 'gray'};
  
  /* Class for targeting in theme files */
  &.breadcrumb-separator { /* empty */ }
`;

export const HomeIcon = styled(LucideIcon)`
  width: 16px;
  height: 20px;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
`;
