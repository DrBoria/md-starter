import { lowerCaseFirstLetter } from "../../../../utils/lowerCaseFirstLetter";

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
  // NUMBER
  | "ends-with"
  | "not-ends-with"
  | "greater-than" // >
  | "less-than" // <
  | "less-equal" // >=
  | "greater-equal" // <=
  | "equals" // <=
  | "not-equals"; // <=

export type Condition = Record<string, ConditionType>;

function toWhereParameter(
  input: Record<string, string | undefined | null>,
  condition: Condition,
): Record<string, unknown> {
  // Using 'any' to handle nested conditions
  return Object.fromEntries(
    Object.entries(input)
      .filter(([key, value]) => {
        // Do not include, if filter not selected
        if (!condition[key]) return false;
        // Do not include if selected empty value
        if (value !== "" && value !== undefined && value !== null) return true;
      })
      .map(([key, value]) => {
        // Map selected filter to graphql acceptable format
        const conditionMapping: Record<ConditionType, unknown> = {
          // TEXT
          contains: { contains: value! },
          "not-contains": { not: { contains: value! } },
          "is-exactly": { equals: value! },
          "is-not-exactly": { not: { equals: value! } },
          "starts-with": { startsWith: value! },
          "not-starts-with": { not: { startsWith: value! } },
          "ends-with": { endsWith: value! },
          "not-ends-with": { not: { endsWith: value! } },
          // BOOLEAN
          is: { equals: true },
          "is-not": { equals: false },
          // RELATION
          matches: { id: { in: [value] } },
          // NUMBER
          "greater-than": { gt: Number(value) }, // >
          "less-than": { lt: Number(value) }, // <
          "less-equal": { lte: Number(value) }, // <=
          "greater-equal": { gte: Number(value) }, // >=
          equals: { equals: Number(value) }, // =
          "not-equals": { not: { equals: Number(value) } }, // =
        };

        return [lowerCaseFirstLetter(key), conditionMapping[condition[key]]];
      }),
  );
}

export { toWhereParameter };
