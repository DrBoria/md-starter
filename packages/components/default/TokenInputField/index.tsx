import React, { ReactElement, ServerContextJSONValue, useState } from "react";
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from "@keystone-ui/fields";
import styled from "styled-components";
import { JSONValue } from "@md/types";
import { Input } from "../Form";
import { Button } from "../Button";


type FilterTypeDeclaration<Value extends JSONValue> = {
  readonly label: string
  readonly initialValue: Value
}

export type FilterTypeToFormat<Value extends JSONValue> = {
  readonly type: string
  readonly label: string
  readonly value: Value
}

export type FieldController<FormState, FilterValue extends JSONValue = never> = {
  path: string
  label: string
  description: string | null
  graphqlSelection: string
  defaultValue: FormState
  deserialize: (item: any) => FormState
  serialize: (formState: FormState) => any
  validate?: (formState: FormState) => boolean
  filter?: {
    types: Record<string, FilterTypeDeclaration<FilterValue>>
    graphql(type: { type: string, value: FilterValue }): Record<string, any>
    Label(type: FilterTypeToFormat<FilterValue>): string | ReactElement | null
    Filter(props: {
      type: string
      value: FilterValue
      onChange(value: FilterValue): void
      autoFocus?: boolean
    }): ReactElement | null
  }
}


const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface TokenInputFieldProps {
  field: FieldController<{ inner: { value: string } }, string>;
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
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const toggleShowSecret = () => setShowSecret(!showSecret);
  const inputType = showSecret ? "text" : "password";
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
