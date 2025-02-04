import React, { useEffect } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";

import type { TValue } from "../../../types";
import type { CreateItemHookResult } from "../utils/useCreateItem";
import { useCreateItem } from "../utils/useCreateItem";
import { useFieldsData } from "../utils/useFieldsData";

interface FieldValue {
  fieldName: string;
}

export interface TConditionalField {
  fieldName: string;
  [key: string]: FieldValue[] | string; // TODO: find a way to remove | string type
}

interface IConditionalFieldProps {
  listName: string;
  conditionalField: TConditionalField;
  // Use it to get values of master field
  // @ts-ignore - TODO: add types for createConditionalItems
  onCreateConditionalItemsChange: (createConditionalItems) => void;
  // Use it to get values of slave fields
  // @ts-ignore - TODO: add types for subFieldsCreateList
  onSubFieldListChange: (subFieldsCreateList) => void;
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
  let createConditionalItems: CreateItemHookResult,
    subFieldsCreateList: CreateItemHookResult;
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
    createConditionalItems = useCreateItem(conditionalFieldList.list, true);
  }
  const selectedValue = itemId
    ? // @ts-ignore
      conditionalFieldList.fieldsValue?.[conditionalField.fieldName]?.value
        ?.value?.value
    : // @ts-ignore - typescript didn't see if on row with "if (!itemId) {"
      createConditionalItems?.props?.value?.[conditionalField.fieldName]?.value
        ?.value?.value;

  // @ts-ignore - TODO: fix after removing string from type
  const subfieldsToRender = conditionalField[selectedValue]?.map(
    (subField: FieldValue) => subField?.fieldName,
  );

  /**
   * Sub field / Slave fields logic
   */
  const subFieldsList = useFieldsData({
    listName,
    fieldsToRender: subfieldsToRender,
    notToRenderFields: ["name"],
    itemId,
  });

  if (!itemId) {
    // useCreateItem is only for Create Form
    subFieldsCreateList = useCreateItem(subFieldsList?.list, true);
  }

  const handleOnChangeMasterField = (newValue: (value: TValue) => TValue) => {
    if (itemId) {
      conditionalFieldList.onFieldChange(newValue);
    } else {
      createConditionalItems.props.onChange(newValue);
    }
    // Pass the form value to the parent for future usage in update / create
    onCreateConditionalItemsChange(newValue);
  };

  const handleOnChangeSlaveField = (newValue: (value: TValue) => TValue) => {
    if (itemId) {
      subFieldsList.onFieldChange(newValue);
    } else {
      // @ts-ignore - typescript didn't see if on line above with 'if (!itemId) {'
      subFieldsCreateList.props.onChange(newValue);
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
    <>
      <Fields
        // @ts-ignore typescript didn't see if on row above with 'if (itemId)'
        {...createConditionalItems.props}
        onChange={handleOnChangeMasterField}
      />
      {subfieldsToRender?.length ? (
        <Fields
          // @ts-ignore typescript didn't see if on row above with 'if (itemId)'
          {...subFieldsCreateList.props}
          onChange={handleOnChangeSlaveField}
        />
      ) : null}
    </>
  );
};

export { ConditionalField };
