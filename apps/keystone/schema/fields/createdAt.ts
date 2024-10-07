import type { BaseListTypeInfo } from "@keystone-6/core/types";
import { timestamp } from "@keystone-6/core/fields";

import { readOnlyFieldProps } from "../access-control/readOnly";

export function createdAt<T extends BaseListTypeInfo>() {
  return timestamp<T>({
    defaultValue: { kind: "now" },
    db: {
      map: "created_at",
      isNullable: false,
    },
    ...readOnlyFieldProps,
  });
}
