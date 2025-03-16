import type { CellComponent, FieldProps } from "@keystone-6/core/types";
import React from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";

import type { controller } from "../utils/viewStarter";
import { ShortedText } from "@md/components/keystone";
import { TextArea } from "@md/components/keystone";
import { BasicSection, DescriptionText, Label } from "@md/components";

function Field({ field, value, onChange }: FieldProps<typeof controller>) {
  return (
      <BasicSection>
        <Label>{field.label}</Label>
        <DescriptionText id={`${field.path}-description`}>
          {field.description}
        </DescriptionText>
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

export { Cell, Field };
