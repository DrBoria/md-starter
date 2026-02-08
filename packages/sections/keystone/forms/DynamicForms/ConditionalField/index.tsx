/* eslint-disable no-restricted-imports */
import React, { useEffect } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";
import type { TValue } from "@md/types";
import { ThemeProvider } from "@md/styles";
import { useCreateItem } from "../../../common/utils/useCreateItem";
import type { CreateItemHookResult } from "../../../common/utils/useCreateItem";
import { useFieldsData } from "../../../common/utils/useFieldsData";

interface FieldValue {
  fieldName: string;
}

interface TConditionalField {
  fieldName: string;
  [key: string]: FieldValue[] | string;
}

interface IConditionalFieldProps {
  listName: string;
  conditionalField: TConditionalField;
  // Use it to get values of master field (state updater function)
  onCreateConditionalItemsChange: (value: (value: TValue) => TValue) => void;
  // Use it to get values of slave fields (state updater function)
  onSubFieldListChange: (value: (value: TValue) => TValue) => void;
  itemId?: string;
  setResetStates?: (functions: (() => void)[]) => void;
}

const ConditionalField = ({
  listName,
  conditionalField,
  onSubFieldListChange,
  onCreateConditionalItemsChange,
  itemId,
  setResetStates,
}: IConditionalFieldProps) => {
  let createConditionalItems: CreateItemHookResult | undefined;
  /**
   * Logic for master fields
   */
  const conditionalFieldList = useFieldsData({
    listName,
    fieldsToRender: [conditionalField.fieldName],
    notToRenderFields: ["name"],
    itemId, // Pass itemId when available
  });

  if (!itemId) {
    // useCreateItem is only for Create Form
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    createConditionalItems = useCreateItem(conditionalFieldList.list as never, true);
  }

  const rawValue = itemId
    ? conditionalFieldList.fieldsValue?.[conditionalField.fieldName]
    : createConditionalItems?.props?.value?.[conditionalField.fieldName];

  // Helper to extract value from TValue union
  const extractValue = (val: unknown) => {
    if (typeof val === 'object' && val !== null && 'kind' in val && (val as { kind: string }).kind === 'value') {
      return (val as unknown as { value: string }).value;
    }
    return undefined;
  };

  const selectedValue = extractValue(rawValue) as { value: string } | undefined;
  const resolvedValue = selectedValue?.value;

  const subfieldsToRender = (resolvedValue && conditionalField[resolvedValue]) ? (conditionalField[resolvedValue] as FieldValue[]).map(
    (subField: FieldValue) => subField?.fieldName,
  ) : [];

  /**
   * Sub field / Slave fields logic
   */
  const subFieldsList = useFieldsData({
    listName,
    fieldsToRender: subfieldsToRender,
    notToRenderFields: ["name"],
    itemId,
  });

  let subFieldsCreateList: CreateItemHookResult | undefined;
  if (subFieldsList?.list) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    subFieldsCreateList = useCreateItem(subFieldsList?.list as never, true);
  }

  const handleOnChangeMasterField = (newValue: (value: TValue) => TValue) => {
    if (itemId) {
      conditionalFieldList.onFieldChange(newValue);
    } else {
      createConditionalItems?.props?.onChange(newValue);
    }
    // Pass the form value to the parent for future usage in update / create
    onCreateConditionalItemsChange(newValue);
  };

  const handleOnChangeSlaveField = (newValue: (value: TValue) => TValue) => {
    if (itemId) {
      subFieldsList.onFieldChange(newValue);
    } else {
      subFieldsCreateList?.props?.onChange(newValue);
    }

    // Pass the form value to the parent for future usage in update / create
    onSubFieldListChange(newValue);
  };

  useEffect(() => {
    // Provide reset state to patent component if it's edit form
    if (itemId) {
      setResetStates?.([
        conditionalFieldList.resetState,
        subFieldsList.resetState,
      ]);
    }
  }, []);

  // Edit Forn
  if (itemId)
    return (
      <>
        <Fields
          {...conditionalFieldList.list}
          fieldModes={conditionalFieldList.fieldModes}
          key={`${conditionalFieldList.list.key} conditional`}
          value={conditionalFieldList.fieldsValue}
          forceValidation={conditionalFieldList.forceValidation}
          invalidFields={conditionalFieldList.invalidFields}
          onChange={handleOnChangeMasterField}
        />
        {subfieldsToRender?.length ? (
          <Fields
            {...subFieldsList.list}
            fieldModes={subFieldsList.fieldModes}
            key={`${subFieldsList.list.key} subfield`}
            value={subFieldsList.fieldsValue}
            forceValidation={subFieldsList.forceValidation}
            invalidFields={subFieldsList.invalidFields}
            onChange={handleOnChangeSlaveField}
          />
        ) : null}
      </>
    );

  // Create Form
  return (
    <ThemeProvider>
      {createConditionalItems?.props && (
        <Fields
          {...createConditionalItems.props}
          fields={createConditionalItems.props.fields || {}}
          value={createConditionalItems.props.value || {}}
          forceValidation={createConditionalItems.props.forceValidation || false}
          invalidFields={createConditionalItems.props.invalidFields || new Set()}
          onChange={handleOnChangeMasterField}
        />
      )}
      {subfieldsToRender?.length ? (
        <Fields
          {...subFieldsCreateList?.props}
          fields={subFieldsCreateList?.props?.fields || {}}
          value={subFieldsCreateList?.props?.value || {}}
          forceValidation={subFieldsCreateList?.props?.forceValidation || false}
          invalidFields={subFieldsCreateList?.props?.invalidFields || new Set()}
          onChange={handleOnChangeSlaveField}
        />
      ) : null}
    </ThemeProvider>
  );
};

export { ConditionalField };
export type { TConditionalField };
