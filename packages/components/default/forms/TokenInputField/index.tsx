import React, { useState } from "react";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";
import styled from "styled-components";
import { Input } from "../Form";
import { Button } from "../Button";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TokenInputField = ({
  field,
  value,
  onChange,
  autoFocus,
  readOnly,
}) => {
  const [showSecret, setShowSecret] = useState(false);
  const toggleShowSecret = () => setShowSecret(!showSecret);
  const inputType = showSecret ? "text" : "password";
  const handleChange = (event) => {
    onChange && onChange(event.target.value);
  };

  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>
      <FlexContainer>
        <Input
          id={`${field.path}-input`}
          type={inputType}
          autoFocus={autoFocus}
          value={value || ""}
          onChange={handleChange}
          autoComplete="off"
          readOnly={readOnly}
          style={{ flex: "1" }}
        />
        <Button
          id={`${field.path}-button`}
          size="small"
          tone="neutral"
          onClick={toggleShowSecret}
          style={{ marginLeft: "0.5em" }}
          text={showSecret ? "Hide" : "Show"}
        />
      </FlexContainer>
    </FieldContainer>
  );
};

export { TokenInputField };
