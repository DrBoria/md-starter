import React, { useRef } from "react";
import { TextArea as KeystoneTextArea } from "@keystone-ui/fields";
import styled from "styled-components";

import { AutoComplete } from "./AutoComplete";
import { Variables } from "./Variables";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export type TTextAreaPlugins = "variables" | "auto-complete";

interface TTextAreaProps {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  value: string;
  plugin?: TTextAreaPlugins;
  variables?: string[];
}

const TextArea: React.FC<TTextAreaProps> = ({
  placeholder,
  onChange,
  value,
  disabled,
  plugin,
  variables,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addTextOnClick = (tag: string, offset = 0) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        value.substring(0, start - offset) + tag + value.substring(end);
      onChange({
        target: { value: newText },
      } as React.ChangeEvent<HTMLTextAreaElement>);

      setTimeout(() => {
        const newCursorPosition = start + tag.length - offset;
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 0);
    }
  };

  return (
    <Container>
      <KeystoneTextArea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
      />

      {plugin &&
        variables &&
        {
          "auto-complete": (
            <AutoComplete
              textAreaRef={textareaRef}
              variables={variables}
              inputValue={value}
              onSelect={addTextOnClick}
            />
          ),
          variables: (
            <Variables variables={variables} onSelect={addTextOnClick} />
          ),
        }[plugin]}
    </Container>
  );
};

export { TextArea };
