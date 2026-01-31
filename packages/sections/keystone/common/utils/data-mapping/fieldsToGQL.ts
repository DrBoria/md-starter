import type { FieldMeta } from "@keystone-6/core/types";

type TFeildsToGQL = Record<string, FieldMeta>;

export const fieldsToGQL = (fields: TFeildsToGQL) => {
  return Object.entries(fields)
    .filter(([fieldKey, field]) => {
      if (fieldKey === "id") return true;
      return field.itemView.fieldMode !== "hidden";
    })
    .map(([fieldKey]) => {
      return fields[fieldKey].controller.graphqlSelection;
    })
    .join("\n");
};
