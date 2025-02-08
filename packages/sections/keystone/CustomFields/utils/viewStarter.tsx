import type {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from "@keystone-6/core/types";
import React from "react";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";

const DefaultField = ({
  field,
  value,
  onChange,
  autoFocus,
}: FieldProps<typeof controller>) => (
  <FieldContainer>
    <FieldLabel htmlFor={field.path}>{field.label}</FieldLabel>
    {onChange ? (
      <TextInput
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
  </FieldContainer>
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
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <div>{value}</div>
    </FieldContainer>
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
