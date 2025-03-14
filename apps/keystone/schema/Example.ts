import { list } from "@keystone-6/core";
import {
  select,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import { isAdmin } from "./access-control/roles";
import { createdAt } from "./fields/createdAt";
import { isActive } from "./fields/isActive";
import { updatedAt } from "./fields/updatedAt";
import { DynamicStatusLabel } from "../admin/system-components/CustomFields/DynamicStatusLabel";
import { HiddenInput } from "../admin/system-components/CustomFields/HiddenInput";
import { TimeNotUTC } from "../admin/system-components/CustomFields/TimeNotUTC";
import { TimeZone } from "../admin/system-components/CustomFields/TimeZone";
import { Title } from "../admin/system-components/CustomFields/Title";
import { LongText } from "../admin/system-components/CustomFields/LongText";
import { Relationship } from "../admin/system-components/CustomFields/Relationship";
import { EquasionTextArea } from "../admin/system-components/CustomFields/EquasionTextArea";
import { Text } from "../admin/system-components/CustomFields/Text";

export const Example = list<Lists.Example.TypeInfo>({
  access: isAdmin,
  db: {
    map: "example",
  },
  fields: {
    shortedText: Text({
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
    customRelationship: Relationship({
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
    DynamicStatusLabel: DynamicStatusLabel({
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
      },
    }),
    EquasionTextArea: EquasionTextArea({
      defaultValue: "",
      db: { isNullable: false },
      validation: { isRequired: false },
      ui: {
        displayMode: "textarea",
        description: "Press 'Shift + Enter' to see available variables",
      },
    }),
    HiddenInput: HiddenInput({
      defaultValue: "",
      db: { map: "sendgrid_api_key", isNullable: false },
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "edit" },
        description: "Sendgrid API key to send emails using Sendgrid.",
      },
    }),
    LongText: LongText({
      defaultValue: "",
      db: { map: "drafter_instructions", isNullable: false },
      ui: {
        displayMode: "textarea",
        description:
          "Your agent will follow these instructions when creating new campaign drafts.",
      },
    }),
    TimeNotUTC: TimeNotUTC({
      db: {
        map: "send_at",
        isNullable: true,
      },
      ui: {
        description:
          "Contact local time at which campaign emails is scheduled to be sent.",
      },
    }),
    TimeZone: TimeZone({
      db: { map: "timezone", isNullable: false },
      ui: {
        description: "This part of Campaign is run only inside this timezone",
      },
    }),
    Title: Title({}),
  },
  ui: {
    label: "Example",
    isHidden: (...context) => {
      return !isAdmin(...context);
    },
  },
});
