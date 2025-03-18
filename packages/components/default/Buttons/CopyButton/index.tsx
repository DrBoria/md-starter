import React from "react";
import type { ButtonSize } from "../../Button";
import { Button } from "../../Button";
import { Tooltip } from "../../Tooltip";
import { useLogger } from "../../Logger";

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
