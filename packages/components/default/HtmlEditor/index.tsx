import React, { useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { Button } from "../Button";

// Dynamic import for CodeEditor to avoid SSR issues
const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor"), {
  ssr: false,
});

const CodeEditorContainer = styled.div<{ $fullHeigh?: boolean }>`
  border-radius: 4px;
  margin-bottom: 4px;
  overflow: auto;
  height: ${({ $fullHeigh }) => ($fullHeigh ? "100%" : "400px")};

  pre {
    background-color: transparent;
  }
  div {
    line-height: "1.9";
  }
`;

type THtmlEditorProps = {
  initialValue: string;
  fullHeight?: boolean;
} & (
  | {
      value?: string;
      setValue?: (newValue: string) => void;
      onSave?: never; // Ensures onSave isn't used in this mode
    }
  | {
      onSave: (value: string) => void;
      value?: never; // Ensures value/setValue aren't used in this mode
      setValue?: never;
    }
);

const HtmlEditor = ({
  initialValue,
  onSave,
  fullHeight,
  value: externalValue,
  setValue: externalSetValue,
}: THtmlEditorProps) => {
  const [localValue, setLocalValue] = useState(initialValue || "");
  const [isPristine, setIsPristine] = useState(true);

  const value = externalValue ?? localValue;
  const setValue = externalSetValue ?? setLocalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (!externalSetValue) {
      setIsPristine(e.target.value === initialValue);
    }
  };

  const handleSave = () => {
    onSave?.(value);
    if (!externalSetValue) {
      setIsPristine(true); // Reset pristine state after saving
    }
  };

  return (
    <>
      <CodeEditorContainer $fullHeigh={fullHeight}>
        <CodeEditor
          language="html"
          value={value}
          onChange={handleChange}
          style={{
            fontSize: "15px",
            lineHeight: "1.5",
            backgroundColor: "transparent",
            width: "max-content",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </CodeEditorContainer>
      {!externalSetValue && (
        <Button
          text="Save changes"
          disabled={isPristine}
          onClick={handleSave}
        />
      )}
    </>
  );
};

export { HtmlEditor };
