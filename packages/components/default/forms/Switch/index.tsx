import React from "react";
import { SwitchContainer, SwitchLabel, SwitchInput, Slider, Label } from "./styles";

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
        <Slider className="switch-slider" $size={size} />
      </SwitchLabel>
      {rightLabel && <Label>{rightLabel}</Label>}
    </SwitchContainer>
  );
};
