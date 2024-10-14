import React from "react";
import { Button } from "@keystone-ui/button";

import { HeaderText } from "@md/components";

interface TDeleteTemplateProps {
  item: string;
  onCancel: () => void;
  onDelete: () => void;
}
const DeleteTemplate = ({ item, onCancel, onDelete }: TDeleteTemplateProps) => (
  <>
    <HeaderText>Delete Confirmation</HeaderText>
    <p>
      Are you sure you want to delete <strong>{item}</strong>?
    </p>
    <div className="flex justify-end w-full gap-4">
      <Button weight="none" onClick={onCancel}>
        Cancel
      </Button>
      <Button tone={"negative"} onClick={onDelete}>
        Delete
      </Button>
    </div>
  </>
);
export { DeleteTemplate };
