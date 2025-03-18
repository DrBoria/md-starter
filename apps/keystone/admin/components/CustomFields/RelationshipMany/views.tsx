import type { DeserializedValue } from "@keystone-6/core/admin-ui/utils";
import type {
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from "@keystone-6/core/types";
import React, { useEffect } from "react";
import { useList } from "@keystone-6/core/admin-ui/context";
import { BasicSection, Button, DescriptionText, Label } from "@md/components";

import type { TSession } from "../../../../types";
import { getWhereParameters } from "./utils";
import { useQueryList } from "@md/api/graphql";
import type { QueryResult} from "@apollo/client";
import { useQuery } from "@apollo/client";
import { toReadablePascalCase } from "@md/utils";
import { useModal } from "@md/components";
import { MultiSelect } from "@keystone-ui/fields";

export interface IListName {
  listName: string;
}

interface IOptionMultiSelect {
  label: string;
  value: string;
}
interface ISelectValue {
  id: string;
  currentIds: Set<string>;
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
  name?: string;
  title?: string;
  service?: string;
  filename?: string;
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

  const items = data?.items || [];

  function mapToOutput(input: IField): IOptionMultiSelect | null {
    if (!input) return null;

    const { id, title, name, service, filename } = input;
    const labelField = title || name || service || filename || "";

    return {
      label: labelField,
      value: id,
    };
  }

  function mapToValue(input: ISelectValue) {
    if (!input?.currentIds?.size) return [];

    // Map the currentIds to the matching items from the query result
    const mappedValues = Array.from(input.currentIds)
      .map((itemId) => {
        const matchingItem = items.find((item) => item.id === itemId);
        return matchingItem
          ? {
            label: matchingItem.name || matchingItem.filename || "",
            value: matchingItem.id,
          } // Map to IOptionMultiSelect format
          : null;
      })
      .filter(Boolean) as IOptionMultiSelect[]; // Filter out null values

    return mappedValues;
  }

  useEffect(() => {
    void refetch();
    // @ts-ignore it's have ? in case it's error type
  }, [itemValue?.organization?.value?.value?.id]);

  // Update handleChange to handle multi-select
  const handleChange = (newVal: IOptionMultiSelect[] | null) => {
    const localValue = value as ISelectValue;

    if (newVal === null) {
      onChange?.({
        ...localValue,
        currentIds: new Set([]),
      }); // Set the value to null
      return;
    }

    if (!newVal) return;
    onChange?.({
      ...localValue,
      currentIds: new Set(newVal.map((item) => item.value)),
    });
  };

  const itemReadableName = toReadablePascalCase(field?.refListKey);

  const handleCreateItemClick = () => {
    setSideBarModalData({
      listName: field?.refListKey,
      headerText: `Create ${itemReadableName}`,
      type: "create",
    });
  };

  return (
      <BasicSection>
        <Label>{field.label}</Label>
        <DescriptionText id={`${field.path}-description`}>
          {field.description}
        </DescriptionText>
        <div>
          <MultiSelect
            options={items.map(mapToOutput) as IOptionMultiSelect[]}
            value={mapToValue(value)}
            onChange={(selected) =>
              handleChange(selected as IOptionMultiSelect[])
            }
            placeholder="Select..."
            portalMenu
          />

          {!field.hideCreate && (
            <div className="flex items-center gap-5 mt-4">
              <Button onClick={handleCreateItemClick}>
                Create related {itemReadableName}
              </Button>
            </div>
          )}
        </div>
      </BasicSection>
  );
};

export { Field };
