import React from "react";
import { useToasts } from "@keystone-ui/toast";

import type { ButtonSize } from "../../../default/Button";
import { Button } from "../../../default/Button";
import { Tooltip } from "../../../default/Tooltip";
import { useLogger } from "../../../default/Logger";

interface CopyButtonProps {
  value?: string | null;
  listName?: string;
  size?: ButtonSize;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  listName = "",
  ...rest
}) => {
  const logger = useLogger();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value ?? "");
      logger.add({
        tone: "positive",
        title: `${listName} id copied to clipboard`,
      });
    } catch {
      console.error(`Failed to copy text: ${value}`);
    }
  };

  return (
    <Tooltip text="Copy">
      <Button
        tone="neutral"
        icon="Clipboard"
        onClick={copyToClipboard}
        {...rest}
      />
    </Tooltip>
  );
};
