import React, { useEffect } from "react";
import Prism from "prismjs";
import styled from "styled-components";

import "prism-themes/themes/prism-one-light.css";
import "prismjs/components/prism-json";

export const CodeBlock = styled.pre`
  margin: 0;
  background: ${({ theme }) => theme.colors.section};
  height: 100%;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  code {
    font-family: ${({ theme }) => theme.font.family.text};
    font-size: ${({ theme }) => theme.font.sizes.regular};
    line-height: 1.5;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    display: block;
    height: 100%;
  }
`;

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
