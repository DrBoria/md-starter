import type { FieldProps } from "@keystone-6/core/types";
import React, { useEffect, useState } from "react";

// @ts-expect-error fix import path
import type { Value } from "@/admin/components/CustomFields/utils/validate";
// @ts-expect-error fix import path
import type { controller } from "@/admin/components/CustomFields/utils/viewStarter";
import { BasicSection, DescriptionText, Input, Label } from "@md/components";
import {
  ErrorValidationContainer,
  ErrorValidationMessage,
} from "@md/components";
// @ts-expect-error fix import path
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
        // @ts-expect-error value.value used for integer types
        value: Number.isNaN(numberValue) ? updatedValue : Number(updatedValue),
      });
    setValidationMessage(null);
  };

  const handleValidate = () => {
    const message = validate(
      value as unknown as Value,
      // @ts-expect-error remove ts-ignore after types fix in keystone
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
            // @ts-expect-error remove ts-ignore after types fix in keystone
            value={`${value?.value ?? ""}`}
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
