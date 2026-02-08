import type {
  DataGetter,
  DeepNullable,
  DeserializedValue,
  ItemData,
} from "@keystone-6/core/admin-ui/utils";
import type { ListMeta } from "@keystone-6/core/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mergeDeep } from "@apollo/client/utilities";
import { useList } from "@keystone-6/core/admin-ui/context";
import {
  deserializeValue,
  useChangedFieldsAndDataForUpdate,
  useInvalidFields,
} from "@keystone-6/core/admin-ui/utils";

import type { TValue } from "@md/types";
import type { FlexibleItemData } from "./data-mapping/useItemDataGetter";
import type { TOrderBy } from "./getNextSortOrder";
import { fieldsToGQL } from "./data-mapping/fieldsToGQL";
import { useItemDataGetter } from "./data-mapping/useItemDataGetter";
import { filterAllowedKeys, filterNotAllowedKeys } from "./filterKeys";
import { useQueryList, useQueryListItem, useUpdateMutation } from "@md/api/graphql";
import type { QueryResult } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import { useLogger } from "@md/components/keystone";

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
  list: ListMeta;
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
  const logger = useLogger();
  // Fields requred for keystone fields
  const [forceValidation, setForceValidation] = useState(false);
  const listResult = useList(listName);
  const list = useMemo(() => {
    if (!listResult?.fields) {
      // Return a compliant ListMeta object with default values
      const emptyListMeta: ListMeta = {
        key: listName,
        path: listName,
        label: listName,
        singular: listName,
        plural: listName,
        description: null,
        initialColumns: [],
        pageSize: 50,
        labelField: 'id',
        fields: {},
        initialSort: null,
        isSingleton: false,
        groups: [],
        gqlNames: {
          outputTypeName: listName,
          itemQueryName: listName,
          listQueryName: `${listName}s`,
          listQueryCountName: `${listName}sCount`,
          listOrderName: `${listName}sOrderByInput`,
          deleteMutationName: `delete${listName}`,
          updateMutationName: `update${listName}`,
          createMutationName: `create${listName}`,
          deleteManyMutationName: `delete${listName}s`,
          updateManyMutationName: `update${listName}s`,
          createManyMutationName: `create${listName}s`,
          whereInputName: `${listName}WhereInput`,
          whereUniqueInputName: `${listName}WhereUniqueInput`,
          updateInputName: `${listName}UpdateInput`,
          createInputName: `${listName}CreateInput`,
          updateManyInputName: `${listName}UpdateManyInput`,
          relateToManyForCreateInputName: `${listName}RelateToManyForCreateInput`,
          relateToOneForCreateInputName: `${listName}RelateToOneForCreateInput`,
          relateToManyForUpdateInputName: `${listName}RelateToManyForUpdateInput`,
          relateToOneForUpdateInputName: `${listName}RelateToOneForUpdateInput`,
        },
      };
      return emptyListMeta;
    }
    return { ...listResult } as ListMeta; // Ensure compatibility without 'unknown'
  }, [listResult, listName]);

  // Negative filter - leaves everything, but selected fields
  const filteredFields = useMemo(() => {
    let fields = { ...list.fields };
    if (notToRenderFields?.length) {
      fields = filterNotAllowedKeys(fields, notToRenderFields);
    }

    // Positive filter - leaves only selected fields in existed
    if (fieldsToRender?.length) {
      const requestedFields = [...fieldsToRender];
      if (!requestedFields.includes("id")) requestedFields.push("id"); // NOTE: id is required field
      fields = filterAllowedKeys(fields, requestedFields);
    }
    return fields;
  }, [list.fields, notToRenderFields, fieldsToRender]);

  const selectedFields = useMemo(() => fieldsToGQL(filteredFields), [filteredFields]);

  const { update, loading } = useUpdateMutation({ ...list, fields: filteredFields }, selectedFields, useMutation);

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
    const initialValue = deserializeValue(filteredFields, itemGetter);
    const newValue = { value: initialValue, item: itemGetter };
    setValue(newValue);
    setForceValidation(false);

    return newValue;
  }, [filteredFields, itemGetter]);

  // Every Field got Edit mode.
  // Here we parse received keystone admin meta to get is it 'edit' 'read' or 'hidden' field
  const fieldModes = useMemo(() => {
    const itemViewFieldModesByField: Record<
      string,
      "edit" | "read" | "hidden"
    > = {};
    keystone?.data?.adminMeta?.list?.fields?.forEach((field: { path: string; itemView?: { fieldMode: "edit" | "read" | "hidden" } }) => {
      if (!field?.path || field.itemView?.fieldMode == null) return;
      itemViewFieldModesByField[field.path] = field.itemView.fieldMode;
    });
    return itemViewFieldModesByField;
  }, [keystone?.data?.adminMeta?.list?.fields]);

  // Local state of form on the page
  // First we storing data in our state, than validate and send to BE
  const [state, setValue] = useState<TState>(() => {
    const value = deserializeValue(filteredFields, itemGetter);
    return { value, item: itemGetter };
  });

  // Should component update analogue for value
  useEffect(() => {
    if (!loading && state.item.data !== itemGetter.data) {
      const value = deserializeValue(filteredFields, itemGetter);
      setValue({ value, item: itemGetter });
    }
  }, [itemGetter, filteredFields, loading, state.item.data]);

  let value = state.value;
  if (
    JSON.stringify(Object.keys(value)) !==
    JSON.stringify(Object.keys(filteredFields))
  ) {
    value = deserializeValue(filteredFields, itemGetter);
    setValue({ value, item: itemGetter });
  }

  // Validation
  const invalidFields = useInvalidFields(filteredFields, value);
  const { changedFields, dataForUpdate } = useChangedFieldsAndDataForUpdate(
    filteredFields,
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
          (x: { path?: ReadonlyArray<string | number> }) => !x.path || x.path.length === 1,
        );
        if (error) {
          logger.add({
            tone: "negative",
            title: "Failed to Save",
          });
        } else {
          logger.add({
            tone: "positive",
            title: "Saved Successfully",
          });

          const responseData: unknown = response?.data;
          return (responseData as { item: DeserializedValue })?.item;
        }
      } catch (err) {
        logger.add({
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
    list: { ...list, fields: filteredFields },
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
