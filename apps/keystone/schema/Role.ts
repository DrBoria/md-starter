import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import { ALLOW_ROLES_MANAGEMENT } from "../env";
import { isAdmin, isOwner } from "./access-control/roles";
import { createdAt } from "./fields/createdAt";

export const Role = list<Lists.Role.TypeInfo>({
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
      query: (...context) => {
        // Flag/Env variable to set first admin
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;

        if (isAdmin(...context)) return true;

        // Owner can see all but Admin roles
        if (isOwner(...context)) {
          return { name: { not: { equals: "Admin" } } };
        }

        // The other people can't see roles
        return false;
      },
    },
  },
  db: {
    map: "role",
  },
  fields: {
    name: text(),
    createdAt: createdAt(),
  },
  ui: {
    label: "Role",
  },
});
