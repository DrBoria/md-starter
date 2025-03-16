import React from "react";
import styled from "styled-components";

import { Icons } from "../Icons";

const LabelContainer = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.highlighted};
  color: ${({ theme }) => theme.colors.highlightedText};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 1rem;
    height: 1rem;
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
  color: var(--color-icon); /* Adjust color as needed */

  svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    color: var(--color-icon-hover); /* Add hover effect if needed */
  }
`;

type IconName = keyof typeof Icons;

interface LabelProps {
  icon?: IconName;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Label: React.FC<LabelProps> = ({
  icon,
  children,
  className,
  onClose,
}) => {
  const IconComponent = icon ? Icons[icon] : null;

  return (
    <LabelContainer className={className}>
      {IconComponent && (
        <IconWrapper>
          <IconComponent />
        </IconWrapper>
      )}
      {children}
      {onClose && (
        <CloseButton onClick={onClose}>
          <Icons.XIcon />
        </CloseButton>
      )}
    </LabelContainer>
  );
};
