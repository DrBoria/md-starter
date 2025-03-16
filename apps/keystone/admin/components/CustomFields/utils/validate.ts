export interface InitialValue {
  kind: "initial";
  isSet: boolean | null;
}

export interface EditingValue {
  kind: "editing" | "create";
  isSet: boolean | null;
  value: string;
  inner: { value: string };
  confirm: string;
}

export type Value = InitialValue | EditingValue;

export interface Validation {
  isRequired: boolean;
  rejectCommon: boolean;
  max?: number;
  min?: number;
  match: {
    regex: RegExp;
    explanation: string;
  } | null;
  length: {
    min: number;
    max: number | null;
  };
}

export const validate = (
  value: Value,
  validation: Validation,
  fieldLabel: string,
): string | undefined => {
  if (
    value.kind === "initial" &&
    (value.isSet === null || value.isSet === true)
  ) {
    return undefined;
  }
  if (value.kind === "initial" && validation?.isRequired) {
    return `${fieldLabel} is required`;
  }
  if (value.kind === "editing" && value.confirm !== value.value) {
    return `The passwords do not match`;
  }
  // Logic for create and editing is the same, difference in value location (inside inner or not)
  if (value.kind === "editing" || value.kind === "create" || !value.kind) {
    const val = value.kind === "editing" ? value.value : value.inner?.value;
    if (val?.length < validation?.length?.min) {
      if (validation.length.min === 1) {
        return `${fieldLabel} must not be empty`;
      }
      return `${fieldLabel} must be at least ${validation.length.min} characters long`;
    }
    if (validation?.max && validation?.max) {
      if (typeof value.value !== "number")
        return `${fieldLabel} field must be numeric`;
    }
    if (
      validation?.length?.max !== null &&
      val?.length > validation?.length?.max
    ) {
      return `${fieldLabel} must be no longer than ${validation.length.max} characters`;
    }
    if (validation.match && !validation.match.regex.test(val)) {
      return validation.match.explanation;
    }
  }
  return undefined;
};
