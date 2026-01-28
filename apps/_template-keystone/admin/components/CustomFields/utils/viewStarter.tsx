import type {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from "@keystone-6/core/types";
import React from "react";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { BasicSection, Input, Label } from "@md/components";

const DefaultField = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => (
  <BasicSection>
    <Label htmlFor={field.path}>{field.label}</Label>
    {onChange ? (
      <Input
        id={field.path}
        autoFocus={autoFocus}
        type="number"
        onChange={(event) => {
          onChange({
            inner: { value: event.target.value.replace(/[^\d-]/g, "") },
          });
        }}
        value={value?.inner?.value}
      />
    ) : (
      value?.inner?.value
    )}
  </BasicSection>
);

const DefaultCell: CellComponent = ({ item, field, linkTo }) => {
  const value = (item[field.path] as string) || "";
  return (
    <CellContainer>
      {linkTo ? <a href={linkTo.href}>{value}</a> : value}
    </CellContainer>
  );
};

const DefaultCardValue: CardValueComponent = ({ item, field }) => {
  const value = (item[field.path] as string) || "";
  return (
    <BasicSection>
      <Label>{field.label}</Label>
      <div>{value}</div>
    </BasicSection>
  );
};

function controller(
  config: FieldControllerConfig<{ isReadOnly: boolean }>,
): FieldController<{ inner: { value: string }; initial?: string }, string> & {
  displayMode?: "input" | "textarea";
  isReadOnly: boolean;
} {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: { inner: { value: "" } },
    deserialize: (data) => {
      const value = (data[config.path] as string) || "";
      return { inner: { value } };
    },
    serialize: (value) => ({ [config.path]: { inner: { value } } }),
    ...config.fieldMeta,
    isReadOnly: config.fieldMeta?.isReadOnly || false,
  };
}

export { controller, DefaultCell, DefaultCardValue, DefaultField };
