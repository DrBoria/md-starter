import type {
  DataGetter,
  DeepNullable,
  DeserializedValue,
  ItemData,
} from "@keystone-6/core/admin-ui/utils";
import type { FieldMeta } from "@keystone-6/core/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mergeDeep } from "@apollo/client/utilities";
import { useList } from "@keystone-6/core/admin-ui/context";
import {
  deserializeValue,
  useChangedFieldsAndDataForUpdate,
  useInvalidFields,
} from "@keystone-6/core/admin-ui/utils";
import { useToasts } from "@keystone-ui/toast";

import type { TValue } from "../../../types";
import type { FlexibleItemData } from "./data-mapping/useItemDataGetter";
import type { TOrderBy } from "./getNextSortOrder";
import { fieldsToGQL } from "./data-mapping/fieldsToGQL";
import { useItemDataGetter } from "./data-mapping/useItemDataGetter";
import { filterAllowedKeys, filterNotAllowedKeys } from "./filterKeys";
import { useQueryList, useQueryListItem, useUpdateMutation } from "@md/api/graphql";
import { QueryResult, useMutation, useQuery } from "@apollo/client";

interface TState {
  value: DeserializedValue;
  item: DataGetter<ItemData>;
  id?: string;
}

interface IFieldsDataParams {
  listName: string;
  itemId?: string;
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  where?: Record<string, unknown>;
  orderBy?: TOrderBy;
  noAdditionalFields?: boolean;
  limit?: number;
  skip?: number;
}

export interface IFieldsData<T extends FlexibleItemData> {
  list: typeof useList; // or the specific type of the returned list object
  loading: boolean;
  refetch: () => void;
  fieldModes: Record<string, "edit" | "read" | "hidden">;
  listItemData: DeepNullable<T> | null;
  itemGetter: DataGetter<ItemData>;
  selectedFields: string[];
  fieldsValue: DeserializedValue;
  invalidFields: Set<string>;
  onUpdate: (data?: object) => Promise<DeserializedValue | undefined>;
  forceValidation: boolean;
  changedFieldsList: string[];
  onFieldChange: (valueUpdater: (value: TValue) => TValue, id?: string) => void;
  resetState: () => { value: DeserializedValue; item: DataGetter<ItemData> };
}

/**
 *
 * @param listName Determinates table/model where you want to take data from
 * @param itemId if undefined - fetch the all items of specific model or if only one entity by provided itemId
 * @returns
 */
const useFieldsData = <T extends FlexibleItemData>({
  listName,
  itemId,
  fieldsToRender,
  notToRenderFields,
  where,
  orderBy,
  limit,
  skip,
}: IFieldsDataParams) => {
  const toasts = useToasts();
  // Fields requred for keystone fields
  const [forceValidation, setForceValidation] = useState(false);
  const list = { ...useList(listName) }; // This requires for filtering fields on the next lines

  // Negative filter - leaves everything, but selected fields
  if (notToRenderFields?.length) {
    list.fields = filterNotAllowedKeys(list.fields, notToRenderFields);
  }

  // Positive filter - leaves only selected fields in existed
  if (fieldsToRender?.length) {
    const requestedFields = [...fieldsToRender];
    if (!requestedFields.includes("id")) requestedFields.push("id"); // NOTE: id is required field
    list.fields = filterAllowedKeys(list.fields, requestedFields);
  }

  const selectedFields = fieldsToGQL(list.fields);

  const { update, loading } = useUpdateMutation(list, selectedFields, useMutation);

  // memoize the data fetching operation depending on itemId
  const fetchData = useCallback(() => {
    return itemId
      ? useQueryListItem<QueryResult<DeepNullable<T>>>({ listName, selectedFields, itemId, useQuery })
      : useQueryList<QueryResult<DeepNullable<T>>>({
        listName,
        selectedFields,
        limit: limit || 10,
        skip,
        where,
        orderBy,
        useQuery
      });
  }, [itemId, listName, selectedFields, where, orderBy, limit, skip]);
  const {
    data: listItemData,
    error: listItemError,
    loading: loadingData,
    refetch,
  } = fetchData();

  const [itemGetter, keystone] = useItemDataGetter(
    listItemData,
    listName,
    listItemError,
  );

  // Reset state data to its initial state
  const resetState = useCallback(() => {
    const initialValue = deserializeValue(list.fields, itemGetter);
    const newValue = { value: initialValue, item: itemGetter };
    setValue(newValue);
    setForceValidation(false);

    return newValue;
  }, [list.fields, itemGetter]);

  // Every Field got Edit mode.
  // Here we parse received keystone admin meta to get is it 'edit' 'read' or 'hidden' field
  const fieldModes = useMemo(() => {
    const itemViewFieldModesByField: Record<
      string,
      "edit" | "read" | "hidden"
    > = {};
    keystone?.data?.adminMeta?.list?.fields?.forEach((field: FieldMeta) => {
      if (field === null) return;
      if (field.path === null) return;
      if (field?.itemView?.fieldMode == null) return;
      itemViewFieldModesByField[field.path] = field.itemView.fieldMode;
    });
    return itemViewFieldModesByField;
  }, [keystone?.data?.adminMeta?.list?.fields]);

  // Local state of form on the page
  // First we storing data in our state, than validate and send to BE
  const [state, setValue] = useState<TState>(() => {
    const value = deserializeValue(list.fields, itemGetter);
    return { value, item: itemGetter };
  });

  // Should component update analogue for value
  useEffect(() => {
    if (!loading && state.item.data !== itemGetter.data) {
      const value = deserializeValue(list.fields, itemGetter);
      setValue({ value, item: itemGetter });
    }
  }, [itemGetter, list.fields, list.fields.length, loading, state.item.data]);

  let value = state.value;
  if (
    JSON.stringify(Object.keys(value)) !==
    JSON.stringify(Object.keys(list.fields))
  ) {
    value = deserializeValue(list.fields, itemGetter);
    setValue({ value, item: itemGetter });
  }

  // Validation
  const invalidFields = useInvalidFields(list.fields, value);
  const { changedFields, dataForUpdate } = useChangedFieldsAndDataForUpdate(
    list.fields,
    state.item,
    value,
  );
  const changedFieldsList = Array.from(changedFields);

  const onUpdate = useCallback(
    async (data?: object) => {
      const hasInvalidFields = invalidFields.size !== 0;
      setForceValidation(hasInvalidFields);
      if (hasInvalidFields) return;

      try {
        const response = await update({
          variables: {
            data: data ? mergeDeep(dataForUpdate, data) : dataForUpdate,
            id: state.id ?? state.item.get("id").data,
          },
        });
        const error = response.errors?.find(
          (x) => !x.path || x.path.length === 1,
        );
        if (error) {
          toasts.addToast({
            tone: "negative",
            title: "Failed to Save",
          });
        } else {
          toasts.addToast({
            tone: "positive",
            title: "Saved Successfully",
          });

          // @ts-ignore - we will always have item inside data for mutations if it was successfull
          return response?.data?.item;
        }
      } catch (err) {
        console.log("Error on update field data", err);
        toasts.addToast({
          tone: "negative",
          title: "Failed to Save",
        });
      }
    },
    [invalidFields.size, state.item, dataForUpdate, update],
  );

  // On change one or more keystone fields, neither in form or editable
  const onFieldChange = useCallback(
    (valueUpdater: (value: TValue) => TValue, id?: string) => {
      setValue((currentState) => ({
        ...currentState,
        id: id,
        value: valueUpdater(currentState.value),
      }));
    },
    [],
  );

  return {
    list,
    loading: loadingData,
    refetch,
    fieldModes,
    listItemData,
    itemGetter,
    selectedFields,
    fieldsValue: state.value,
    invalidFields,
    onUpdate,
    forceValidation,
    changedFieldsList,
    onFieldChange,
    resetState,
  };
};

export { useFieldsData };
