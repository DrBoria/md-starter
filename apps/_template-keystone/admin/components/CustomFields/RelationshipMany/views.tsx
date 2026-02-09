import type { DeserializedValue } from "@keystone-6/core/admin-ui/utils";
import type {
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from "@keystone-6/core/types";
import React, { useEffect } from "react";
import { useList } from "@keystone-6/core/admin-ui/context";
import { BasicSection, Button, DescriptionText, Label } from "@md/components";
import type { TSideBarModalData } from "@md/components";

// import type { TOperation } from "@/types";
import { getWhereParameters } from "./utils";
import { useQueryList } from "@md/api/graphql";
import type { QueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { toReadablePascalCase } from "@md/utils";
import { useModal } from "@md/components/keystone";
// import { MultiSelect } from "@keystone-ui/fields";
import type { TSession } from "@/schema/utils/access";

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



  interface IItemValue {
    organization?: {
      value?: {
        value?: {
          id?: string;
        };
      };
    };
  }

  useEffect(() => {
    void refetch();
  }, [(itemValue as IItemValue)?.organization?.value?.value?.id]);

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
    } as TSideBarModalData);
  };

  return (
    <BasicSection>
      <Label>{field.label}</Label>
      <DescriptionText id={`${field.path}-description`}>
        {field.description}
      </DescriptionText>
      <div>
        <select
          multiple
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={Array.from(value.currentIds)}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(option => ({ label: option.text, value: option.value }));
            handleChange(selectedOptions);
          }}
        >
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name || item.filename || item.title || item.id}
            </option>
          ))}
        </select>

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
