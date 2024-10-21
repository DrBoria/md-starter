import type { CellComponent, FieldProps } from "@keystone-6/core/types";
import React from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";

import { ShortedText } from "@md/components";
import { TextArea } from "@md/components/keystone";
import { controller, DefaultCardValue } from "../utils/viewStarter";
import { Input } from "@md/components";

function Field({ field, value, onChange }: FieldProps<typeof controller>) {
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const updatedValue: string = e.target.value;
    onChange && onChange(updatedValue);
  };

  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      {field.displayMode === "textarea" ? (
        <div>
          <TextArea
            onChange={handleChange}
            disabled={field.isReadOnly || !onChange} // If on change not passed - permissions do not allow this user change this value
            value={value ?? ""}
          />
        </div>
      ) : (
        <div>
          {field.isReadOnly ? (
            <ShortedText text={value ?? ""} withCopy />
          ) : (
            <Input value={value ?? ""} onChange={handleChange} />
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

const CardValue = DefaultCardValue;

export { controller, CardValue, Field, Cell };
