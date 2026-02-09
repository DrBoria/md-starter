import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const SwitchLabel = styled.label<{ $size?: "small" | "default" }>`
  position: relative;
  display: inline-block;
  width: calc(${({ theme }) => theme.elements.form.height} * 0.88);
  height: calc(${({ theme }) => theme.elements.form.height} * 0.48);
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.disabled};
  border-radius: ${({ theme }) => theme.border.radius}px;
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
    background-color: ${({ theme }) => theme.colors.highlighted};
  }

  &:focus + .switch-slider {
    box-shadow: ${({ theme }) => theme.shadows.small};
  }

  &:checked + .switch-slider::before {
    transform: translateX(
      calc(${({ theme }) => theme.elements.form.height} * 0.4)
    );
  }
`;

export const Slider = styled.span<{ $size?: "small" | "default" }>`
  position: absolute;
  inset: 0;
  background-color: transparent;
  transition: 0.4s;
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  /* The Knob */
  &::before {
    position: absolute;
    content: "";
    height: calc(${({ theme }) => theme.elements.form.height} * 0.4);
    width: calc(${({ theme }) => theme.elements.form.height} * 0.4);
    left: ${({ theme }) => theme.offsets.elementContent};
    bottom: ${({ theme }) => theme.offsets.elementContent};
    background-color: ${({ theme }) => theme.colors.sectionContent};
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.betweenElements};
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.font.sizes.regular};
  color: ${({ theme }) => theme.colors.labelBackground};
`;
