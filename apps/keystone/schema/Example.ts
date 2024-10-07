import { list } from "@keystone-6/core";
import {
  calendarDay,
  file,
  float,
  image,
  integer,
  json,
  multiselect,
  password,
  relationship,
  select,
  text,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import { isAdmin } from "./access-control/roles";
import { createdAt } from "./fields/createdAt";
import { isActive } from "./fields/isActive";
import { updatedAt } from "./fields/updatedAt";

export const Example = list<Lists.Example.TypeInfo>({
  access: isAdmin,
  db: {
    map: "example",
  },
  fields: {
    shortedText: text({
      label: "ShortedText",
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "edit" },
        description: "This input field will have ... at the end of the line in list view",
        views: "./admin/system-components/CustomFields/Text/views",
      },
      defaultValue: "",
      db: { map: "shorted_text", isNullable: false },
    }),
    exampleType: select({
      validation: { isRequired: true },
      options: ["first", "second"],
      db: {
        isNullable: false,
      },
    }),
    customRelationship: relationship({
      label: "Custom Relationship",
      ref: "User",
      db: { foreignKey: { map: "user_id" } },
      ui: {
        displayMode: "select",
        description: "This is relationship with customizeable fieltr - filter by multiple fields or it's specific values",
        views:
          "./admin/system-components/CustomFields/Relationship/views",
      },
    }),
    checkbox: isActive(),
    timestamp_updateAt: updatedAt(),
    timestamp_createdAt: createdAt(),
  },
  ui: {
    label: "Example",
  },
});
