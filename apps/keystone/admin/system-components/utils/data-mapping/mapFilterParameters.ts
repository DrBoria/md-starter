import { lowerCaseFirstLetter } from "../../../../utils/lowerCaseFirstLetter";
import { transformToReadableFormat } from "../../../../utils/transformToReadableFormat";
import { upperCaseFirstLetter } from "../../../../utils/upperCaseFirstLetter";

export type ConditionType =
  // TEXT
  | "contains"
  | "not-contains"
  | "is-exactly"
  | "is-not-exactly"
  | "starts-with"
  | "not-starts-with"
  // BOOLEAN
  | "is"
  | "is-not"
  // RELATION
  | "matches"
  // SELECT
  | "in"
  | "notIn"
  // NUMBER
  | "ends-with"
  | "not-ends-with"
  | "greater-than" // >
  | "less-than" // <
  | "less-equal" // >=
  | "greater-equal" // <=
  | "equals" // <=
  | "not-equals"; // <=

export type TCondition = {
  [key: string]: TCondition | ConditionType;
};

type ParsedResult = Record<string, string>;

export const conditionMappings: Record<string, ConditionType> = {
  contains_i: "contains",
  not_contains_i: "not-contains",
  is_i: "is-exactly",
  not_i: "is-not-exactly",
  starts_with_i: "starts-with",
  not_starts_with_i: "not-starts-with",
  ends_with_i: "ends-with",
  not_ends_with_i: "not-ends-with",
  in: "in",
  notIn: "notIn",
  matches: "matches",
  greater_than: "greater-than",
  less_than: "less-than",
  less_equal: "less-equal",
  greater_equal: "greater-equal",
  equals: "equals",
  not_equals: "not-equals",
  is: "is",
  is_not: "is-not",
};

export const pathConditionMapping: Record<string, string> = {
  startsWith: "starts_with",
  endsWith: "ends_with",
  gte: "greater_equal",
  lte: "less_equal",
  lt: "less_than",
  gt: "greater_than",
};

export const conditionToPathMapping: Record<string, string> = {
  contains: "contains_i",
  "not-contains": "not_contains_i",
  "is-exactly": "is_i",
  "is-not-exactly": "not_i",
  "starts-with": "starts_with_i",
  "not-starts-with": "not_starts_with_i",
  "ends-with": "ends_with_i",
  "not-ends-with": "not_ends_with_i",
  in: "in",
  notIn: "notIn",
  matches: "matches",
  "greater-than": "greater_than",
  "less-than": "less_than",
  "less-equal": "less_equal",
  "greater-equal": "greater_equal",
  equals: "equals",
  "not-equals": "not_equals",
  is: "is",
  "is-not": "is_not",
};

export const conditionMappingFunctions: Record<
  ConditionType,
  (value: string) => unknown
> = {
  contains: (value) => ({ contains: value }),
  ["not-contains"]: (value) => ({ not: { contains: value } }),
  ["is-exactly"]: (value) => ({ equals: value }),
  ["is-not-exactly"]: (value) => ({ not: { equals: value } }),
  ["starts-with"]: (value) => ({ startsWith: value }),
  ["not-starts-with"]: (value) => ({ not: { startsWith: value } }),
  ["ends-with"]: (value) => ({ endsWith: value }),
  ["not-ends-with"]: (value) => ({ not: { endsWith: value } }),
  is: () => ({ equals: true }),
  ["is-not"]: () => ({ equals: false }),
  matches: (value) => ({ id: { in: [value] } }),
  in: (value) => ({ in: [value] }),
  notIn: (value) => ({ not: { in: [value] } }),
  ["greater-than"]: (value) => ({ gt: Number(value) }),
  ["less-than"]: (value) => ({ lt: Number(value) }),
  ["less-equal"]: (value) => ({ lte: Number(value) }),
  ["greater-equal"]: (value) => ({ gte: Number(value) }),
  equals: (value) => ({ equals: Number(value) }),
  ["not-equals"]: (value) => ({ not: { equals: Number(value) } }),
};

// Parses the query and returns structured values for conditions and filter logic
const parseQuery = (query: Record<string, string>) => {
  const inputValues: Record<string, string> = {};
  const filterConditions: TCondition = {};
  const readableConditions: Record<string, string> = {};

  // Iterate through the query keys and values
  Object.entries(query).forEach(([key, value]) => {
    const normalizedKey = key.replace(/^!/, ""); // Remove "!"
    const parts = normalizedKey.split("_");
    const field = parts[0];
    const conditionKey = parts.slice(1).join("_");
    const condition = conditionMappings[conditionKey] as ConditionType;
    if (condition) {
      inputValues[field] = value.replace(/(^"|"$)/g, ""); // Remove quotes
      filterConditions[field] = condition;

      readableConditions[field] =
        `${transformToReadableFormat(field)} ${condition}: "${inputValues[field]}"`;
    }
  });

  return { inputValues, filterConditions, readableConditions };
};

// Parse the condition key into field and condition type
const parseConditionKey = (
  key: string,
): { field: string; condition: ConditionType | undefined } => {
  const normalizedKey = key.replace(/^!/, "");
  const parts = normalizedKey.split("_");
  const conditionKey = parts.slice(1).join("_");
  const field = parts[0];

  return {
    field,
    condition: conditionMappings[conditionKey] as ConditionType, // Return undefined if not found
  };
};

// Convert query parameters into a format suitable for GraphQL query generation
const pathToWhereParameters = (
  query?: Record<string, string>,
): Record<string, unknown> => {
  if (!query) return {};

  return Object.fromEntries(
    Object.entries(query)
      .filter(([key]) => key !== "search")
      .map(([key, value]) => {
        const { field, condition } = parseConditionKey(key);
        if (!condition || !conditionMappingFunctions[condition]) {
          console.error(`Unsupported key: ${key}`);
        }

        return [
          field,
          conditionMappingFunctions[condition!]?.(
            value?.replace(/(^"|"$)/g, ""),
          ),
        ];
      }),
  );
};
// Convert query parameters into a format suitable for GraphQL query generation
const pathToFilter = (
  query?: Record<string, string>,
): Record<string, unknown> => {
  if (!query) return {};

  return Object.fromEntries(
    Object.entries(query)
      .filter(([key]) => key !== "search")
      .map(([key, value]) => {
        const { field, condition } = parseConditionKey(key);
        return [
          field,
          { [condition as string]: value.replace(/(^"|"$)/g, "") },
        ];
      }),
  );
};

const filterToPath = (
  inputValues?: Record<string, unknown>,
  filterConditions?: TCondition,
): string => {
  if (!inputValues || !filterConditions) return "";

  return Object.keys(inputValues)
    .map((key) => {
      const value = inputValues[key];
      const valueKey = filterConditions[key];

      if (valueKey === undefined) return "";

      return `!${lowerCaseFirstLetter(key).replace(/\s+/g, "")}_${conditionToPathMapping[valueKey as string] || valueKey}="${value}"`;
    })
    .filter(Boolean) // Remove empty strings (if any)
    .join("&");
};

// Convert selected filters into GraphQL-compatible query parameters
const filterToWhereParameters = (
  input?: Record<string, string | undefined | null>,
  condition?: TCondition,
): Record<string, unknown> => {
  if (!input || !condition) return {};

  return Object.fromEntries(
    Object.entries(input)
      .filter(([key, value]) => {
        // Do not include if filter is not selected
        if (!condition[key]) return false;
        if (key === "search") return false;
        // Do not include if selected value is empty
        if (value !== "" && value !== undefined && value !== null) return true;
      })
      .map(([key, value]) => {
        // Map selected filter to GraphQL acceptable format
        return [
          lowerCaseFirstLetter(key)?.replace(" ", ""),
          conditionMappingFunctions[condition[key] as ConditionType]?.(value!),
        ];
      }),
  );
};

const whereParameterToCondition = (
  where: TCondition,
): Record<string, ConditionType> => {
  const filterConditions: Record<string, ConditionType> = {};
  const buildConditionKey = (
    obj: TCondition,
    keyPrefix: string,
  ): string | undefined => {
    for (const key in obj) {
      const value = obj[key];

      // If the value is an object, we recurse further
      if (typeof value === "object" && value !== null) {
        const result = buildConditionKey(value, `${keyPrefix}${key}_`);
        if (result) return result;
      } else if (typeof value === "string") {
        return `${keyPrefix}${pathConditionMapping[key] || key}`;
      }
    }
    return undefined;
  };

  Object.entries(where).forEach(([key, value]) => {
    // Build the condition key recursively
    const conditionKey = buildConditionKey(value as TCondition, "");

    if (conditionKey) {
      // If a valid condition key is found, map it to the corresponding condition type
      filterConditions[upperCaseFirstLetter(key)] = conditionMappings[
        conditionToPathMapping[conditionKey]
      ] as ConditionType;
    }
  });

  return filterConditions;
};

function whereParameterToInput(where: TCondition): ParsedResult {
  const result: ParsedResult = {};

  function process(obj: TCondition, parentKey: string | null = null) {
    for (const key in obj) {
      if (obj[key]) {
        const value = obj[key];

        if (key === "OR") continue;

        if (typeof value === "object" && value !== null) {
          process(value, parentKey || key);
        } else {
          result[upperCaseFirstLetter(parentKey!)] = value;
        }
      }
    }
  }

  process(where);

  return result;
}

export {
  filterToWhereParameters,
  whereParameterToInput,
  whereParameterToCondition,
  filterToPath,
  pathToFilter,
  parseQuery,
  pathToWhereParameters,
};
