import type { FieldMeta } from "@keystone-6/core/types";

interface IDefaultValue {
  id?: unknown;
  value?: string | { dateValue: unknown };
  inner?: {
    value?: string;
  };
}

type FieldType =
  | "boolean"
  | "number"
  | "string"
  | "object"
  | "date"
  | "relation"
  | "unknown";

const getFieldType = (field: FieldMeta): FieldType => {
  const defaultValue = field.controller.defaultValue as IDefaultValue;

  if (typeof defaultValue === "boolean") {
    return "boolean";
  }

  if (typeof defaultValue?.value === "number") {
    return "number";
  }

  if (
    typeof defaultValue === "string" ||
    typeof defaultValue?.value === "string" ||
    typeof defaultValue?.inner?.value === "string"
  ) {
    return "string";
  }

  if (typeof defaultValue?.value?.dateValue === "object") {
    return "date";
  }

  if (typeof defaultValue?.id === "object") {
    return "relation";
  }

  return "unknown";
};

export { getFieldType };
