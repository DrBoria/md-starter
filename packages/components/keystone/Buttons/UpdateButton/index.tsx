import React from "react";

import { Button } from "../../../default/Button";

interface UpdateButtonProps {
  isPristine: boolean;
  onUpdate: () => void;
  isVertical?: boolean;
}

export const UpdateButton = ({
  isPristine,
  onUpdate,
  isVertical,
}: UpdateButtonProps) => (
  <Button
    text="Save changes"
    disabled={isPristine}
    onClick={onUpdate}
    className="save-button"
    $fullWidth={isVertical}
    icon="SaveIcon"
  />
);
