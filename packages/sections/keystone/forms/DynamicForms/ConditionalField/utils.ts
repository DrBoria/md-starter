import type { DeserializedValue } from "@keystone-6/core/admin-ui/utils";

import type { TConditionalField } from ".";

const getConditionalSubFieldsdNames = (
  conditionalField?: TConditionalField,
  value?: string,
) => {
  if (!conditionalField || !value || !conditionalField[value]?.length)
    return [];
  // @ts-ignore - TODO: fix after removing string from type
  return conditionalField[value].map((subField) => subField.fieldName);
};

const getAllConditionalFieldsNames = (
  conditionalFields?: TConditionalField[],
): string[] => {
  if (!conditionalFields?.length) return [];

  const fieldNamesList: string[] = [];
  conditionalFields.forEach((conditionalField) => {
    fieldNamesList.push(conditionalField.fieldName); // Name of the conditional master field

    // Collect subfield names
    Object.values(conditionalField).forEach((subFields) => {
      if (Array.isArray(subFields)) {
        subFields.forEach((subField) => {
          if (subField?.fieldName) {
            fieldNamesList.push(subField.fieldName); // Store subfield name
          }
        });
      }
    });
  });

  return fieldNamesList;
};

const clearSubFieldValues = (obj: DeserializedValue): DeserializedValue => {
  // Iterate over all keys in the object
  for (const key in obj) {
    if (obj[key].kind === "value") {
      // Set the value field to null if kind === 'value'
      obj[key].value = "";
    }
  }

  return obj;
};

export {
  getConditionalSubFieldsdNames,
  getAllConditionalFieldsNames,
  clearSubFieldValues,
};
