import React, { useState } from "react";
import styled from "styled-components";
import { FocusedContainer } from "../../../layout/Containers";
import { Button } from "../../Button";

const MenuButton = styled(Button)`
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
  font-size: ${({ theme }) => theme?.font?.size || 'inherit'};
  color: ${({ theme }) => theme?.colors?.highlighted || 'inherit'};
  background: ${({ theme }) => theme?.colors?.section || 'transparent'};
  border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.highlighted || 'transparent'};

  &:hover {
    color: ${({ theme }) => theme?.colors?.section || 'inherit'};
    background: ${({ theme }) => theme?.colors?.highlighted || 'transparent'};
    border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.highlighted || 'transparent'};
  }
`;

const LabelButton = styled(Button)`
  padding: 10px;
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
  border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.highlighted || 'transparent'};
  border-radius: 4px;

  &:hover {
    border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.highlighted || 'transparent'};
  }
`;

const ActionsMenuButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.highlighted || 'transparent'};
  border-radius: 8px;
  font-family: ${({ theme }) => theme?.font?.family?.text || 'inherit'};
`;

const Menu = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme?.colors?.section || 'transparent'};
  border: ${({ theme }) => theme?.border?.size || 1}px solid ${({ theme }) => theme?.colors?.highlighted || 'transparent'};
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: ${({ theme }) => theme?.zIndex?.overlay || 1000};
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  width: fit-content;
  flex-direction: column;
`;

interface ActionsMenuButtonProps {
  onDuplicate: () => void;
  onEdit: () => void;
}

export const ActionsMenuButton: React.FC<ActionsMenuButtonProps> = ({
  onDuplicate,
  onEdit,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMouseEnter = () => setMenuVisible(true);
  const handleMouseLeave = () => setMenuVisible(false);

  return (
    <FocusedContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <MenuButton>...</MenuButton>
      <Menu $isVisible={menuVisible}>
        <LabelButton onClick={onDuplicate}>Duplicate</LabelButton>
        <LabelButton onClick={onEdit}>Edit</LabelButton>
      </Menu>
    </FocusedContainer>
  );
};
