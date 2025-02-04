import React, { useState } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";

import { useRouter } from "next/router";

import type { TValue } from "../../../types";
import type { IModalButton, TSideBarModalData } from "../../state";
import type { TConditionalField } from "../ConditionalField";
import type { ITabs } from "../TabsFields";
import type { ISerializedValue } from "../utils/data-mapping/getDeserializedValue";
import { SideBarModalData, useGlobalVariable } from "../../state";
import { ConditionalField } from "../ConditionalField";
import {
  getAllConditionalFieldsNames,
  getConditionalSubFieldsdNames,
} from "../ConditionalField/utils";
import { TabsFields } from "../TabsFields";
import { getAllTabsFieldsNames } from "../TabsFields/utils";
import { getDeserializedValue } from "../utils/data-mapping/getDeserializedValue";
import { getNotDisplayedDefaultValues } from "../utils/data-mapping/getNonDisplayedDefaultValues";
import { useCreateItem } from "../utils/useCreateItem";
import { useFieldsData } from "../utils/useFieldsData";
import { ButtonGroup } from "./buttonGroup";

export interface ICreateItemForm {
  listName: string;
  forceValidation?: boolean;
  fieldsToRender?: string[] | string[][];
  notToRenderFields?: string[];
  tabs?: ITabs;
  conditionalFields?: TConditionalField[];
  // TODO: add default fields in tabs and conditional fields
  defaultValues?: Record<string, unknown>;
  buttons?: IModalButton[];
  redirectPrefix?: string;
}

/**
 * @param {object} props
 * @property listName - name of shema / table that will be displayed
 * @property fieldsToRender - Fields can be grouped into arrays or passed as a single array. For string[][], the result will array of components grouped by fields within passed array. For filedToRender value [[]] we should render all fields, except passed. Use it when you want dynamically render fields listed in schema without direct mentioning
 * @property buttons - provide custom view for the buttons with custom actions. Buttons with button name "submit", "delete", "reset" will receive callbacks as first parameter
 * @returns
 */
const CreateItemForm = ({
  listName,
  fieldsToRender = [],
  conditionalFields,
  notToRenderFields = [],
  defaultValues,
  tabs,
  buttons,
  redirectPrefix,
}: ICreateItemForm) => {
  const router = useRouter();
  const allTabFieldNames = getAllTabsFieldsNames(tabs);
  const allConditionalFieldsNames =
    getAllConditionalFieldsNames(conditionalFields);

  // Used just to hide side bar modal after element creation
  const [_, setSideBarModalData] = useGlobalVariable<TSideBarModalData>(
    SideBarModalData,
    "SideBarModalData",
  );

  const isArrayofArrays = Array.isArray(fieldsToRender?.[0]);

  // Handle multiple `fieldsToRender` groups if it's an array of arrays
  const fieldGroups = isArrayofArrays
    ? (fieldsToRender as string[][])
    : [fieldsToRender as string[]];

  const fieldsData = useFieldsData({
    listName,
    notToRenderFields: [
      ...allConditionalFieldsNames,
      ...allTabFieldNames,
      ...notToRenderFields,
    ],
  });
  const createItem = useCreateItem(fieldsData.list, false, defaultValues);

  const fieldsDataArray = fieldGroups.map((groupFields, index) => {
    // For groupFields === [] we should render all fields, except passed
    // Use it when you want dynamically render fields listed in schema without direct mentioning
    if (Array.isArray(groupFields) && groupFields.length === 0) {
      const excludedFields = fieldGroups
        .filter((_, innerIndex) => innerIndex !== index)
        .flat(); // Exclude the current group

      return useFieldsData({
        listName,
        notToRenderFields: [
          ...allConditionalFieldsNames,
          ...allTabFieldNames,
          ...notToRenderFields,
          ...excludedFields,
        ],
      });
    }

    // For non-empty groupFields, pass them as fieldsToRender
    return useFieldsData({
      listName,
      fieldsToRender: groupFields,
      notToRenderFields: [
        ...allConditionalFieldsNames,
        ...allTabFieldNames,
        ...notToRenderFields,
      ],
    });
  });

  /**
   * State for Conditional Fields
   * Use it for create operation
   */
  const [subFieldList, setSubFieldList] = useState(null);
  const [createConditionalItems, setCreateConditionalItems] = useState(null);

  /**
   * State for Tabs Fields
   * Use it for create operation
   */
  const [tabsList, setTabsList] = useState<((newValue: TValue) => void) | null>(
    null,
  );

  const handleCreateClick = async () => {
    /**
     * Conditional Field
     * Read values set in external component to pass in global creation function
     */
    const conditionalFieldsValues: Record<string, unknown> = {};
    if (conditionalFields) {
      // Get value of master field
      conditionalFields.forEach((masterField) => {
        const masterFieldValue = getDeserializedValue(
          createConditionalItems?.[
            masterField.fieldName
          ] as unknown as ISerializedValue,
        );

        // Set value for master field
        if (masterFieldValue) {
          const conditionalSubfieldNames = getConditionalSubFieldsdNames(
            masterField,
            masterFieldValue,
          );
          conditionalFieldsValues[masterField.fieldName] = masterFieldValue;

          // Set value for every subfield
          if (subFieldList) {
            conditionalSubfieldNames.forEach((subfieldName: string) => {
              conditionalFieldsValues[subfieldName] = getDeserializedValue(
                subFieldList[subfieldName],
              );
            });
          }
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
        tabFieldsValues[key] = getDeserializedValue(value as ISerializedValue);
      }
    }

    // if it's array of arrays - make it flat array
    const flattenedFieldsToRender = Array.isArray(fieldsToRender)
      ? fieldsToRender.flat()
      : [];

    return await createItem.create({
      // Here we add default fields, that wasn't shwn to the user, but was provided with default value
      ...getNotDisplayedDefaultValues(
        [
          ...flattenedFieldsToRender,
          ...allTabFieldNames,
          ...allConditionalFieldsNames,
        ],
        defaultValues,
      ),
      ...conditionalFieldsValues!,
      ...tabFieldsValues!,
    });
  };

  const handleSubmit = async () => {
    return await handleCreateClick();
  };

  const components = [
    // fieldsToRender
    ...fieldsDataArray.map(({ list }, index) => {
      const renderedFields = Object.keys(list.fields);
      const hiddenFields = Object.entries(createItem?.props?.fieldModes || {})
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
          key={`create-fields-group-${list.key}-${index}`}
          fields={orderedFields}
          fieldModes={createItem.props.fieldModes}
          value={createItem.props.value}
          groups={list.groups}
          forceValidation={createItem.props.forceValidation}
          invalidFields={createItem.props.invalidFields}
          onChange={createItem.props.onChange}
        />
      );
    }),

    // conditionalFields
    conditionalFields?.map((conditionalField, index) => (
      <ConditionalField
        key={`${conditionalField.fieldName}-conditional-creation-field-${index}`}
        listName={listName}
        conditionalField={conditionalField}
        onSubFieldListChange={setSubFieldList} // Pass callback for subFieldList / Slave fields
        onCreateConditionalItemsChange={setCreateConditionalItems} // Pass callback for conditional field / Master field
      />
    )),

    // tabs
    tabs && (
      <TabsFields
        key="tabs-fields"
        onTabsFieldChange={setTabsList}
        listName={listName}
        tabs={tabs}
      />
    ),

    // buttons
    <ButtonGroup
      key="create-button-group"
      state={createItem.state}
      singular={fieldsData.list.singular}
      handleSubmit={handleSubmit}
      onSubmit={async () => {
        const item = await handleCreateClick();

        if (item) {
          setSideBarModalData(null);
          await router.push(
            `/${redirectPrefix || fieldsData.list.path}/${item.id}`,
          );
        }
      }}
      buttons={buttons}
    />,
  ];

  return components;
};

export { CreateItemForm };
