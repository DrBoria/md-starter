import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useNavigate } from 'react-router-native';
import { MenuItem } from '../MenuItem';
import { SubTitle } from '../Typography';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const SidebarContainer = styled(Animated.View) <{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: ${height}px;
  width: ${width};
  background-color: ${({ theme }) => theme.colors.section};
  padding: ${({ theme }) => theme.offsets.section / 2}px ${({ theme }) => theme.offsets.section * 2}px;
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

const HamburgerButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${({ theme }) => theme.offsets.section}px;
  right: ${({ theme }) => theme.offsets.section}px;
  z-index: ${({ theme }) => theme.zIndex.navigationElement};
`;

const HamburgerMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current; // Start off-screen

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : width, // Slide in/out based on isOpen
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleNavigate = (endpoint: string) => {
    setIsOpen(false);
    navigate(endpoint);
  }

  return (
    <>
      <HamburgerButton onPress={toggleSidebar} accessible>
        <SubTitle>{isOpen ? '✕' : '☰'}</SubTitle>
      </HamburgerButton>

      <SidebarContainer style={{ transform: [{ translateX: slideAnim }] }}>
        <MenuItem href='/' onPress={() => handleNavigate('/')}>
          Home
        </MenuItem>
        <MenuItem href='/login' onPress={() => handleNavigate('/login')}>
          Login
        </MenuItem>
      </SidebarContainer>
    </>
  );
};

export { HamburgerMenu };
