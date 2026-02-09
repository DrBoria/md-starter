import React from "react";
import styled from "styled-components";

import type { IconName } from "@md/components/default/common";
import { LucideIcon } from "@md/components/default/common";

const LabelContainer = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.small};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.betweenElements};
  padding: ${({ theme }) => theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  background-color: ${({ theme }) => theme.colors.highlighted};
  color: ${({ theme }) => theme.colors.highlightedText};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: ${({ theme }) => theme.elements.icons.width};
    height: ${({ theme }) => theme.elements.icons.height};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: auto;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.sectionContent};

  svg {
    width: ${({ theme }) => theme.elements.icons.width};
    height: ${({ theme }) => theme.elements.icons.height};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.highlighted};
  }
`;

interface ILabelProps {
  icon?: IconName;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Label = ({
  icon,
  children,
  className,
  onClose,
}: ILabelProps) => {
  return (
    <LabelContainer className={className}>
      {icon && (
        <IconWrapper>
          <LucideIcon name={icon} />
        </IconWrapper>
      )}
      {children}
      {onClose && (
        <CloseButton onClick={onClose}>
          <LucideIcon name="X" />
        </CloseButton>
      )}
    </LabelContainer>
  );
};
