import React from 'react';
import styled, { css } from 'styled-components/native';
import { useLocation, useNavigate } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { PlainText } from '@md/native/components/Typography';
import { withOffsetBottom, withOffsetsRight } from '@md/native/components/helpers';

const StyledTouchable = styled(TouchableOpacity)`
  background-color: transparent;
  padding: ${({ theme }) => theme.offsets.elementContent}px;
  justify-content: center;
  align-items: center;
  
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
  width: 100%;
`;

const StyledText = styled(PlainText) <{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.betweenElements}px;
  position: relative;
  text-decoration: none;
  padding: ${({ theme }) => theme.offsets.elementContent}px;
  border-bottom-width: ${({ theme }) => theme.border.size}px;
  border-bottom-color: ${({ theme }) => theme.colors.sectionContent};
  
  ${({ $isSelected }) =>
    $isSelected ? css`
    background: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
    ` : css`
    color: ${({ theme }) => theme.colors.sectionContent};
    background: transparent;
    `
  };
`;

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  onPress?: () => void;
  isSelected?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ href, onPress, children, isSelected: _isSelected = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = _isSelected !== undefined ? _isSelected : location.pathname === href;

  const handlePress = () => onPress?.() || navigate(href);

  return (
    <StyledTouchable onPress={handlePress}>
      <StyledText $isSelected={isSelected}>
        {children}
      </StyledText>
    </StyledTouchable>
  );
};
