import React from "react";
import styled from "styled-components";

const VariablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.offsets.betweenElements};
  margin-top: ${({ theme }) => theme.offsets.elementContent};
`;

const Tag = styled.span`
  padding: ${({ theme }) => theme.offsets.elementContent};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  border-radius: ${({ theme }) => theme.border.radius}px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.overlay};
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
      {variablesView.map((tag) => (
        <Tag key={tag} onClick={() => onSelect(tag)}>
          {tag}
        </Tag>
      ))}
    </VariablesList>
  );
};

export { Variables };
