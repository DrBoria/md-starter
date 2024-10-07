import type { BaseListTypeInfo } from "@keystone-6/core/types";
import { timestamp } from "@keystone-6/core/fields";

import { readOnlyFieldProps } from "../access-control/readOnly";

export function updatedAt<T extends BaseListTypeInfo>() {
  return timestamp<T>({
    db: {
      map: "updated_at",
      updatedAt: true,
    },
    ...readOnlyFieldProps,
  });
}
