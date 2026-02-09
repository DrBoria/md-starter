import React from "react";
import styled from "styled-components";

const VariablesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme?.variables?.offsets?.betweenElements?.mobile}px;
  margin-top: ${({ theme }) => theme?.variables?.offsets?.elementContent?.mobile}px;
`;

const Tag = styled.span`
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme?.colors?.disabled};
  border-radius: ${({ theme }) => theme?.variables?.border?.radius}px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.background};
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
