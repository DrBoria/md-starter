import type { CellComponent, FieldProps } from "@keystone-6/core/types";
import React, { useEffect, useState } from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";

import type { Value } from "../utils/validate";
import type { controller } from "../utils/viewStarter";
import {
  ErrorValidationContainer,
  ErrorValidationMessage,
  Tooltip, Input,
  BasicSection,
  Label,
  DescriptionText
} from "@md/components";
import { ShortedText } from "@md/components/keystone";
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
      <BasicSection>
        <Label>{field.label}</Label>
        <DescriptionText id={`${field.path}-description`}>
          {field.description}
        </DescriptionText>
        <div>
          {field.isReadOnly ? (
            <ShortedText text={value?.inner?.value ?? ""} withCopy />
          ) : (
            <>
              <ErrorValidationContainer $isError={!!validationMessage}>
                <Input
                  placeholder={`Enter ${field.label}`}
                  value={value?.inner?.value ?? ""}
                  onChange={handleChange}
                  onBlur={handleValidate}
                  readOnly={!onChange}
                  data-test-id={`title-${field.label}`}
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
      </BasicSection>
  );
}

const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = item[field.path] + "";

  return linkTo ? (
      <CellLink {...linkTo}>{value}</CellLink>
  ) : (
      <CellContainer>
        <Tooltip text={value}>
          <ShortedText text={value} maxWidth={300} />
        </Tooltip>
      </CellContainer>
  );
};
Cell.supportsLinkTo = true;

export { Field, Cell };
