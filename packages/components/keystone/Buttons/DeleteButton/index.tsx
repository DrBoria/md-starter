import React from "react";

import { Button } from "../../../default/Button";

interface DeleteButtonProps {
  onDelete: () => void;
  isVertical?: boolean;
}

export const DeleteButton = ({ isVertical, onDelete }: DeleteButtonProps) => (
  <Button
    tone="negative"
    $fullWidth={isVertical}
    onClick={onDelete}
    icon="TrashIcon"
    text="Delete"
  />
);
