import React from "react";

import { Button } from "../../Button";

interface CreateButtonProps {
  listName: string;
  onClick: () => void;
}

export const CreateButton = ({ listName, onClick }: CreateButtonProps) => {
  return <Button text={`Create ${listName}`} onClick={onClick} />;
};
