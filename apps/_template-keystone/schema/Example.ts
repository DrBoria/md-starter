import { list } from "@keystone-6/core";
import {
  select,
  text,
  relationship,
  checkbox,
  timestamp,
} from "@keystone-6/core/fields";

type Lists = any;
import { isAdmin } from "./access-control/roles";
import { createdAt } from "./fields/createdAt";
import { isActive } from "./fields/isActive";
import { updatedAt } from "./fields/updatedAt";

export const Example = list<any>({
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
      },
    }),
    checkbox: isActive(),
    timestamp_updateAt: updatedAt(),
    timestamp_createdAt: createdAt(),
    DynamicStatusLabel: select({
      label: "Contacts Matching Criteria",
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
      },
      db: { isNullable: false },
    }),
    EquasionTextArea: text({
      defaultValue: "",
      db: { isNullable: false },
      validation: { isRequired: false },
      ui: {
        displayMode: "textarea",
        description: "Press 'Shift + Enter' to see available variables",
      },
    }),
    HiddenInput: text({
      defaultValue: "",
      db: { map: "sendgrid_api_key", isNullable: false },
      ui: {
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
        description:
          "Contact local time at which campaign emails is scheduled to be sent.",
      },
    }),
    TimeZone: text({
      db: { map: "timezone", isNullable: false },
      ui: {
        description: "This part of Campaign is run only inside this timezone",
      },
    }),
    Title: text({}),
  },
  ui: {
    label: "Example",
    isHidden: (...context) => {
      return !isAdmin(...context);
    },
  },
});
