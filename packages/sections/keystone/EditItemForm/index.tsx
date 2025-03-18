import React, { useState } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";

import { useFieldsData } from "../utils/useFieldsData";

import "./index.css";

import { useRouter } from "next/router";

import type { TValue } from "../../../types";
import type { TConditionalField } from "../ConditionalField";
import type { ITabs } from "../DynamicForms/TabsFields";
import type { ISerializedValue } from "../utils/data-mapping/getDeserializedValue";
import { toKebabCase } from "@md/utils";
import { useDeleteMutation } from "@md/api/graphql";
import { ConditionalField } from "../ConditionalField";
import {
  getAllConditionalFieldsNames,
  getConditionalSubFieldsdNames,
} from "../ConditionalField/utils";
import { TabsFields } from "../DynamicForms/TabsFields";
import { getDeserializedValue } from "../utils/data-mapping/getDeserializedValue";
import { ButtonGroup } from "./buttonGroup";
import { getAllTabsFieldsNames } from "../DynamicForms";
import { useMutation } from "@apollo/client";
import type { IModalButton} from "@md/components";
import { useLogger } from "@md/components";

interface IEditItemForm {
  listName: string;
  itemId: string;
  fieldsToRender?: null | string[] | string[][];
  notToRenderFields?: string[];
  ignoreValueFields?: string[];
  tabs?: ITabs;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
}

/**
 * @param {object} props
 * @property listName - name of shema / table that will be displayed
 * @property fieldsToRender - Fields can be grouped into arrays or passed as a single array. For string[][], the result will array of components grouped by fields within passed array. For filedToRender value [[]] we should render all fields, except passed. Use it when you want dynamically render fields listed in schema without direct mentioning
 * @property resetExternalField // If function passed - external field is dirty. Pass funciton that will reset dirty external field
 * @property buttons - provide custom view for the buttons with custom actions. Buttons with button name "submit", "delete", "reset" will receive callbacks as first parameter
 * @property ignoreValueFields - there will be no data sent on save for this values
 * @returns
 */
const EditItemForm = ({
  listName,
  itemId,
  fieldsToRender,
  tabs,
  conditionalFields,
  notToRenderFields = [],
  ignoreValueFields = [],
  buttons,
}: IEditItemForm) => {
  const [resetStatesConditional, setResetStatesConditional] = useState<
    (() => void)[]
  >([]);
  const [resetStatesTabs, setResetStatesTabs] = useState<(() => void)[]>();
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

  const { deleteMutation } = useDeleteMutation(listName, useMutation);

  const router = useRouter();
  const logger = useLogger();

  const allTabFieldNames = getAllTabsFieldsNames(tabs);
  const allConditionalFieldsNames =
    getAllConditionalFieldsNames(conditionalFields);

  const isArrayofArrays = Array.isArray(fieldsToRender?.[0]);

  // Handle multiple `fieldsToRender` groups if it's an array of arrays
  const fieldGroups = isArrayofArrays
    ? (fieldsToRender as string[][])
    : [fieldsToRender as string[]];

  const fieldsData = useFieldsData({
    listName,
    itemId,
  });

  const fieldsDataArray =
    fieldsToRender === null
      ? []
      : fieldGroups.map((groupFields, index) => {
          // For groupFields === [] we should render all fields, except passed
          // Use it when you want dynamically render fields listed in schema without direct mentioning
          if (Array.isArray(groupFields) && groupFields.length === 0) {
            const excludedFields = fieldGroups
              .filter((_, innerIndex) => innerIndex !== index)
              .flat(); // Exclude the current group

            return useFieldsData({
              listName,
              itemId,
              notToRenderFields: [
                ...allConditionalFieldsNames,
                ...allTabFieldNames,
                ...notToRenderFields,
                ...ignoreValueFields,
                ...excludedFields,
              ],
            });
          }

          // For non-empty groupFields, pass them as fieldsToRender
          return useFieldsData({
            listName,
            itemId,
            fieldsToRender: groupFields,
            notToRenderFields: [
              ...allConditionalFieldsNames,
              ...allTabFieldNames,
              ...notToRenderFields,
              ...ignoreValueFields,
            ],
          });
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

  const handleOnUpdate = async () => {
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
          masterFieldSerializedValue as unknown as ISerializedValue,
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
          // For ignored fields we shouldnt set any values (for example Virtual fiield)
          if (ignoreValueFields.includes(subfieldName)) return;
          conditionalFieldsValues[subfieldName] = "";
        });

        // If user changed fields
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
      for (const [key, value] of Object.entries(tabsList)) {
        if (key === "id") continue;
        tabFieldsValues[key] = getDeserializedValue(value as ISerializedValue);
      }
    }

    // Here we update all at once to create one version of writer
    const updatedData = await fieldsData.onUpdate({
      ...conditionalFieldsValues,
      ...tabFieldsValues,
    });

    makeStatePersist();
    await Promise.all(fieldsDataArray.map(({ refetch }) => refetch()));
    return updatedData;
  };

  const makeStatePersist = () => {
    // Clear state in all sub forms to make them pristine
    setCreateConditionalItems(null);
    setSubFieldList(null);
    setTabsList(null);
  };

  const resetAllState = () => {
    fieldsData.resetState();
    makeStatePersist();
    resetStatesConditional.forEach((reset) => reset());
    resetStatesTabs?.forEach((reset) => reset());
  };

  const handleDeleteItem = async () => {
    try {
      const { data } = await deleteMutation([itemId]);

      // @ts-ignore items exists
      if (data?.items.length) {
        logger.add({
          tone: "positive",
          title: "Deleted Successfully",
        });
        return await router.push(`/${toKebabCase(listName)}s`);
      }
    } catch (error) {
      logger.add({
        tone: "negative",
        title: "Failed Update",
      });
      console.error(`Error deleting ${listName}:`, error);
    }
  };

  const isPristine =
    !fieldsData.changedFieldsList.length &&
    !tabsList &&
    !subFieldList &&
    !createConditionalItems;

  const components = [
    // fieldsToRender
    ...fieldsDataArray.map(({ list }, index) => {
      const renderedFields = Object.keys(list.fields);
      const hiddenFields = Object.entries(fieldsData.fieldModes)
        .filter(([_, value]) => value === "hidden")
        .map(([key]) => key);
      // By defailt renderedFields got ID
      hiddenFields.push("id");

      const areAllHidden = renderedFields.every((field) =>
        hiddenFields.includes(field),
      );
      // If all rendered fields is hidden - we should return null, but not empty div (<Filds>)
      if (areAllHidden) return null;

      // Create an ordered fields object that maintains the original order
      const orderedFields = renderedFields.reduce<
        Record<string, (typeof list.fields)[keyof typeof list.fields]>
      >((acc, fieldName) => {
        if (list.fields[fieldName]) {
          acc[fieldName] = list.fields[fieldName];
        }
        return acc;
      }, {});

      return (
        <Fields
          key={`edit-fields-group-${index}`}
          fields={orderedFields}
          fieldModes={fieldsData.fieldModes}
          value={fieldsData.fieldsValue}
          groups={list.groups}
          forceValidation={fieldsData.forceValidation}
          invalidFields={fieldsData.invalidFields}
          onChange={fieldsData.onFieldChange}
        />
      );
    }),

    // conditionalFields
    conditionalFields?.map((conditionalField) => (
      <ConditionalField
        key={`${conditionalField.fieldName}-conditional-edit-field`}
        itemId={itemId}
        listName={listName}
        setResetStates={setResetStatesConditional}
        conditionalField={conditionalField}
        onSubFieldListChange={setSubFieldList} // Pass callback for subFieldList / Slave fields
        onCreateConditionalItemsChange={setCreateConditionalItems} // Pass callback for conditional field / Master field
      />
    )),

    // tabs
    tabs && (
      <TabsFields
        key="edit-tabs-fields"
        itemId={itemId}
        setResetStates={setResetStatesTabs}
        onTabsFieldChange={setTabsList}
        listName={listName}
        tabs={tabs}
      />
    ),

    // buttons
    <ButtonGroup
      key="edit-button-group"
      isPristine={isPristine}
      listName={listName}
      onUpdate={handleOnUpdate}
      onReset={resetAllState}
      onDelete={handleDeleteItem}
      buttons={buttons}
    />,
  ];

  return components;
};

export { EditItemForm };
