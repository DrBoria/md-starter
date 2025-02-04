import type { ITabs } from ".";

const getAllTabsFieldsNames = (
  tabs?: ITabs & { checkboxFieldName?: string },
): string[] => {
  if (!tabs) return [];

  const fieldNamesList: string[] = [];

  // If checkboxFieldName provided - it's used as field name
  if (tabs.checkboxFieldName) {
    fieldNamesList.push(tabs.checkboxFieldName);
  }

  // Extract all the field names from tabsContent
  Object.values(tabs.tabsContent).forEach((fields) => {
    fieldNamesList.push(...fields);
  });

  return fieldNamesList;
};

export { getAllTabsFieldsNames };
