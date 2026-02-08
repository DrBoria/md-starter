import type { FieldMeta } from "@keystone-6/core/types";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";
import type { TValue } from "@md/types";
import { toKebabCase } from "@md/utils";
import { useDeleteMutation } from "@md/api/graphql";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useLogger } from "@md/components/keystone";
import type { IModalButton } from "@md/components";

import type { TConditionalField } from "@md/sections/keystone/forms/DynamicForms";
import type { ITabs } from "@md/sections/keystone/forms/DynamicForms/TabsFields";
import type { ISerializedValue } from "@md/sections/keystone/common/utils/data-mapping/getDeserializedValue";

import { useFieldsData } from "@md/sections/keystone/common/utils/useFieldsData";
import { ConditionalField } from "@md/sections/keystone/forms/DynamicForms/ConditionalField";
import { getAllConditionalFieldsNames, getConditionalSubFieldsdNames } from "@md/sections/keystone/forms/DynamicForms/ConditionalField/utils";
import { TabsFields } from "@md/sections/keystone/forms/DynamicForms/TabsFields";
import { getAllTabsFieldsNames } from "@md/sections/keystone/forms/DynamicForms/TabsFields/utils";
import { getDeserializedValue } from "@md/sections/keystone/common/utils/data-mapping/getDeserializedValue";

import { ButtonGroup } from "./buttonGroup";

import "./index.css";

interface IEditItemFormProps {
  listName: string;
  itemId: string;
  fieldsToRender?: string[] | string[][];
  tabs?: ITabs;
  conditionalFields?: TConditionalField[];
  notToRenderFields?: string[];
  ignoreValueFields?: string[];
  buttons?: IModalButton[];
}


const EditItemForm = ({
  listName,
  itemId,
  fieldsToRender,
  tabs,
  conditionalFields,
  notToRenderFields = [],
  ignoreValueFields = [],
  buttons,
}: IEditItemFormProps) => {
  const [resetStatesConditional, setResetStatesConditional] = useState<(() => void)[]>([]);
  const [resetStatesTabs, setResetStatesTabs] = useState<(() => void)[]>();
  /**
   * State for Conditional Fields
   * Use it for create operation
   */
  const [createConditionalItems, setCreateConditionalItems] = useState<TValue>({});
  const [subFieldList, setSubFieldList] = useState<TValue>({});
  /**
   * State for Tabs Fields
   * Use it for create operation
   */
  const [tabsList, setTabsList] = useState<TValue>({});

  const { deleteMutation } = useDeleteMutation(listName, useMutation);

  const router = useRouter();
  const logger = useLogger();

  const allTabFieldNames = getAllTabsFieldsNames(tabs);
  const allConditionalFieldsNames =
    getAllConditionalFieldsNames(conditionalFields);

  const isArrayofArrays = Array.isArray(fieldsToRender?.[0]);

  // Handle multiple `fieldsToRender` groups if it's an array of arrays
  const fieldGroups = isArrayofArrays
    ? fieldsToRender
    : [fieldsToRender];

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
              ...(allConditionalFieldsNames || []),
              ...(allTabFieldNames || []),
              ...(notToRenderFields || []),
              ...(ignoreValueFields || []),
              ...excludedFields,
            ] as string[],
          });
        }

        // For non-empty groupFields, pass them as fieldsToRender
        return useFieldsData({
          listName,
          itemId,
          fieldsToRender: groupFields as string[],
          notToRenderFields: ([
            ...(notToRenderFields || []),
            ...(allConditionalFieldsNames || []),
            ...(allTabFieldNames || []),
          ] as string[]).flat(),
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
          (notRenderedFieldValues?.[masterField.fieldName] as ISerializedValue);
        const masterFieldValue = getDeserializedValue(
          masterFieldSerializedValue as ISerializedValue,
        );

        const conditionalSubfieldNames = getConditionalSubFieldsdNames(
          masterField,
          masterFieldValue as string,
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
          if ((ignoreValueFields as string[]).includes(subfieldName)) return;
          conditionalFieldsValues[subfieldName] = "";
        });

        // If user changed fields
        if (subFieldList) {
          // Set value for every Displayed subfield
          Object.keys(subFieldList).forEach((subfieldName) => {
            conditionalFieldsValues[subfieldName] = getDeserializedValue(
              subFieldList[subfieldName] as ISerializedValue,
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
    setCreateConditionalItems({});
    setSubFieldList({});
    setTabsList({});
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
      const orderedFields = renderedFields.reduce<Record<string, FieldMeta>>((acc, fieldName) => {
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
        onTabsFieldChange={setTabsList as Dispatch<SetStateAction<null | ((newValue: TValue) => void)>>}
        listName={listName}
        tabs={tabs}
      />
    ),

    // buttons
    <ButtonGroup
      key="edit-button-group"
      isPristine={!!isPristine}
      listName={listName}
      onUpdate={handleOnUpdate}
      onReset={resetAllState}
      onDelete={handleDeleteItem}
      buttons={buttons}
    />,
  ];

  return <>{components}</>;
};

export { EditItemForm };
export default EditItemForm;
