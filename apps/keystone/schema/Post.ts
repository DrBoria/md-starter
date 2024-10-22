import { list } from "@keystone-6/core";
import {
  text,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import { createdAt } from "./fields/createdAt";
import { updatedAt } from "./fields/updatedAt";
import { allowAll } from "@keystone-6/core/access";

export const Post = list<Lists.Post.TypeInfo>({
  access: allowAll,
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
    textContent: text({
      validation: { isRequired: true },
      isIndexed: "unique",
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
