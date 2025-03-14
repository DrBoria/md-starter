import React, { useEffect } from "react";
import Prism from "prismjs";
import styled from "styled-components";

import "prism-themes/themes/prism-one-light.css";
import "prismjs/components/prism-json";

interface RawTabProps {
  rawValue?: string | object;
  className?: string;
}

export const CodeBlock = styled.pre`
  margin: 0;
  background: #fafafa;
  height: 100%;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;

  code {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    font-size: 0.875rem;
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

export const CodePreview: React.FC<RawTabProps> = ({ rawValue, className }) => {
  if (!rawValue) return null;

  useEffect(() => {
    Prism.highlightAll();
  }, [rawValue]);

  return (
    <CodeBlock>
      <code className="language-json">
        {typeof rawValue === "string"
          ? rawValue
          : JSON.stringify(rawValue, null, 2)}
      </code>
    </CodeBlock>
  );
};
