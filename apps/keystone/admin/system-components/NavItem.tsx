import React, { ReactNode } from 'react';
import { useRouter } from "next/router"
import styled from "styled-components"
import { Link } from '@md/components';
import { TWithBasicElementOffsets, withOffsetBottom, withOffsetsRight } from '@md/styles';

const StyledLink = styled(Link)<TWithBasicElementOffsets>`
  background: transparent;
  color: ${({ theme }) => theme.colors.sectionContent};
  display: block;
  position: relative;
  text-decoration: none;
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};

  &:hover {
    background: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
  }
`

type NavItemProps = {
  href: string
  children: ReactNode
  isSelected?: boolean
}

export const NavItem = ({ href, children, isSelected: _isSelected }: NavItemProps) => {
  const router = useRouter()

  const isSelected = _isSelected !== undefined ? _isSelected : router.pathname === href
  return (
    <StyledLink
      aria-current={isSelected ? 'location' : false}
      href={href}
    >
      {children}
    </StyledLink>
  )
}
