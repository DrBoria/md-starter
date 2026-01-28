import type { FieldProps } from "@keystone-6/core/types";
import React, { useState } from "react";

import type { controller } from "../utils/viewStarter";
import styled from "styled-components";
import { BasicSection, Button, DescriptionText, Input, Label } from "@md/components";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Field: React.FC<FieldProps<typeof controller>> = ({
  field,
  value,
  onChange,
  autoFocus,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({ inner: { value: event?.target?.value } });
  };

  const [showSecret, setShowSecret] = useState<boolean>(false);
  const toggleShowSecret = () => setShowSecret(!showSecret);
  const inputType = showSecret ? "text" : "password";


  return (
      <BasicSection>
        <Label>{field.label}</Label>
        <DescriptionText id={`${field.path}-description`}>
          {field.description}
        </DescriptionText>
        <FlexContainer>
          <Input
            name={`${field.path}-input`}
            id={`${field.path}-input`}
            type={inputType}
            autoFocus={autoFocus}
            value={value || ""}
            onChange={handleChange}
            autoComplete="off"
            readOnly={!onChange}
            style={{ flex: "1" }}
          />
          <Button
            id={`${field.path}-button`}
            onClick={toggleShowSecret}
            style={{ marginLeft: "0.5em" }}
          >
            {showSecret ? "Hide" : "Show"}
          </Button>
        </FlexContainer>
      </BasicSection>
  );
};

export { Field };
