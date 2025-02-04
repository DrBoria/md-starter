import React, { useState } from "react";
import { ClipboardIcon, FilePlusIcon } from "@keystone-ui/icons";
import { useToasts } from "@keystone-ui/toast";
import styled from "styled-components";
import { Button as KeystoneButton, ToneKey, WeightKey } from "@keystone-ui/button";

import { FocusedContainer } from "../../default/Containers";
import { Tooltip } from "../../default/Tooltip";
import { LoaderImage } from "../../default/Loading";
import Link from "next/link";
import { Icons } from "../Icons";


const ButtonContent: React.FC<ButtonProps> = ({
  icon,
  iconPosition = "right",
  text,
  weight = "bold",
  tone = "active",
  isLoading,
  children,
  disabled,
  ...props
}) => {
  const IconComponent = icon ? Icons[icon] : null;
  const iconChild = IconComponent && <IconComponent size="small" />;
  return (
    <KeystoneButton
      {...props}
      weight={weight}
      tone={disabled || isLoading ? "passive" : tone}
      disabled={disabled || isLoading}
    >
      <div>
        {text}
        {children}
        {isLoading ? <LoaderImage src="/ouroboros.svg" alt="Loading..." priority width={40} height={40} /> : iconChild}
      </div>
    </KeystoneButton>
  );
};

const Button = styled(ButtonContent)`
  border-radius: calc(var(--border-radius) / 2);

  ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
  ${({ weight }) =>
    weight === "none" ? "border: 1px solid var(--color-border);" : ""}
  ${({ tone }) =>
    tone === "negative"
      ? `
    border: 1px solid #dc2626;
    color: #dc2626;
    background: transparent;
    &:hover {
      color: #fff;
    }
  `
      : ""}
`;

interface TCopyToClipboardButtonProps {
  value?: string | null;
  listName?: string;
  size?: "small" | "medium" | "large";
}

const Copy: React.FC<TCopyToClipboardButtonProps> = ({
  value,
  listName = "",
  ...rest
}) => {
  const toasts = useToasts();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value ?? "");
      toasts.addToast({
        tone: "positive",
        title: `${listName} id copied to clipboard`,
      });
    } catch {
      console.error(`Failed to copy text: ${value}`);
    }
  };

  return (
    <Tooltip text="Copy">
      <Button onClick={copyToClipboard} {...rest}>
        <ClipboardIcon />
      </Button>
    </Tooltip>
  );
};

interface TDuplicateProps {
  onClick: () => void;
  children?: JSX.Element | string;
}

const Duplicate: React.FC<TDuplicateProps> = ({ onClick, ...rest }) => {
  return (
    <Tooltip text="Duplicate">
      <Button onClick={onClick} {...rest}>
        <FilePlusIcon />
      </Button>
    </Tooltip>
  );
};

const CreateButton = ({
  listName,
  onClick,
}: {
  listName: string;
  onClick: () => void;
}) => {
  return (
    <Button weight="bold" tone="active" onClick={onClick}>
      Create {listName}
    </Button>
  );
};

const AdminButton = styled(Button)`
  position: fixed;
  left: -5px;
  bottom: 0;
  background: none;
`;

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

const ButtonWithArrowContainer = styled.div<{ $disabled?: boolean }>`
  display: flex;
  min-width: 300px;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 20px;
  cursor: pointer;

  ${({ $disabled }) =>
    $disabled
      ? `
    border: 1px solid #eee;
    color: #ccc;
    cursor: default;
  `
      : ""};

  &:hover {
    text-decoration: underline;
    border: 1px solid #111;

    ${({ $disabled }) =>
    $disabled
      ? `
    border: 1px solid #eee;
    color: #ccc;
    text-decoration: none;
  `
      : ""};
  }
`;

const ButtonWithArrow = ({
  onClick,
  children,
  disabled,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  return (
    <ButtonWithArrowContainer onClick={onClick} $disabled={disabled}>
      {children}
      <svg
        width="15"
        height="26"
        viewBox="0 0 15 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.958521 25.7082C0.865394 25.6153 0.791508 25.5049 0.741096 25.3834C0.690683 25.2619 0.664734 25.1317 0.664734 25.0002C0.664734 24.8686 0.690683 24.7384 0.741096 24.6169C0.791508 24.4954 0.865394 24.3851 0.958521 24.2922L12.2525 13.0002L0.958521 1.70817C0.865545 1.61519 0.791792 1.50481 0.741474 1.38334C0.691156 1.26186 0.665257 1.13165 0.665257 1.00017C0.665257 0.868679 0.691156 0.73848 0.741474 0.617001C0.791792 0.495522 0.865545 0.385143 0.958521 0.292168C1.0515 0.199192 1.16188 0.125439 1.28335 0.0751209C1.40483 0.0248032 1.53503 -0.00109482 1.66652 -0.00109482C1.79801 -0.00109482 1.92821 0.0248032 2.04969 0.0751209C2.17117 0.125439 2.28155 0.199192 2.37452 0.292168L14.3745 12.2922C14.4676 12.3851 14.5415 12.4954 14.5919 12.6169C14.6424 12.7384 14.6683 12.8686 14.6683 13.0002C14.6683 13.1317 14.6424 13.2619 14.5919 13.3834C14.5415 13.5049 14.4676 13.6153 14.3745 13.7082L2.37452 25.7082C2.28163 25.8013 2.17128 25.8752 2.04979 25.9256C1.9283 25.976 1.79806 26.002 1.66652 26.002C1.53499 26.002 1.40474 25.976 1.28325 25.9256C1.16176 25.8752 1.05141 25.8013 0.958521 25.7082Z"
          fill={disabled ? "#eee" : "#111"}
        />
      </svg>
    </ButtonWithArrowContainer>
  );
};

interface IActionsMenuButtonProps {
  onDuplicate: () => void;
  onEdit: () => void;
}

/**
 * @visibleName Buttons
 */
const ActionsMenuButton: React.FC<IActionsMenuButtonProps> = ({
  onDuplicate,
  onEdit,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMenuVisible(false);
  };

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

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof KeystoneButton>, "children"> {
  $fullWidth?: boolean;
  icon?: keyof typeof Icons;
  iconPosition?: "left" | "right";
  text?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  tone?: ToneKey;
  weight?: WeightKey;
}


interface ButtonLinkProps extends Omit<ButtonProps, "onClick"> {
  href: string;
}

const StyledLink = styled(Link) <{ $fullWidth?: boolean }>`
  display: inline-block;
  text-decoration: none;
  ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
`;

const ButtonWrapper = styled.span<{ $fullWidth?: boolean }>`
  & > button {
    width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  }
`;

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  text,
  children,
  $fullWidth,
  ...buttonProps
}) => (
  <StyledLink href={href} $fullWidth={$fullWidth}>
    <ButtonWrapper $fullWidth={$fullWidth}>
      <Button $fullWidth={$fullWidth} {...buttonProps}>
        {text}
        {children}
      </Button>
    </ButtonWrapper>
  </StyledLink>
);

interface IDeleteButtonProps {
  onDelete: () => void;
  isVertical?: boolean;
}

const DeleteButton = ({ isVertical, onDelete }: IDeleteButtonProps) => (
  <Button
    tone="negative"
    $fullWidth={isVertical}
    onClick={onDelete}
    icon="TrashIcon"
  >
    Delete
  </Button>
);


interface IResetButtonProps {
  onReset: () => void;
  isVertical?: boolean;
}

const ResetButton = ({ isVertical, onReset }: IResetButtonProps) => (
  <Button
    weight="none"
    onClick={onReset}
    $fullWidth={isVertical}
    icon="RotateCcwIcon"
  >
    Reset changes
  </Button>
);

interface IUpdateButtonProps {
  isPristine: boolean;
  onUpdate: () => void;
  isVertical?: boolean;
}

const UpdateButton = ({
  isPristine,
  onUpdate,
  isVertical,
}: IUpdateButtonProps) => (
  <Button
    weight="bold"
    tone="active"
    isDisabled={isPristine}
    onClick={onUpdate}
    className="save-button"
    $fullWidth={isVertical}
    icon="SaveIcon"
  >
    Save changes
  </Button>
);

export type { IDeleteButtonProps, IResetButtonProps, IUpdateButtonProps };

export {
  ActionsMenuButton,
  AdminButton,
  Button,
  ButtonWithArrow,
  Copy,
  CreateButton,
  DeleteButton,
  Duplicate,
  MenuButton,
  ResetButton,
  UpdateButton,
  ButtonLink,
};
