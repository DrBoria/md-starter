import React, { forwardRef, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { TextArea as KeystoneTextArea } from "@keystone-ui/fields";
import styled from "styled-components";

import { AutoComplete } from "./AutoComplete";
import { Variables } from "./Variables";
import {
  TWithBasicElementOffsets,
  withOffsetBottom,
  withOffsetsRight,
} from "@md/styles";

// Dynamic import for CodeEditor to avoid SSR issues
const CodeEditor = dynamic(() => import("@uiw/react-textarea-code-editor"), {
  ssr: false,
});

const Container = styled.div<TWithBasicElementOffsets>`
  display: flex;
  flex-direction: column;
  position: relative;

  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
`;

const CodeEditorContainer = styled.div`
  border: 1px solid var(--color-border);
  border-radius: 4px;
  margin-bottom: 4px;

  pre {
    background-color: transparent;
  }
`;

export type TTextAreaPlugins = "variables" | "auto-complete";

interface TTextAreaProps extends TWithBasicElementOffsets {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  value: string;
  plugin?: TTextAreaPlugins;
  variables?: string[];
  testId?: string;
  isCodeEditor?: boolean;
  rows?: number;
}

// ForwardRef component
const TextArea = forwardRef<HTMLTextAreaElement, TTextAreaProps>(
  (
    {
      placeholder,
      onChange,
      value,
      disabled,
      plugin,
      testId,
      variables,
      isCodeEditor,
      rows,
      offsetBottom,
      offsetRight,
    },
    ref,
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const editorContainerRef = useRef<HTMLDivElement | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Sync internal textareaRef with the forwarded ref
    const updateRef = (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node;
      }
      // Update state when the ref is assigned
      setIsInitialized(true);
    };

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (editorContainerRef.current) {
          const textareaElement =
            editorContainerRef.current.querySelector("textarea");
          if (textareaElement) {
            updateRef(textareaElement);
          }
        }
      }, 100); // CodeEditor renders with a delay in Next.js

      return () => clearTimeout(timeoutId);
    }, []);

    const addTextOnClick = (tag: string, offset = 0) => {
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Insert the tag at the current cursor position
        const newText =
          value.substring(0, start - offset) + tag + value.substring(end);

        // Calculate the new cursor position
        const newCursorPosition = start + tag.length - offset;

        onChange({
          target: { value: newText },
        } as React.ChangeEvent<HTMLTextAreaElement>);

        // Restore the cursor position after updating the textarea's value
        setTimeout(() => {
          textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 30); // We are waiting till code editor updates its content to set the new position
      }
    };

    return (
      <Container offsetBottom={offsetBottom} offsetRight={offsetRight}>
        {isCodeEditor ? (
          <CodeEditorContainer ref={editorContainerRef}>
            <CodeEditor
              value={value}
              language="ruby"
              placeholder={placeholder || "Please enter eligibility parameters"}
              onChange={onChange}
              data-test-id={testId}
              style={{
                fontSize: 16,
                lineHeight: 1.5,
                backgroundColor: "transparent",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
              disabled={disabled}
            />
          </CodeEditorContainer>
        ) : (
          <KeystoneTextArea
            ref={(node) => {
              updateRef(node);
            }}
            data-test-id={testId}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            autoComplete="off"
            // Keystone for some reason did not expose the rows prop to their textarea component
            // @ts-ignore
            rows={rows}
          />
        )}

        {plugin &&
          variables &&
          {
            "auto-complete": (
              <AutoComplete
                key={
                  isInitialized
                    ? "initialized-auto-complete"
                    : "not-initialized-auto-complete"
                }
                textAreaRef={textareaRef}
                variables={variables}
                onSelect={addTextOnClick}
              />
            ),
            variables: (
              <Variables variables={variables} onSelect={addTextOnClick} />
            ),
          }[plugin]}
      </Container>
    );
  },
);

export { TextArea };
