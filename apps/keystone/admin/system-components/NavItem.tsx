import React, { ReactNode } from 'react';
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { TTheme } from '@md/styles/baseTheme';

const StyledLink = styled(Link)`
  background: transparent;
  color: ${({ theme }: { theme: TTheme }) => theme.colors.sectionContent};
  display: block;
  position: relative;
  text-decoration: none;

  &:hover {
    background: ${({ theme }: { theme: TTheme }) => theme.colors.highlighted};
    color: ${({ theme }: { theme: TTheme }) => theme.colors.highlightedText};
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
