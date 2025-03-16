import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../../core/Button";
import { FocusedContainer } from "../../../core/Containers";

const MenuButton = styled(Button)`
  color: #2563eb;
  background: #fff;
  border: 1px solid #2563eb;

  &:hover {
    color: #fff;
    background: #2563eb;
    border: 1px solid #2563eb;
  }
`;

const LabelButton = styled(Button)`
  color: #2563eb;
  background: #fff;
  border-radius: 0;

  &:hover {
    color: #fff;
    background: #2563eb;
  }
`;

const Menu = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #2563eb;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 100;
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
