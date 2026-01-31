import React, { useEffect } from "react";
import Prism from "prismjs";
import styled from "styled-components";

import "prism-themes/themes/prism-one-light.css";
import "prismjs/components/prism-json";

// Styled component for the code block
export const CodeBlock = styled.pre`
  margin: 0;
  background: ${({ theme }) => theme.colors.section}; // Use theme's section background color
  height: 100%;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;

  code {
    font-family: ${({ theme }) => theme.font.family.text}; // Use theme's text font family
    font-size: ${({ theme }) => theme.font.size}; // Use theme's font size
    line-height: 1.5;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    display: block;
    height: 100%;
  }
`;

// CodePreview component
export const CodePreview: React.FC<{ rawValue?: string | object; className?: string }> = ({ rawValue, className }) => {
  if (!rawValue) return null;

  useEffect(() => {
    Prism.highlightAll();
  }, [rawValue]);

  return (
    <CodeBlock className={className}>
      <code className="language-json">
        {typeof rawValue === "string" ? rawValue : JSON.stringify(rawValue, null, 2)}
      </code>
    </CodeBlock>
  );
};
