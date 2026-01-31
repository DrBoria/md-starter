import type { ApolloError } from "@apollo/client";
import type { Fields, Value } from "@keystone-6/core/admin-ui/utils";
import type { ListMeta } from "@keystone-6/core/types";
import type { ComponentProps } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useKeystone } from "@keystone-6/core/admin-ui/context";
import isDeepEqual from "fast-deep-equal";

import { usePreventNavigation } from "./usePreventNavigation";
import { useLogger } from "@md/components";

type IValueWithoutServerSideErrors = Record<
  string,
  { kind: "value"; value: unknown }
>;

export interface CreateItemHookResult {
  state: "editing" | "loading" | "created";
  shouldPreventNavigation: boolean;
  error?: ApolloError;
  resetState: () => void;
  props: ComponentProps<typeof Fields>;
  create: (
    additionalValues?: object,
  ) => Promise<{ id: string; label: string | null } | undefined>;
}

export function useCreateItem(
  list: ListMeta,
  noPreventNavigation?: boolean,
  defaultValue?: Record<string, unknown>,
): CreateItemHookResult {
  const logger = useLogger();
  const { createViewFieldModes } = useKeystone();

  const [createItem, { loading, error, data: returnedData }] = useMutation(
    gql`mutation($data: ${list.gqlNames.createInputName}!) {
      item: ${list.gqlNames.createMutationName}(data: $data) {
        id
        label: ${list.labelField}
    }
  }`,
  );

  const [value, setValue] = useState(() => {
    const value: IValueWithoutServerSideErrors = {};
    Object.keys(list.fields).forEach((fieldPath) => {
      value[fieldPath] = {
        kind: "value",
        // Support for custom default values
        value: defaultValue?.[fieldPath]
          ? {
              kind: "create",
              inner: { kind: "value", value: defaultValue[fieldPath] },
            }
          : list.fields[fieldPath]?.controller.defaultValue,
      };
    });
    return value;
  });

  const invalidFields = useMemo(() => {
    const invalidFields = new Set<string>();

    Object.keys(value).forEach((fieldPath) => {
      const val = value[fieldPath]?.value;
      if (!val) return;

      const validateFn = list.fields[fieldPath]?.controller.validate;
      if (validateFn) {
        const result = validateFn(val);
        if (result === false) {
          invalidFields.add(fieldPath);
        }
      }
    });
    return invalidFields;
  }, [list, value]);

  const [forceValidation, setForceValidation] = useState(false);

  const data: Record<string, unknown> = {};
  Object.keys(list.fields).forEach((fieldPath) => {
    const { controller } = list.fields[fieldPath];
    const serialized = controller?.serialize(value?.[fieldPath]?.value);
    if (
      !isDeepEqual(serialized, controller?.serialize(controller.defaultValue))
    ) {
      Object.assign(data, serialized);
    }
  });

  const shouldPreventNavigation =
    !returnedData?.item && Object.keys(data).length !== 0;
  const shouldPreventNavigationRef = useRef(shouldPreventNavigation);

  useEffect(() => {
    shouldPreventNavigationRef.current = shouldPreventNavigation;
  }, [shouldPreventNavigation]);

  if (!noPreventNavigation) {
    usePreventNavigation(shouldPreventNavigationRef);
  }

  const resetState = useCallback(() => {
    const initialValue: IValueWithoutServerSideErrors = {};
    Object.keys(list.fields).forEach((fieldPath) => {
      initialValue[fieldPath] = {
        kind: "value",
        value: list.fields[fieldPath]?.controller.defaultValue,
      };
    });
    setValue(initialValue);
  }, [list.fields]);

  return {
    state: loading ? "loading" : !returnedData?.item ? "created" : "editing",
    shouldPreventNavigation,
    error,
    resetState,
    props: {
      fields: list.fields,
      groups: list.groups,
      fieldModes:
        createViewFieldModes.state === "loaded"
          ? createViewFieldModes.lists[list.key]
          : null,
      forceValidation,
      invalidFields,
      value,
      onChange: useCallback((getNewValue: (value: Value) => Value) => {
        setValue(
          (oldValues) =>
            getNewValue(oldValues) as IValueWithoutServerSideErrors,
        );
      }, []),
    },
    async create(
      additionalValues,
    ): Promise<{ id: string; label: string | null } | undefined> {
      const newForceValidation = invalidFields.size !== 0;
      setForceValidation(newForceValidation);

      if (newForceValidation) return undefined;

      let outputData: { item: { id: string; label: string | null } };
      try {
        outputData = await createItem({
          variables: {
            data: { ...data, ...additionalValues! },
          },
          update(cache, { data }) {
            if (typeof data?.item?.id === "string") {
              cache.evict({
                id: "ROOT_QUERY",
                fieldName: `${list.gqlNames.itemQueryName}(${JSON.stringify({
                  where: { id: data.item.id },
                })})`,
              });
            }
          },
        }).then((x) => x.data);
      } catch (err) {
        const error = err as ApolloError;
        let message;

        if (error?.message.includes("missing value")) {
          message = "Required fields must be filled in";
        }
        if (error?.message.includes("Unique constraint failed")) {
          message = "Please use unique item name";
        }

        logger.add({
          title: "Failed to Create",
          tone: "negative",
          message,
        });
        return undefined;
      }
      shouldPreventNavigationRef.current = false;
      const label = outputData.item.label || outputData.item.id;
      logger.add({
        title: label,
        message: "Created Successfully",
        tone: "positive",
      });
      return outputData.item;
    },
  };
}
