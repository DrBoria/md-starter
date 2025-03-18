import { list } from "@keystone-6/core";
import {
  checkbox,
  password,
  relationship,
  text,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import {
  isAdmin,
  isOwner,
  isSameUser,
  isViewer,
} from "./access-control/roles";
import { createdAt } from "./fields/createdAt";
import { ALLOW_ROLES_MANAGEMENT } from "../env";

// NOTE: If you change title of this table - change title in signin page - admin/pages/signin.tsx
export const User = list<Lists.User.TypeInfo>({
  access: {
    operation: {
      query: () => true,
      create: (data) => !isViewer(data),
      update: (data) => !isViewer(data),
      delete: (data) => !isViewer(data),
    },
    filter: {
      query: ({ session }) => {
        // Flag/Env variable to set first admin
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;

        return isAdmin({ session }) || isOwner({ session });
      },
      update: ({ session }) => {
        // Flag/Env variable to set first admin
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;
        
        return isAdmin({ session }) || isOwner({ session });
      },
      delete: ({ session }) => {
        return isAdmin({ session }) || isOwner({ session });
      },
    },
  },
  db: {
    map: "user",
  },
  fields: {
    // todo: add unique together: organization, email
    // (not really supported by KeystoneJS
    email: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same email as another user
      isIndexed: "unique",
      ui: {
        views: "./admin/components/CustomFields/Text/views",
      },
    }),

    password: password({
      ui: {
        itemView: {
          fieldMode: (data) =>
            isAdmin(data) || isOwner(data) ? "edit" : "hidden",
        },
      },
    }),
    locked: checkbox({
      ui: {
        itemView: {
          fieldMode: (data) =>
            isAdmin(data) || isOwner(data) ? "edit" : "hidden",
        },
      },
    }),
    role: relationship({
      ref: "Role",
      many: false,
      ui: {
        hideCreate: true,
        itemView: {
          fieldMode: (data) => {
            if (
              isAdmin(data) ||
              isOwner(data) ||
              ALLOW_ROLES_MANAGEMENT === "allow"
            ) {
              // We don't want to allow same user change it's role
              // It cause issues with role downgrade for admin or organization owner
              if (
                isSameUser(data) &&
                ALLOW_ROLES_MANAGEMENT !== "allow"
              ) {
                return "read";
              }
              return "edit";
            }
            // Non admin and non owner users can't see it's roles
            return "hidden";
          },
        },
      },
    }),
    createdAt: createdAt(),
  },

  ui: {
    labelField: "email",
    itemView: {
      defaultFieldMode: (data) =>
        !isAdmin(data) || !isOwner(data) ? "read" : "edit",
    },
  },
});
