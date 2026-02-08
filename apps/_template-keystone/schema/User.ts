import type { BaseListTypeInfo } from "@keystone-6/core/types";
import { list } from "@keystone-6/core";
import { text, password, checkbox, relationship } from "@keystone-6/core/fields";

// import type { TOperation } from "@/types";
// eslint-disable-next-line no-restricted-imports
import { ALLOW_ROLES_MANAGEMENT } from "../env";

import { isAdmin, isSameUser } from "./utils/access";

import { paymentFields } from "./payments";
import { createdAt } from "./utils/fields";


// NOTE: If you change title of this table - change title in signin page - admin/pages/signin.tsx
export const User = list<BaseListTypeInfo>({
  access: {
    operation: {
      query: () => true,

      create: () => true,
      update: (data) => isAdmin(data) || isSameUser(data),
      delete: (data) => isAdmin(data),
    },
    filter: {
      query: ({ session }) => {
        // Flag/Env variable to set first admin
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;

        return isAdmin({ session }) || isSameUser({ session });
      },
      update: ({ session }) => {
        // Flag/Env variable to set first admin
        if (ALLOW_ROLES_MANAGEMENT === "allow") return true;

        return isAdmin({ session }) || isSameUser({ session });
      },
      delete: ({ session }) => {
        return isAdmin({ session });
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
      /* ui: {
        views: "@md/sections/keystone/CustomFields/Text/views",
      }, */
    }),

    password: password({
      ui: {
        itemView: {
          fieldMode: (data) =>
            isAdmin(data) || isSameUser(data) ? "edit" : "hidden",
        },
      },
    }),
    banned: checkbox({
      ui: {
        itemView: {
          fieldMode: (data) =>
            isAdmin(data) ? "edit" : "hidden",
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
            // Non admin users can't see it's roles
            return "hidden";
          },
        },
      },
    }),
    ...paymentFields,
    createdAt: createdAt(),
  },

  ui: {
    labelField: "email",
    itemView: {
      defaultFieldMode: (data) =>
        isAdmin(data) || isSameUser(data) ? "edit" : "read",
    },
  },
});
