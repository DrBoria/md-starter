import type { CellComponent, FieldProps } from "@keystone-6/core/types";
import React from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";

import type { controller } from "../utils/viewStarter";
import { ShortedText } from "@md/components/keystone";
import { TextArea } from "@md/components/keystone";

function Field({ field, value, onChange }: FieldProps<typeof controller>) {
  return (
      <FieldContainer as="fieldset">
        <FieldLabel>{field.label}</FieldLabel>
        <FieldDescription id={`${field.path}-description`}>
          {field.description}
        </FieldDescription>
        <div>
          {onChange ? (
            <TextArea
              rows={8}
              onChange={(e) => {
                onChange?.({
                  inner: { value: e.target.value },
                });
              }}
              value={value?.inner?.value ?? ""}
              disabled={!onChange}
            />
          ) : (
            <ShortedText text={value?.inner?.value ?? ""} withCopy />
          )}
        </div>
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

export { Cell, Field };
