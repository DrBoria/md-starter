import React from "react";
import { Button } from "@keystone-ui/button";

import { upperCaseFirstLetter } from "../../../../utils/upperCaseFirstLetter";
import { HeaderText } from "@md/components";

interface TSubmitTemplateProps {
  actionName: string;
  onCancel: () => void;
  onSubmit: () => void;
}
const SubmitTemplate = ({
  actionName,
  onCancel,
  onSubmit,
}: TSubmitTemplateProps) => (
  <>
    <HeaderText>{upperCaseFirstLetter(actionName)} Confirmation</HeaderText>
    <p>
      Are you sure you want to <strong>{actionName}</strong>?
    </p>
    <div className="flex justify-end w-full gap-4">
      <Button weight="none" onClick={onCancel}>
        Cancel
      </Button>
      <Button tone="active" onClick={onSubmit}>
        {upperCaseFirstLetter(actionName)}
      </Button>
    </div>
  </>
);
export { SubmitTemplate };
