import React, { useState } from "react";
import styled from "styled-components";
import { FocusedContainer } from "../../Containers";
import { Button } from "../../Button";

const MenuButton = styled(Button)`
  font-family: ${({ theme }) => theme.font.family.text};
  font-size: ${({ theme }) => theme.font.size};
  color: ${({ theme }) => theme.colors.highlighted};
  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};

  &:hover {
    color: ${({ theme }) => theme.colors.section};
    background: ${({ theme }) => theme.colors.highlighted};
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
  }
`;

const LabelButton = styled(Button)`
  font-family: ${({ theme }) => theme.font.family.text};
  font-size: ${({ theme }) => theme.font.size};
  color: ${({ theme }) => theme.colors.highlighted};
  background: ${({ theme }) => theme.colors.section};
  border-radius: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.section};
    background: ${({ theme }) => theme.colors.highlighted};
  }
`;

const Menu = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
  border-radius: ${({ theme }) => theme.border.radius}px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: ${({ theme }) => theme.zIndex.overlay};
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
