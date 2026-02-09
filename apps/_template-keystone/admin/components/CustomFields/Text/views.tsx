import type { CellComponent, FieldProps } from "@keystone-6/core/types";
import React, { useEffect, useState } from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";


import type { controller } from "@/admin/components/CustomFields/utils/viewStarter";
import { ShortedText } from "@md/components/keystone";
import { TextArea } from "@md/components/keystone";
import {
  BasicSection,
  DescriptionText,
  ErrorValidationContainer,
  ErrorValidationMessage,
  Input,
  Label,
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
    onChange && onChange({
      kind: "editing",
      value: updatedValue,
      isSet: true,
      inner: { value: updatedValue },
      confirm: updatedValue
    });
    setValidationMessage(null);
  };

  const handleValidate = () => {
    const message = validate(
      value,
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
      {field.displayMode === "textarea" ? (
        <div>
          <ErrorValidationContainer $isError={!!validationMessage}>
            <TextArea
              onChange={handleChange}
              disabled={field.isReadOnly || !onChange} // If on change not passed - permissions do not allow this user change this value
              value={value.kind !== 'initial' ? value.inner?.value : ""}
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
            <ShortedText text={value.kind !== 'initial' ? value.value : ""} withCopy />
          ) : (
            <>
              <ErrorValidationContainer $isError={!!validationMessage}>
                <Input
                  value={value.kind !== 'initial' ? value.value : ""}
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
    </BasicSection>
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
