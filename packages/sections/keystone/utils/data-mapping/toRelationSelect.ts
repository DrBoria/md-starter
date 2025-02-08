import type { IOption } from "../../../../types";

function toRelationSelect(input: unknown): IOption {
  // Exclude the __typename property and find the first key-value pair
  const { __typename, id, ...rest } = input as Record<string, unknown>;

  // Get the first key-value pair in the object
  const [_, value] = Object.entries(rest)[0] || [];

  return {
    label: value as string,
    value: id as string,
  };
}

export { toRelationSelect };
