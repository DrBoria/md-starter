import React from "react";

import { HeaderText } from "@md/components";
import { Button,  ButtonProps } from "@md/components/keystone/Button";
import { upperCaseFirstLetter } from "@md/utils";

interface TSubmitTemplateProps {
  actionName: string;
  title?: string;
  messageText?: string;
  tone?: ButtonProps["tone"];
  onCancel: () => void;
  onSubmit: () => void;
}
const SubmitTemplate = ({
  actionName,
  title,
  messageText,
  onCancel,
  onSubmit,
  tone = "active",
}: TSubmitTemplateProps) => (
  <>
    <HeaderText>
      {title || `${upperCaseFirstLetter(actionName)} Confirmation`}
    </HeaderText>
    {messageText ? (
      <p>{messageText}</p>
    ) : (
      <p>
        Are you sure you want to <strong>{actionName}</strong>?
      </p>
    )}
    <div className="flex justify-end w-full gap-4">
      <Button weight="none" onClick={onCancel}>
        Cancel
      </Button>
      <Button tone={tone} onClick={onSubmit}>
        {upperCaseFirstLetter(actionName)}
      </Button>
    </div>
  </>
);
export { SubmitTemplate };
