// Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '../../next';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? '250px' : '0')};
  background-color: ${({ theme }) => theme.colors.section};
  overflow-x: hidden;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.offsets.elementContent};
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

const HamburgerButton = styled.button`
  position: fixed;
  top: calc(${({ theme }) => theme.offsets.elementContent} / 2 + ${({ theme }) => theme.elements.icons.height});
  right: ${({ theme }) => theme.offsets.elementContent};
  font-size: ${({ theme }) => theme.elements.icons.height};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.sectionContent};
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.navigationElement};
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <HamburgerButton onClick={toggleSidebar} aria-label="Toggle Sidebar">
        {isOpen ? '✕' : '☰'}
      </HamburgerButton>

      <Overlay isOpen={isOpen} onClick={toggleSidebar} />

      <SidebarContainer isOpen={isOpen}>
        <MenuItem href="/" onClick={toggleSidebar}>Home</MenuItem>
        <MenuItem href="login" onClick={toggleSidebar}>Login</MenuItem>
      </SidebarContainer>
    </>
  );
};

export { HamburgerMenu };
