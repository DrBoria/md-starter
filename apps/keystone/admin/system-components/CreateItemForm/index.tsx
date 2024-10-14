import React, { useState } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";

import { Button } from "@md/components";

import { useRouter } from "next/router";

import { TValue } from "../../../types";
import {
  IModalButton,
  SideBarModalData,
  TSideBarModalData,
  useGlobalVariable,
} from "../../state";
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
import { getNotDisplayedDefaultValues } from "../utils/data-mapping/getNonDisplayedDefaultValues";
import { useCreateItem } from "../utils/useCreateItem";
import { useFieldsData } from "../utils/useFieldsData";

export interface ICreateItemForm {
  listName: string;
  forceValidation?: boolean;
  /** NOTE: you need to include all required fields. In other way keystone will not show error to user  */
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  tabs?: ITabs;
  conditionalFields?: TConditionalField[];
  // TODO: add default fields in tabs and conditional fields
  defaultValues?: Record<string, unknown>;
  buttons?: IModalButton[];
}

const CreateItemForm = ({
  listName,
  fieldsToRender = [],
  conditionalFields,
  notToRenderFields = [],
  defaultValues,
  tabs,
  buttons,
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

  const { list } = useFieldsData({
    listName,
    fieldsToRender,
    notToRenderFields: [
      ...allConditionalFieldsNames,
      ...allTabFieldNames,
      ...notToRenderFields!,
    ],
  });

  const createItem = useCreateItem(list, false, defaultValues);

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
          ] as unknown as ISerealizedValue,
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
        tabFieldsValues[key] = getDeserializedValue(value as ISerealizedValue);
      }
    }

    return await createItem.create({
      // Here we add default fields, that wasn't shwn to the user, but was provided with default value
      ...getNotDisplayedDefaultValues(
        [...fieldsToRender, ...allTabFieldNames, ...allConditionalFieldsNames],
        defaultValues,
      ),
      ...conditionalFieldsValues!,
      ...tabFieldsValues!,
    });
  };

  const handleSubmit = async () => {
    return await handleCreateClick();
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Fields {...createItem.props} />

      {/* Conditional / Master-Slave fields */}
      {conditionalFields?.map((conditionalField) => (
        <ConditionalField
          listName={listName}
          conditionalField={conditionalField}
          onSubFieldListChange={setSubFieldList} // Pass callback for subFieldList / Slave fields
          onCreateConditionalItemsChange={setCreateConditionalItems} // Pass callback for conditional field / Master field
        />
      ))}

      {/* Tabs */}
      {tabs && (
        <TabsFields
          onTabsFieldChange={setTabsList}
          listName={listName}
          tabs={tabs}
        />
      )}

      <div className="flex justify-between">
        {/* Submit - Is required action. If it's not set manually - we need to render it ourselves */}
        {!buttons && (
          <Button
            isLoading={createItem.state === "loading"}
            weight="bold"
            tone="active"
            onClick={async () => {
              const item = await handleCreateClick();

              if (item) {
                setSideBarModalData(null);
                await router.push(`/${list.path}/${item.id}`);
              }
            }}
          >
            Create {list.singular}
          </Button>
        )}

        {/* Render buttons passed from actions */}
        {buttons?.map((button) => {
          if (button.name === "submit") {
            return button.view(handleSubmit, createItem.state === "loading");
          }
          return button.view();
        })}
      </div>
    </div>
  );
};

export { CreateItemForm };
