import styled from "styled-components";
import Link from "next/link";
import { LucideIcon } from "@md/components/default/common";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.font.sizes.regular};
  color: ${({ theme }) => theme.colors.labelBackground};
  gap: ${({ theme }) => theme.offsets.betweenElements};

  @media ${({ theme }) => theme.screens.tablet.device} {
    gap: ${({ theme }) => theme.offsets.betweenElements};
  }

  @media ${({ theme }) => theme.screens.desktop.device} {
    gap: ${({ theme }) => theme.offsets.betweenElements};
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.sectionContent};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.highlighted};
  }
`;

export const ActiveBreadcrumb = styled.div`
  color: ${({ theme }) => theme.colors.sectionContent};
  font-weight: 500;
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  /* Class for targeting in theme files */
  &.active-crumb { /* empty */ } 
`;

export const ChevronIcon = styled(LucideIcon)`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  color: ${({ theme }) => theme.colors.disabled};
  
  /* Class for targeting in theme files */
  &.breadcrumb-separator { /* empty */ }
`;

export const HomeIcon = styled(LucideIcon)`
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  color: ${({ theme }) => theme.colors.sectionContent};
`;
