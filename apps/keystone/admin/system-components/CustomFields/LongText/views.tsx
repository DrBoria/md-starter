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
import { ThemeProvider } from "@md/styles";

function Field({ field, value, onChange }: FieldProps<typeof controller>) {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = item[field.path] + "";
  return linkTo ? (
    <ThemeProvider>
      <CellLink {...linkTo}>{value}</CellLink>
    </ThemeProvider>
  ) : (
    <ThemeProvider>
      <CellContainer>
        <ShortedText text={value} maxWidth={200} />
      </CellContainer>
    </ThemeProvider>
  );
};

Cell.supportsLinkTo = true;

export { Cell, Field };
