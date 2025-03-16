import React from "react";

import { Button } from "../../../default/Button";
import { Tooltip } from "../../../default/Tooltip";

interface DuplicateButtonProps {
  onClick: () => void;
  $fullWidth?: boolean;
  children?: JSX.Element | string;
  className?: string;
}

export const DuplicateButton: React.FC<DuplicateButtonProps> = ({
  onClick,
  children,
  $fullWidth,
  className,
  ...rest
}) => {
  return (
    <Tooltip
      $fullWidth={$fullWidth}
      text={$fullWidth ? "" : "Duplicate"}
      className={className}
    >
      <Button
        tone="passive"
        onClick={onClick}
        $fullWidth={$fullWidth}
        icon="FilePlusIcon"
        {...rest}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
