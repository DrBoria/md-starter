import React from "react";

import { Button } from "../../../default/Button";

interface ResetButtonProps {
  onReset: () => void;
  isVertical?: boolean;
}

export const ResetButton = ({ isVertical, onReset }: ResetButtonProps) => (
  <Button
    weight="none"
    onClick={onReset}
    $fullWidth={isVertical}
    icon="RotateCcwIcon"
    text="Reset changes"
  />
);
