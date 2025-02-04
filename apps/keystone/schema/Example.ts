import { list } from "@keystone-6/core";
import {
  relationship,
  select,
  text,
  timestamp,
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
    DynamicStatusLabel: select({
      label: "Contacts Matching Criteria",
      type: "enum",
      defaultValue: "queued",
      options: [
        { label: "Not Calculated", value: "not_calculated" },
        { label: "Queued", value: "queued" },
        { label: "Processing", value: "processing" },
        { label: "Failed", value: "failed" },
        { label: "Success", value: "success" },
      ],
      validation: { isRequired: true },
      ui: {
        displayMode: "select",
        views:
          "./admin/system-components/CustomFields/DynamicStatusLabel/views",
      },
    }),
    EquasionTextArea: text({
      defaultValue: "",
      db: { isNullable: false },
      validation: { isRequired: false },
      ui: {
        displayMode: "textarea",
        description: "Press 'Shift + Enter' to see available variables",
        views: "./admin/system-components/CustomFields/EquasionTextArea/views",
      },
    }),
    HiddenInput: text({
      defaultValue: "",
      db: { map: "sendgrid_api_key", isNullable: false },
      ui: {
        views: "./admin/system-components/CustomFields/HiddenInput/views",
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "edit" },
        description: "Sendgrid API key to send emails using Sendgrid.",
      },
    }),
    LongText: text({
      defaultValue: "",
      db: { map: "drafter_instructions", isNullable: false },
      ui: {
        displayMode: "textarea",
        views: "./admin/system-components/CustomFields/LongText/views",
        description:
          "Your agent will follow these instructions when creating new campaign drafts.",
      },
    }),
    TimeNotUTC: timestamp({
      db: {
        map: "send_at",
        isNullable: true,
      },
      ui: {
        views: "./admin/system-components/CustomFields/TimeNotUTC/views",
        description:
          "Contact local time at which campaign emails is scheduled to be sent.",
      },
    }),
    TimeZone: text({
      db: { map: "timezone", isNullable: false },
      ui: {
        description: "This part of Campaign is run only inside this timezone",
        views: "./admin/system-components/CustomFields/TimeZone/views",
      },
    }),
    Title: text({
      ui: {
        views: "./admin/system-components/CustomFields/Title/views",
      },
    }),
  },
  ui: {
    label: "Example",
    isHidden: (...context) => {
      return !isAdmin(...context);
    },
  },
});
