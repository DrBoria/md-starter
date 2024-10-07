import type { BaseListTypeInfo } from "@keystone-6/core/types";
import { checkbox } from "@keystone-6/core/fields";

export function isActive<T extends BaseListTypeInfo>() {
  return checkbox<T>({
    defaultValue: true,
    db: {
      map: "is_active",
    },
  });
}
