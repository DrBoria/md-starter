import type {
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from "@keystone-6/core/types";
import React, { useEffect } from "react";
import { useList } from "@keystone-6/core/admin-ui/context";
import type { DeserializedValue } from "@keystone-6/core/admin-ui/utils";
import { Button } from "@keystone-ui/button";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";

import type { IOption, TSession } from "../../../../../../packages/types";
import { Select, useModal } from "@md/components";
import { LinkInForm } from "@md/components";
import { getWhereParameters } from "./utils";
import { useQueryList, useQueryListItem } from "@md/api/graphql";
import { QueryResult, useQuery } from "@apollo/client";
import { toReadablePascalCase } from "@md/utils";

export interface IListName {
  listName: string;
}
interface ISelectValue {
  value: { id: string; label: string; value?: unknown } | null;
}

type IFieldProps = (config: FieldControllerConfig) => FieldController<
  string,
  string
> & {
  refListKey: string;
  hideCreate?: boolean;
};

interface IField {
  id: string;
  name: string;
  title: string;
  service: string;
}

const getUserSession = (): TSession["data"] | undefined => {
  try {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user) as TSession["data"];
    }
  } catch (err) {
    console.error("Error when getting user role", err);
  }
  return undefined;
};

const Field = ({
  field,
  value,
  onChange,
  itemValue,
}: FieldProps<IFieldProps> & {
  itemValue: DeserializedValue;
  value: ISelectValue;
  onChange: (value: ISelectValue) => void;
}) => {
  const { setSideBarModalData } = useModal();
  const session = getUserSession();
  const list = useList(field?.refListKey);
  const selectedFields =
    "id " +
    list?.initialColumns
      .filter((name) => {
        const fieldMeta = list.fields[name].fieldMeta as { refListKey: string };
        return !fieldMeta?.refListKey;
      })
      .join(" ");

  const { data, refetch } = useQueryList<QueryResult<{
    items: [IField];
  }>>({
    listName: field?.refListKey,
    selectedFields,
    where: getWhereParameters(list, itemValue, session),
    useQuery
  });

  const { data: fullValueItem } = useQueryListItem<QueryResult<{ agentWriter: IField }>>({
    listName: field?.refListKey,
    selectedFields,
    itemId: value?.value?.id,
    useQuery
  });

  const items = data?.items || [];

  function mapToOutput(input: IField): IOption | null {
    if (!input) return null;

    const { id, title, name, service } = input;
    const labelField = title || name || service || "";

    return {
      label: labelField,
      value: id,
    };
  }

  function mapToValue(input: ISelectValue["value"]): IOption | null {
    if (!input) return null;
    const { id, label } = input;

    const labelField = label || "";
    return {
      label: labelField,
      value: id,
    };
  }

  useEffect(() => {
    void refetch();
    // @ts-ignore the issue with itemValue where kind:error will not be fired cause of ?
  }, [itemValue?.organization?.value?.value?.id]);

  const handleChange = (newVal: IOption | null) => {
    const localValue = value as ISelectValue;

    if (newVal === null) {
      onChange?.({
        ...localValue,
        value: null,
      }); // Set the value to null
      return;
    }

    if (!newVal) return;

    onChange?.({
      ...localValue,
      value: {
        ...newVal,
        id: newVal.value as string,
      },
    });
  };

  const currentValue = fullValueItem?.agentWriter
    ? mapToOutput(fullValueItem?.agentWriter)
    : mapToValue(value?.value);

  const itemReadableName = toReadablePascalCase(field?.refListKey);

  const handleCreateItemClick = () => {
    setSideBarModalData({
      listName: field?.refListKey,
      headerText: `Create ${itemReadableName}`,
      type: "create",
    });
  };

  return (
      <FieldContainer as="fieldset">
        <FieldLabel>{field.label}</FieldLabel>
        <FieldDescription id={`${field.path}-description`}>
          {field.description}
        </FieldDescription>
        <div>
          <Select
            options={items.map(mapToOutput) as IOption[]}
            value={currentValue}
            onChange={handleChange}
            isClearable={!!value?.value}
            readOnly={!onChange}
            placeholder="Select..."
          />
          {!field.hideCreate && (
            <div className="flex items-center gap-5 mt-4">
              <Button onClick={handleCreateItemClick}>
                Create related {itemReadableName}
              </Button>
              {value?.value?.id && (
                <LinkInForm href={`/${list?.path}/${value.value.id}`}>
                  View {itemReadableName} details
                </LinkInForm>
              )}
            </div>
          )}
        </div>
      </FieldContainer>
  );
};

export { Field };
