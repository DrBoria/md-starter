import type { FieldMeta } from "@keystone-6/core/types";

interface IDefaultValue {
  id?: unknown;
  value?: string | { dateValue: unknown } | { value: string };
  inner?: {
    value?: string;
  };
}

type FieldType =
  | "boolean"
  | "number"
  | "string"
  | "select"
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

  // @ts-ignore - value with {value: string} related to select
  if (typeof defaultValue?.value?.value === "string") {
    return "select";
  }

  if (
    typeof defaultValue === "string" ||
    typeof defaultValue?.value === "string" ||
    typeof defaultValue?.inner?.value === "string"
  ) {
    return "string";
  }

  // @ts-ignore - value with {dateValue: string} related to data type
  if (typeof defaultValue?.value?.dateValue === "object") {
    return "date";
  }

  if (typeof defaultValue?.id === "object") {
    return "relation";
  }

  return "unknown";
};

export { getFieldType };
