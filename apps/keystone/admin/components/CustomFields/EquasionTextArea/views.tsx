import { useQuery, type QueryResult } from "@apollo/client";
import type {
  CellComponent,
  FieldController,
  FieldProps,
} from "@keystone-6/core/types";
import React, { useRef } from "react";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import { BasicSection, Button, DescriptionText, Label } from "@md/components";
import styled from "styled-components";

import type { TTextAreaPlugins } from "@md/components/keystone";
import type { Lists } from ".keystone/types";
import { ShortedText } from "@md/components/keystone";
import { TextArea } from "@md/components/keystone";
import {
  addTextOnClick,
  comparisonOperators,
  logicalOperators,
  mathOperators,
} from "./utils";
import { useQueryList } from "@md/api/graphql";

const FormulaEditor = styled.div`
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  background: transparent;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.375rem;
  border-right: 1px solid var(--color-border);
  padding-right: 1.25rem;

  &:last-child {
    border-right: none;
    padding-right: 0;
  }
`;

const FormulaButton = styled(Button)`
  && {
    padding: 0.25rem 0.5rem;
    height: 24px;
    min-height: 24px;
    font-size: 0.875rem;
    line-height: 1;
  }
`;

const ButtonGroupsContainer = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  align-items: center;
`;

interface IPlugin {
  plugin: TTextAreaPlugins;
}

const OperatorButton = styled(FormulaButton)`
  && {
    min-width: 24px;
    width: auto;
    padding: 0.25rem 0.375rem;
  }
`;

const LogicalButton = styled(FormulaButton)`
  && {
    flex: 1;
    padding: 0.25rem 0.5rem;
  }
`;

interface IConstantsQuery {
  items: Lists.Constant.TypeInfo["item"][];
}

const Field = ({
  field,
  value,
  onChange,
}: FieldProps<
  (
    ...args: unknown[]
  ) => FieldController<{ inner: { value: string } }, string> & IPlugin
>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const deserealizedValue = value?.inner?.value || "";

  const disabled = onChange === undefined;

  const handleChange = (newValue: string) => {
    onChange?.({ inner: { value: newValue } });
  };
  const { data: listItemData }: QueryResult<IConstantsQuery> =
    useQueryList<QueryResult<IConstantsQuery>>({
      listName: "DslVariable",
      selectedFields: "name",
      useQuery
    });

  const variables =
    listItemData?.items?.map((constant) => constant?.name) ?? [];

  const handleAddVariableClick = () => {
    // Focus the textarea
    textareaRef.current?.focus();

    // Simulate Shift + Enter key press
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
      bubbles: true,
    });

    textareaRef.current?.dispatchEvent(event);
  };

  return (
      <BasicSection>
        <Label>{field.label}</Label>
        <DescriptionText id={`${field.path}-description`}>
          {field.description}
        </DescriptionText>

        <FormulaEditor>
          <ButtonGroupsContainer>
            {/* Variables Button */}
            <ButtonGroup>
              <FormulaButton
                tone="active"
                size="small"
                onClick={handleAddVariableClick}
              >
                Variable
              </FormulaButton>
            </ButtonGroup>

            {/* Math Operators */}
            <ButtonGroup>
              {mathOperators.map((tag) => (
                <OperatorButton
                  key={tag}
                  onClick={() =>
                    addTextOnClick({
                      tag,
                      textareaRef,
                      value: deserealizedValue,
                      onChange: handleChange,
                    })
                  }
                  tone="active"
                  size="small"
                >
                  {tag}
                </OperatorButton>
              ))}
            </ButtonGroup>

            {/* Comparison Operators */}
            <ButtonGroup>
              {comparisonOperators.map((tag) => (
                <OperatorButton
                  key={tag}
                  onClick={() =>
                    addTextOnClick({
                      tag,
                      textareaRef,
                      value: deserealizedValue,
                      onChange: handleChange,
                    })
                  }
                  tone="active"
                  size="small"
                >
                  {tag}
                </OperatorButton>
              ))}
            </ButtonGroup>

            {/* Logical Operators */}
            <ButtonGroup>
              {logicalOperators.map((tag) => (
                <LogicalButton
                  key={tag}
                  onClick={() =>
                    addTextOnClick({
                      tag,
                      textareaRef,
                      value: deserealizedValue,
                      onChange: handleChange,
                    })
                  }
                  tone="active"
                  size="small"
                >
                  {tag}
                </LogicalButton>
              ))}
            </ButtonGroup>
          </ButtonGroupsContainer>

          {/* Formula Textarea Section */}
          <TextArea
            isCodeEditor
            ref={textareaRef}
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            disabled={disabled}
            value={deserealizedValue ?? ""}
            plugin="auto-complete"
            variables={variables}
          />
        </FormulaEditor>
      </BasicSection>
  );
};

const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = item[field.path] + "";

  return linkTo ? (
      <CellLink {...linkTo}>{value}</CellLink>
  ) : (
      <CellContainer>
        <ShortedText text={value} maxWidth={300} />
      </CellContainer>
  );
};
Cell.supportsLinkTo = true;

export { Cell, Field };
