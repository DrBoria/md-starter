import type { FieldProps } from "@keystone-6/core/types";
import React from "react";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";
import moment from "moment";

import type { controller } from "../utils/viewStarter";
import { DateTimePicker } from "@md/components/keystone";
import { ThemeProvider } from "@md/styles";

function Field({ field, value, onChange }: FieldProps<typeof controller>) {
  // Parse current value from props
  const currentValue = value?.initial || "";
  return (
    <ThemeProvider> 
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>

      {/* onChange passed for editable / create view */}
      {onChange ? (
        <DateTimePicker
          value={currentValue}
          onUpdate={(newSendAt) => {
            const mappedValue = {
              value: {
                dateValue: moment(newSendAt).format("YYYY-MM-DD"),
                timeValue: {
                  value: moment(newSendAt).format("HH:mm:ss.SSS"),
                },
              },
            };
            // @ts-ignore TODO: fix types for onChange after deserialize implementation
            onChange(mappedValue);
          }}
        />
      ) : (
        moment.utc(currentValue).format("M/D/YYYY, h:mm:ss A")
      )}
    </FieldContainer>
    </ThemeProvider>
  );
}

export { Field };
