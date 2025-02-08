import type { FieldMeta } from "@keystone-6/core/types";
import { getFieldType } from "@md/api/graphql";

const getOptionsByFilterType = (selectedField: FieldMeta) => {
  const fieldType = getFieldType(selectedField); // Determine field type

  let options: { label: string; value: string }[] = [];

  if (fieldType === "string") {
    options = [
      { label: "Contains", value: "contains" },
      { label: "Not Contains", value: "not-contains" },
      { label: "Exactly", value: "is-exactly" },
      { label: "Not Exactly", value: "is-not-exactly" },
      { label: "Starts With", value: "starts-with" },
      { label: "Not Starts With", value: "not-starts-with" },
      { label: "Ends With", value: "ends-with" },
      { label: "Not Ends With", value: "not-ends-with" },
    ];
  } else if (fieldType === "boolean") {
    options = [
      { label: "Is", value: "is" },
      { label: "Is Not", value: "is-not" },
    ];
  } else if (fieldType === "select") {
    options = [
      { label: "Matches", value: "in" },
      { label: "Does not Match", value: "notIn" },
    ];
  } else if (fieldType === "relation") {
    options = [{ label: "Matches", value: "matches" }];
  } else if (fieldType === "number") {
    options = [
      { label: "Greater Than", value: "greater-than" },
      { label: "Less Than", value: "less-than" },
      { label: "Greater or Equal", value: "greater-equal" },
      { label: "Less or Equal", value: "less-equal" },
      { label: "Equals", value: "equals" },
      { label: "Not Equals", value: "not-equals" },
    ];
  }

  return options;
};

export { getOptionsByFilterType };
