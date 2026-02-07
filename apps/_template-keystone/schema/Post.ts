import { list } from "@keystone-6/core";
import path from "path";
import type { BaseListTypeInfo } from "@keystone-6/core/types";
import {
  checkbox,
  text,
} from "@keystone-6/core/fields";

// type PostWhereInput = any;
import { createdAt, updatedAt } from "./utils/fields";
import { isAdmin, isOwner } from "./utils/access";

export const Post = list<BaseListTypeInfo>({
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: ({ session, item }) => isOwner({ session, item }),
      delete: ({ session, item }) => isOwner({ session, item }),
    },
    filter: {
      query: ({ session }) => {
        if (isAdmin({ session })) {
          // Admins can see all posts, including premium ones
          return true;
        } else {
          // Non-admin users can see only non-premium posts
          return { premium: { equals: false } } as PostWhereInput;
        }
      },
    },
  },
  db: {
    map: "post",
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    premium: checkbox({}),
    textContent: text({
      validation: { isRequired: true },
      db: {
        map: "text_content",
      },
      ui: {
        views: path.resolve(__dirname, "../admin/components/CustomFields/Text/views"),
      },
    }),

    updatedAt: updatedAt(),
    createdAt: createdAt(),
  },
  ui: {
    label: "Post",
  },
});
