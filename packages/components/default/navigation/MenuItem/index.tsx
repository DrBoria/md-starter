// WebSidebarItem.tsx
import type { ReactNode } from 'react';
import React from 'react';
import { useRouter } from "next/router";
import styled from "styled-components";
import type { TWithBasicElementOffsets } from '@md/styles';
import { withOffsetBottom, withOffsetsRight } from '@md/styles';
import { Link } from '../Link';

const StyledLink = styled(Link) <TWithBasicElementOffsets>`
  background: transparent;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme?.offsets?.betweenElements || '8px'};
  position: relative;
  text-decoration: none;
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme?.offsets?.elementContent || '8px'};
  border-bottom: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.sectionContent || 'black'};

  &:hover {
    text-decoration: none;
    background: ${({ theme }) => theme?.colors?.highlighted || 'blue'};
    color: ${({ theme }) => theme?.colors?.highlightedText || 'white'};
  }
`;

type MenuItemProps = {
    href: string;
    children: ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
} & TWithBasicElementOffsets;

export const MenuItem = ({ href, children, isSelected: _isSelected, ...rest }: MenuItemProps) => {
    const router = useRouter();
    const isSelected = _isSelected !== undefined ? _isSelected : router.pathname === href;

    return (
        <StyledLink
            aria-current={isSelected ? 'location' : undefined}
            href={href}
            {...rest}
        >
            {children}
        </StyledLink>
    );
};
