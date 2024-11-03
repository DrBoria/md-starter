import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, Animated, Dimensions, View } from 'react-native';
import { Link } from '../Link';
import { PlainText } from '../Typography';
import { useNavigate } from 'react-router-native';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const SidebarContainer = styled(Animated.View) <{ isOpen: boolean }>`
  position: absolute; /* Sidebar is positioned absolutely */
  top: 0;
  right: 0;
  height: ${height}px; /* Full height */
  width: 250px; /* Fixed width for the sidebar */
  background-color: ${({ theme }) => theme.colors.section};
  padding-top: ${({ theme }) => theme.offsets.elementContent}px;
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

const SidebarItem = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.offsets.elementContent}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HamburgerButton = styled(TouchableOpacity)`
  position: absolute; /* Use absolute positioning */
  top: 20px; /* Position from the top */
  right: 20px; /* Position from the right */
  z-index: 999; /* Ensure it's above other content */
  background-color: transparent; /* Ensure it's transparent */
`;

const HamburgerMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(250)).current; // Start off-screen

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : 250, // Slide in/out based on isOpen
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
        <Text style={{ fontSize: 24, color: 'white' }}>{isOpen ? '✕' : '☰'}</Text>
      </HamburgerButton>

      <SidebarContainer style={{ transform: [{ translateX: slideAnim }] }}>
        <SidebarItem onPress={() => handleNavigate('/')}>
          <PlainText onPress={() => { handleNavigate('/') }}>Home</PlainText>
        </SidebarItem>
        <SidebarItem onPress={() => handleNavigate('/login')}>
          <PlainText onPress={() => handleNavigate('/login')}>Login</PlainText>
        </SidebarItem>
      </SidebarContainer>
    </>
  );
};

export { HamburgerMenu };
