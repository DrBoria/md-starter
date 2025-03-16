import type { FieldProps } from "@keystone-6/core/types";
import React, { useEffect, useState } from "react";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";
import TimezoneSelect from "react-timezone-select";
import styled from "styled-components";

import type { controller } from "../utils/viewStarter";

const StyledTimezoneSelect = styled(TimezoneSelect)`
  [class*="-control"] {
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 4px 8px;
    background-color: var(--color-bg-secondary);
    font-size: 16px;
    transition: border-color 0.2s;
    &:hover {
      border-color: var(--color-placeholder);
    }
  }
  [class*="-placeholder"] {
    color: var(--color-placeholder);
  }
`;

function Field({
  field,
  value,
  onChange,
  forceValidation,
}: FieldProps<typeof controller>) {
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  // Parse current value from props
  const currentValue = value?.inner?.value || "";

  const handleChange = (selectedOption: { value: string }) => {
    const updatedValue = selectedOption?.value || "";
    onChange && onChange({ inner: { value: updatedValue } });
    setValidationMessage(null);
  };

  const handleValidate = () => {
    if (!value?.inner?.value) {
      setValidationMessage(`${field.label} is required.`);
    } else {
      setValidationMessage(null);
    }
  };

  useEffect(() => {
    if (forceValidation) {
      handleValidate();
    }
  }, [forceValidation]);

  return (
      <FieldContainer as="fieldset">
        <FieldLabel>{field.label}</FieldLabel>
        <FieldDescription id={`${field.path}-description`}>
          {field.description}
        </FieldDescription>
        <div>
          <StyledTimezoneSelect
            value={currentValue}
            onChange={handleChange}
            isDisabled={field.isReadOnly || !onChange}
            placeholder="Select..."
          />
        </div>
        {validationMessage && (
          <div style={{ color: "red", marginTop: "8px" }}>
            {validationMessage}
          </div>
        )}
      </FieldContainer>
  );
}

export { Field };
