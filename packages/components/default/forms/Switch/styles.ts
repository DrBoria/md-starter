import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const SwitchLabel = styled.label<{ $size?: "small" | "default" }>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$size === "small" ? "32px" : "50px")};
  height: ${(props) => (props.$size === "small" ? "18px" : "28px")};
  cursor: pointer;
  background-color: ${({ theme }) => theme?.colors?.section || theme?.colors?.disabled || '#ccc'};
  border-radius: 34px;
  transition: 0.4s;

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const SwitchInput = styled.input<{ $size?: "small" | "default" }>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .switch-slider {
    background-color: ${({ theme }) => theme?.colors?.highlighted || '#2196F3'};
  }

  &:focus + .switch-slider {
    box-shadow: 0 0 1px ${({ theme }) => theme?.colors?.highlighted || '#2196F3'};
  }

  &:checked + .switch-slider::before {
    transform: translateX(
      ${(props) => (props.$size === "small" ? "14px" : "22px")}
    );
  }
`;

export const Slider = styled.span<{ $size?: "small" | "default" }>`
  position: absolute;
  inset: 0;
  background-color: transparent; /* Handled by Label or Input:checked */
  transition: 0.4s;
  border-radius: 34px;
  
  /* The Knob */
  &::before {
    position: absolute;
    content: "";
    height: ${(props) => (props.$size === "small" ? "14px" : "22px")};
    width: ${(props) => (props.$size === "small" ? "14px" : "22px")};
    left: ${(props) => (props.$size === "small" ? "2px" : "3px")}; /* Adjusted for standard alignment */
    bottom: ${(props) => (props.$size === "small" ? "2px" : "3px")};
    background-color: ${({ theme }) => theme?.colors?.sectionContent || 'white'};
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme?.colors?.labelBackground || '#777'};
`;
