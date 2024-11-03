import { list } from "@keystone-6/core";
import {
  checkbox,
  text,
} from "@keystone-6/core/fields";

import type { Lists, PostWhereInput } from ".keystone/types";
import { createdAt } from "./fields/createdAt";
import { updatedAt } from "./fields/updatedAt";
import { isAdmin } from "./access-control/roles";

export const Post = list<Lists.Post.TypeInfo>({
  access: {
    operation: {
      query: () => true,
      create: (data) => isAdmin(data),
      update: (data) => isAdmin(data),
      delete: (data) => isAdmin(data),
    },
    filter: {
      query: ({ session }) => {
        console.log(session, 'isAdmin: ', isAdmin({session}));
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
      ui: {
        views: "./admin/system-components/CustomFields/Text/views",
      }
    }),
    premium: checkbox({}),
    textContent: text({
      validation: { isRequired: true },
      db: {
        map: "text_content",
      },
      ui: {
        views: "./admin/system-components/CustomFields/Text/views",
      }
    }),
    updateAt: updatedAt(),
    createdAt: createdAt(),
  },
  ui: {
    label: "Post",
  },
});
