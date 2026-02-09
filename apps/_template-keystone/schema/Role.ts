import type { BaseListTypeInfo } from "@keystone-6/core/types";
import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

// import type { TOperation } from "@/types";
import { ALLOW_ROLES_MANAGEMENT } from "@/env";

import { isAdmin } from "./utils/access";
import { createdAt } from "./utils/fields";

export const Role = list<BaseListTypeInfo>({
  access: {
    operation: {
      query: () => true,
      create: () => false,
      update: (data) => {
        // Flag is usually used for first install
        return (
          ALLOW_ROLES_MANAGEMENT === "allow" ||
          isAdmin(data)
        );
      },
      delete: () => false,
    },
    filter: {
      query: (context) => {
        // Flag/Env variable to set first admin
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;

        if (isAdmin(context)) return true;

        // The other people can't see roles
        return false;
      },
    },
  },
  db: {
    map: "role",
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    createdAt: createdAt(),
  },
  ui: {
    label: "Role",
  },
});
