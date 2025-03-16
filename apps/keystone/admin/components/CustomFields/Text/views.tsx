import type { CellComponent, FieldProps } from "@keystone-6/core/types";
import React, { useEffect, useState } from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";

import type { Value } from "../utils/validate";
import type { controller } from "../utils/viewStarter";
import { ShortedText } from "@md/components/keystone";
import { TextArea } from "@md/components/keystone";
import {
  ErrorValidationContainer,
  ErrorValidationMessage,
  Input,
} from "@md/components";
import { validate } from "../utils/validate";

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
    onChange && onChange({ inner: { value: updatedValue } });
    setValidationMessage(null);
  };

  const handleValidate = () => {
    const message = validate(
      value as unknown as Value,
      // @ts-ignore remove ts-ignore after types fix in keystone
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
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      {field.displayMode === "textarea" ? (
        <div>
          <ErrorValidationContainer $isError={!!validationMessage}>
            <TextArea
              onChange={handleChange}
              disabled={field.isReadOnly || !onChange} // If on change not passed - permissions do not allow this user change this value
              value={value?.inner?.value ?? ""}
              testId={`text-area-${field.label}`}
            />
          </ErrorValidationContainer>
          {validationMessage && (
            <ErrorValidationMessage>{validationMessage}</ErrorValidationMessage>
          )}
        </div>
      ) : (
        <div>
          {field.isReadOnly ? (
            <ShortedText text={value?.inner?.value ?? ""} withCopy />
          ) : (
            <>
              <ErrorValidationContainer $isError={!!validationMessage}>
                <Input
                  value={value?.inner?.value ?? ""}
                  onChange={handleChange}
                  onBlur={handleValidate}
                  readOnly={!onChange}
                  data-test-id={`text-${field.label}`}
                />
              </ErrorValidationContainer>
              {validationMessage && (
                <ErrorValidationMessage>
                  {validationMessage}
                </ErrorValidationMessage>
              )}
            </>
          )}
        </div>
      )}
    </FieldContainer>
  );
}

const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = item[field.path] + "";
  return linkTo ? (
    <CellLink {...linkTo}>{value}</CellLink>
  ) : (
    <CellContainer>
      <ShortedText text={value} maxWidth={200} />
    </CellContainer>
  );
};
Cell.supportsLinkTo = true;

export { Field, Cell };
