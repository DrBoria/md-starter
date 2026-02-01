import React from "react";
import styled, { css } from "styled-components";

// Стили для обертки переключателя
const SwitchLabel = styled.label<{ $size?: "small" | "default" }>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$size === "small" ? "32px" : "50px")};
  height: ${(props) => (props.$size === "small" ? "18px" : "28px")};
  cursor: pointer;

  /* VIKING THEME */
  ${({ theme }) => theme.theme === 'viking' && css`
    /* Indented Stone Channel - Standardized height */
    height: ${theme.elements.form.height};
    width: 60px; /* Slightly wider for better stone look */
    background-color: ${theme.colors.overlay};
    background-image: ${theme.effects?.texture};
    box-shadow: ${theme.effects?.depth?.inner?.strong};
    clip-path: ${theme.geometry?.ragged};
    padding: 4px;
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.disabled};

    &:hover {
        border-color: ${theme.colors.highlighted};
        box-shadow: ${theme.effects?.depth?.inner?.strong}, ${theme.effects?.glow?.soft};
    }
  `}
`;

// Скрытый input для функциональности переключателя
const SwitchInput = styled.input<{ $size?: "small" | "default" }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.highlighted};
    ${({ theme }) => theme.theme === 'viking' && css`
      background-color: ${theme.colors.overlayActive};
      
      /* Crack effect when ON */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background-image: ${theme.effects?.cracks};
        background-size: cover;
        opacity: 0.3;
        pointer-events: none;
      }
    `}
  }

  &:checked + span:before {
    transform: translateX(
      ${(props) => (props.$size === "small" ? "14px" : "30px")}
    );
    ${({ theme }) => theme.theme === 'viking' && css`
      background-color: ${theme.colors.highlighted};
      box-shadow: ${theme.effects?.glow?.medium};
    `}
  }

  &:focus + span {
    ${({ theme }) => theme.theme !== 'viking' && css`
      box-shadow: 0 0 1px ${theme.colors.highlighted};
    `}
  }
`;

// Визуальный "ползунок" переключателя
const Slider = styled.span<{ $size?: "small" | "default" }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
  transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: 34px;

  /* VIKING THEME */
  ${({ theme }) => theme.theme === 'viking' && css`
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
    border: none;
  `}

  &:before {
    position: absolute;
    content: "";
    height: ${(props) => (props.$size === "small" ? "14px" : "22px")};
    width: ${(props) => (props.$size === "small" ? "14px" : "22px")};
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.sectionContent};
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    border-radius: 50%;

    /* VIKING THEME (Stone Block) */
    ${({ theme }) => theme.theme === 'viking' && css`
      border-radius: 0;
      clip-path: ${theme.geometry?.ragged};
      background-color: ${theme.colors.disabled};
      background-image: ${theme.effects?.texture};
      box-shadow: 
        1px 1px 0 rgba(255,255,255,0.15), 
        2px 2px 5px rgba(0,0,0,0.6);
      
      /* Subtle "crack" on the stone block itself */
      border: 1px solid rgba(0,0,0,0.3);
    `}
  }
`;

// Контейнер для переключателя и меток
const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.betweenElements};

  @media ${(props) => props.theme.screens.tablet.device} {
    gap: ${({ theme }) => theme.offsets.betweenElements};
  }

  @media ${(props) => props.theme.screens.desktop.device} {
    gap: ${({ theme }) => theme.offsets.betweenElements};
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
