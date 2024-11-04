// NativeSidebarItem.tsx
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/native';
import { useLocation, useNavigate } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { PlainText } from '../Typography';
import { withOffsetBottom, withOffsetsRight } from '../helpers';

const StyledTouchable = styled(TouchableOpacity)`
  background-color: transparent;
  padding: ${({ theme }) => theme.offsets.elementContent}px;
  justify-content: center;
  align-items: center;
  
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
  width: 100%;
`;

const StyledText = styled(PlainText) <{ isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.betweenElements}px;
  position: relative;
  text-decoration: none;
  padding: ${({ theme }) => theme.offsets.elementContent}px;
  border-bottom-width: ${({ theme }) => theme.border.size}px;
  border-bottom-color: ${({ theme }) => theme.colors.sectionContent};
  
  ${({ theme, isSelected }) =>
    isSelected ? css`
    background: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
    ` : css`
    color: ${({ theme }) => theme.colors.sectionContent};
    background: transparent;
    `
  };
`;

type MenuItemProps = {
  href: string;
  onPress?: () => void;
  children: ReactNode;
  isSelected?: boolean;
};

export const MenuItem = ({ href, onPress, children, isSelected: _isSelected }: MenuItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = _isSelected !== undefined ? _isSelected : location.pathname === href;

  const handlePress = () => onPress?.() || navigate(href);

  return (
    <StyledTouchable onPress={handlePress}>
      <StyledText isSelected={isSelected}>
        {children}
      </StyledText>
    </StyledTouchable>
  );
};
