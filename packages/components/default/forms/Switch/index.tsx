import React from "react";
import styled from "styled-components";

// Стили для обертки переключателя
const SwitchLabel = styled.label<{ $size?: "small" | "default" }>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$size === "small" ? "32px" : "44px")};
  height: ${(props) => (props.$size === "small" ? "18px" : "24px")};
  cursor: pointer;
`;

// Скрытый input для функциональности переключателя
const SwitchInput = styled.input<{ $size?: "small" | "default" }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.highlighted};
  }

  &:checked + span:before {
    transform: translateX(
      ${(props) => (props.$size === "small" ? "14px" : "20px")}
    );
  }

  &:focus + span {
    box-shadow: 0 0 1px ${({ theme }) => theme.colors.highlighted};
  }
`;

// Визуальный "ползунок" переключателя
const Slider = styled.span<{ $size?: "small" | "default" }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay}; // #e6e6e6
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: ${(props) => (props.$size === "small" ? "14px" : "20px")};
    width: ${(props) => (props.$size === "small" ? "14px" : "20px")};
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.colors.sectionContent};
    transition: 0.4s;
    border-radius: 50%;
  }
`;

// Контейнер для переключателя и меток
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => `${theme.offsets.betweenElements}px`}; // 8px для mobile

  @media ${(props) => props.theme.screens.tablet.device} {
    gap: ${({ theme }) => `${theme.offsets.betweenElements}px`}; // 8px для tablet
  }

  @media ${(props) => props.theme.screens.desktop.device} {
    gap: ${({ theme }) => `${theme.offsets.betweenElements}px`}; // 16px для desktop
  }
`;

// Стили для меток (leftLabel, rightLabel)
const Label = styled.span`
  font-size: ${({ theme }) => theme.font.size}; // calc(14px + 4 * ((100vw - 320px) / 1280))
  color: ${({ theme }) => theme.colors.labelBackground}; // #777777
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
      {leftLabel && <Label>{leftLabel}</Label>}
      <SwitchLabel $size={size}>
        <SwitchInput
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          $size={size}
        />
        <Slider $size={size} />
      </SwitchLabel>
      {rightLabel && <Label>{rightLabel}</Label>}
    </SwitchContainer>
  );
};
