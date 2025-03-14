import React from "react";
import styled from "styled-components";

const SwitchLabel = styled.label<{ $size?: "small" | "default" }>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$size === "small" ? "32px" : "44px")};
  height: ${(props) => (props.$size === "small" ? "18px" : "24px")};
  cursor: pointer;
`;

const SwitchInput = styled.input<{ $size?: "small" | "default" }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2563eb;
  }

  &:checked + span:before {
    transform: translateX(
      ${(props) => (props.$size === "small" ? "14px" : "20px")}
    );
  }

  &:focus + span {
    box-shadow: 0 0 1px #2563eb;
  }
`;

const Slider = styled.span<{ $size?: "small" | "default" }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: ${(props) => (props.$size === "small" ? "14px" : "20px")};
    width: ${(props) => (props.$size === "small" ? "14px" : "20px")};
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  size?: "small" | "default";
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  leftLabel,
  rightLabel,
  size = "default",
  className,
}) => {
  return (
    <SwitchContainer className={className}>
      {leftLabel && <span className="text-sm text-gray-600">{leftLabel}</span>}
      <SwitchLabel $size={size}>
        <SwitchInput
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          $size={size}
        />
        <Slider $size={size} />
      </SwitchLabel>
      {rightLabel && (
        <span className="text-sm text-gray-600">{rightLabel}</span>
      )}
    </SwitchContainer>
  );
};
