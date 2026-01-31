import React from "react";
import styled from "styled-components";

const VariablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

const Tag = styled.span`
  padding: 2px 8px;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface TextAreaProps {
  onSelect: (tag: string) => void;
  variables: string[];
}

const Variables: React.FC<TextAreaProps> = ({ onSelect, variables }) => {
  // Wrap variables with {{}}
  const variablesView = variables.map((variable) => `{{${variable}}}`);

  return (
    <VariablesList>
      {variablesView.map((tag, index) => (
        <Tag key={index} onClick={() => onSelect(tag)}>
          {tag}
        </Tag>
      ))}
    </VariablesList>
  );
};

export { Variables };
