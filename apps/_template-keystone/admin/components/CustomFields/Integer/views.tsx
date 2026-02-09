import type { FieldProps } from "@keystone-6/core/types";
import React, { useEffect, useState } from "react";

import type { Value } from "@/admin/components/CustomFields/utils/validate";
import type { controller } from "@/admin/components/CustomFields/utils/viewStarter";
import { BasicSection, DescriptionText, Input, Label } from "@md/components";
import {
  ErrorValidationContainer,
  ErrorValidationMessage,
} from "@md/components";
import { validate } from "@/admin/components/CustomFields/utils/validate";

function Field({
  field,
  value,
  onChange,
  forceValidation,
}: FieldProps<typeof controller>) {
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const updatedValue: string = e.target.value;
    const numberValue = Number(updatedValue);
    // The Integer field requires the data format to be 'number'.
    // However, we should not prevent the user from entering other characters, as it may seem like the field is unresponsive.
    onChange &&
      onChange({
        kind: "editing",
        value: Number.isNaN(numberValue) ? updatedValue : Number(updatedValue).toString(),
        isSet: true,
        inner: { value: updatedValue },
        confirm: updatedValue // Assuming confirm logic matches value for simplicity or is handled elsewhere
      } as Value);
    setValidationMessage(null);
  };

  const handleValidate = () => {
    const message = validate(
      value as unknown as Value,
      field.validation,
      field.label,
    );
    setValidationMessage(message || null);
  };

  useEffect(() => {
    if (forceValidation) {
      handleValidate();
    }
  }, [forceValidation]);

  return (
    <BasicSection>
      <Label>{field.label}</Label>
      <DescriptionText id={`${field.path}-description`}>
        {field.description}
      </DescriptionText>
      <div>
        <ErrorValidationContainer $isError={!!validationMessage}>
          <Input
            value={`${value.kind === 'initial' ? '' : value.value}`}
            onChange={handleChange}
            onBlur={handleValidate}
            readOnly={!onChange}
            type="number"
            data-test-id={`number-${field.label}`}
          />
        </ErrorValidationContainer>
        {validationMessage && (
          <ErrorValidationMessage>{validationMessage}</ErrorValidationMessage>
        )}
      </div>
    </BasicSection>
  );
}

export { Field };
