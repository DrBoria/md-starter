import React, { useState } from "react";
import { Input } from "../Form";
import { Button } from "../Button";
import { FieldContainer, FlexContainer, FieldLabel, FieldDescription } from "./styles";

interface TokenInputFieldProps {
  field: {
    label: string;
    path: string;
    description?: string;
  };
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readOnly?: boolean;
}

const TokenInputField: React.FC<TokenInputFieldProps> = ({
  field,
  value,
  onChange,
  autoFocus,
  readOnly,
}) => {
  const [showSecret, setShowSecret] = useState(false);
  const toggleShowSecret = () => setShowSecret(!showSecret);
  const inputType = showSecret ? "text" : "password";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {field.description && (
        <FieldDescription id={`${field.path}-description`}>
          {field.description}
        </FieldDescription>
      )}
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
