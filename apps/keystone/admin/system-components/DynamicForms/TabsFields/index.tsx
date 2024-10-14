import React, { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { Fields } from "@keystone-6/core/admin-ui/utils";

import { TValue } from "../../../../types";
import { Tabs } from "@md/components";
import { useCreateItem } from "../../utils/useCreateItem";
import { useFieldsData } from "../../utils/useFieldsData";

export interface ITabs {
  // Names / Buttons that will be displayed to switch tabs
  tabNames: string[];
  // Content of the tabs - map the tab name and array of fields, that should be displayed in this tab
  tabsContent: Record<string, string[]>;
}

type TOnChangeTabValue = (newValue: (newValue: TValue) => void) => void;

interface ITabsFields {
  listName: string;
  // action that will be triggered once we change tab from one to another
  onTabsFieldChange: Dispatch<
    SetStateAction<null | ((newValue: TValue) => void)>
  >; // New prop
  // name and content of the tabs
  tabs?: ITabs;
  // Function that will be triggered to pass reset functions to the parrent component
  setResetStates?: (funcs: (() => void)[] | undefined) => void;
  // Id of item you'd like to display in edit form
  itemId?: string;
  onTabChange?: () => void;
}

const TabsFields = ({
  listName,
  tabs,
  onTabsFieldChange,
  setResetStates,
  itemId,
  onTabChange,
}: ITabsFields) => {
  const fieldsData = tabs?.tabNames.map((tabName) => {
    return useFieldsData({
      listName,
      fieldsToRender: tabs.tabsContent[tabName],
      notToRenderFields: ["name"],
      itemId, // Pass itemId when available
    });
  });

  const createItems = itemId
    ? fieldsData // Edit mode: no need for useCreateItem in edit mode
    : fieldsData?.map((fieldData) => useCreateItem(fieldData.list, true)); // Create mode

  const listFormGroups = useMemo(() => {
    if (!tabs) return [];

    return tabs.tabNames.map((tabName, index) => {
      return {
        list: tabName,
        createItem: createItems?.[index],
        fieldsValue: fieldsData?.[index]?.fieldsValue,
        fieldModes: fieldsData?.[index]?.fieldModes,
        forceValidation: fieldsData?.[index]?.forceValidation,
        invalidFields: fieldsData?.[index]?.invalidFields,
      };
    });
  }, [tabs, createItems]);

  useEffect(() => {
    if (itemId) {
      // Provide reset state to the parent component if it's in edit form
      setResetStates &&
        setResetStates(fieldsData?.map((fieldData) => fieldData.resetState));
    }
  }, [itemId]);

  const handleOnChange =
    (changeFunction: TOnChangeTabValue) =>
    (newValue: (newValue: TValue) => void) => {
      changeFunction(newValue);
      // Pass the form value to the parent for future usage in update
      onTabsFieldChange(newValue);
    };

  if (!listFormGroups?.length) return null;

  return (
    <Tabs
      onTabChange={onTabChange}
      tabs={listFormGroups.map((fieldGroup, index) => ({
        label: fieldGroup.list,
        content:
          itemId && fieldsData ? (
            // Edit Form
            <Fields
              {...fieldsData[index].list}
              fieldModes={fieldGroup.fieldModes}
              key={`${fieldGroup.list} edit-tab`}
              value={fieldGroup.fieldsValue as TValue}
              forceValidation={fieldGroup.forceValidation as boolean}
              invalidFields={fieldGroup.invalidFields as ReadonlySet<string>}
              onChange={handleOnChange(
                fieldsData[index].onFieldChange as TOnChangeTabValue,
              )}
            />
          ) : (
            // Create Form
            fieldGroup?.createItem && (
              <Fields
                // @ts-ignore - ts(2339) - props exists, error happens cause createItems could be with and without useCreateItem depending on passed or not itemId
                {...fieldGroup.createItem.props}
                onChange={handleOnChange(
                  // @ts-ignore same here
                  fieldGroup?.createItem?.props.onChange,
                )}
              />
            )
          ),
      }))}
    />
  );
};

export { TabsFields };
