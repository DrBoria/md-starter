import React, { useState } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";

import { useFieldsData } from "../utils/useFieldsData";

import "./index.css";

import { useRouter } from "next/router";
import { useToasts } from "@keystone-ui/toast";

import { TValue } from "../../../types";
import { toKebabCase } from "../../../utils/toKebabCase";
import { IModalButton } from "../../state";
import { useDeleteMutation } from "../../queries/useDeleteMutation";
import {
  ConditionalField, TConditionalField,
  getAllConditionalFieldsNames,
  getConditionalSubFieldsdNames,
} from "../DynamicForms";
import { ITabs, TabsFields, getAllTabsFieldsNames } from "../DynamicForms";
import {
  getDeserializedValue,
  ISerealizedValue,
} from "../utils/data-mapping/getDeserializedValue";
import { ButtonGroup } from "./buttonGroup";

interface IEditItemForm {
  listName: string;
  itemId: string;
  forceValidation?: boolean;
  /** NOTE: you need to fill or include all required fields. In other way keystone will not show error to user  */
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  tabs?: ITabs;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
}

const EditItemForm = ({
  listName,
  itemId,
  fieldsToRender,
  tabs,
  conditionalFields,
  notToRenderFields = [],
  buttons,
}: IEditItemForm) => {
  const [resetStatesConditional, setResetStatesConditional] = useState<
    (() => void)[]
  >([]);
  const [resetStatesTabs, setResetStatesTabs] = useState<
    (() => void)[] | undefined
  >([]);
  const router = useRouter();
  const toasts = useToasts();
  const allTabFieldNames = getAllTabsFieldsNames(tabs);
  const allConditionalFieldsNames =
    getAllConditionalFieldsNames(conditionalFields);

  const {
    list,
    resetState,
    fieldModes,
    fieldsValue,
    onFieldChange,
    onUpdate,
    invalidFields,
    changedFieldsList,
    forceValidation,
  } = useFieldsData({
    listName,
    itemId,
    fieldsToRender,
    notToRenderFields: [
      ...allConditionalFieldsNames,
      ...allTabFieldNames,
      ...notToRenderFields,
    ],
  });

  const { fieldsValue: notRenderedFieldValues } = useFieldsData({
    listName,
    itemId,
    fieldsToRender: [
      ...allConditionalFieldsNames,
      ...allTabFieldNames,
      ...notToRenderFields,
    ],
  });

  const { deleteMutation } = useDeleteMutation<{ items: { id: string }[] }>(
    listName,
  );

  /**
   * State for Conditional Fields
   * Use it for create operation
   */
  const [createConditionalItems, setCreateConditionalItems] = useState(null);
  const [subFieldList, setSubFieldList] = useState(null);

  /**
   * State for Tabs Fields
   * Use it for create operation
   */
  const [tabsList, setTabsList] = useState<((newValue: TValue) => void) | null>(
    null,
  );

  const hadnleOnUpdate = async () => {
    /**
     * Conditional Field
     * Read values set in external component to pass in global creation function
     */
    const conditionalFieldsValues: Record<string, unknown> = {};
    if (conditionalFields) {
      conditionalFields.forEach((masterField) => {
        // If user chose new value for conditional field - it will be storred in createConditionalItems, othervise - we will take previous value
        const masterFieldSerializedValue =
          createConditionalItems?.[masterField.fieldName] ||
          notRenderedFieldValues?.[masterField.fieldName];
        const masterFieldValue = getDeserializedValue(
          masterFieldSerializedValue as unknown as ISerealizedValue,
        );

        const conditionalSubfieldNames = getConditionalSubFieldsdNames(
          masterField,
          masterFieldValue,
        );
        conditionalFieldsValues[masterField.fieldName] = masterFieldValue;

        // Set default value for every NOT Displayed subfield (hidden = fields for different master fields value)
        const notDisplayedContidionalSubFieldNames =
          allConditionalFieldsNames.filter(
            (fieldName) =>
              fieldName !== masterField.fieldName &&
              !conditionalSubfieldNames.includes(fieldName),
          );
        notDisplayedContidionalSubFieldNames.forEach((subfieldName: string) => {
          conditionalFieldsValues[subfieldName] = "";
        });
        if (subFieldList) {
          // Set value for every Displayed subfield
          Object.keys(subFieldList).forEach((subfieldName: string) => {
            conditionalFieldsValues[subfieldName] = getDeserializedValue(
              subFieldList[subfieldName],
            );
          });
        }
      });
    }

    /**
     * Tab Field
     * Read values set in external component to pass in global creation function
     */
    const tabFieldsValues: Record<string, unknown> = {};
    if (tabs && tabsList) {
      for (const [key, value] of Object.entries(tabsList!)) {
        if (key === "id") continue;
        tabFieldsValues[key] = getDeserializedValue(value as ISerealizedValue);
      }
    }
    // Here we update all at once to create one version of writer
    const updatedData = await onUpdate({
      ...conditionalFieldsValues!,
      ...tabFieldsValues!,
    });

    return updatedData;
  };

  const makeStatePersist = () => {
    // Clear state in all sub forms to make them pristine
    setCreateConditionalItems(null);
    setSubFieldList(null);
    setTabsList(null);
  };

  const resetAllState = () => {
    resetState();

    // Make state pristing
    makeStatePersist();

    // Reset tabs and conditional field
    resetStatesConditional.forEach((reset) => reset());
    resetStatesTabs?.forEach((reset) => reset());
  };

  const handleDeleteItem = async () => {
    try {
      const { data } = await deleteMutation([itemId]);

      if (data?.items.length) {
        toasts.addToast({
          tone: "positive",
          title: "Deleted Successfully",
        });
        return await router.push(`/${toKebabCase(listName)}s`);
      }
    } catch (error: unknown) {
      toasts.addToast({
        tone: "negative",
        title: "Failed Update",
      });
      console.error(`Error deleting ${listName}:`, error);
    }
  };

  const isPristine =
    !changedFieldsList.length &&
    !tabsList &&
    !subFieldList &&
    !createConditionalItems;
  return (
    <div className="w-full flex flex-col gap-4">
      <Fields
        {...list}
        fieldModes={fieldModes}
        key={list.key}
        value={fieldsValue}
        forceValidation={forceValidation}
        invalidFields={invalidFields}
        onChange={onFieldChange}
      />

      {/* Conditional / Master-Slave fields */}
      {conditionalFields?.map((conditionalField) => (
        <ConditionalField
          itemId={itemId}
          listName={listName}
          setResetStates={setResetStatesConditional}
          conditionalField={conditionalField}
          onSubFieldListChange={setSubFieldList} // Pass callback for subFieldList / Slave fields
          onCreateConditionalItemsChange={setCreateConditionalItems} // Pass callback for conditional field / Master field
        />
      ))}

      {/* Tabs */}
      {tabs && (
        <TabsFields
          itemId={itemId}
          setResetStates={setResetStatesTabs}
          onTabsFieldChange={setTabsList}
          listName={listName}
          tabs={tabs}
        />
      )}

      <ButtonGroup
        isPristine={isPristine}
        listName={listName}
        onUpdate={hadnleOnUpdate}
        onReset={resetAllState}
        onDelete={handleDeleteItem}
        buttons={buttons}
      />
    </div>
  );
};

export { EditItemForm };
