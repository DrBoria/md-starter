import type { RefObject } from "react";

// Math operators
export const mathOperators = ["+", "-", "*", "/", "%"];

// Comparison operators
export const comparisonOperators = ["<", ">", "<=", ">=", "==", "!="];

// Logical operators and grouping
export const logicalOperators = [
  "(",
  ")",
  "AND",
  "OR",
  "TRUE",
  "FALSE",
  "NOTSET",
  "NOT",
];

export interface QueryResponse {
  items: Array<{
    id: string;
    name: string;
    value: string;
    description: string;
  }>;
}

interface IAddTextOnClickProps {
  tag: string;
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange?: (value: string) => void;
}

export const addTextOnClick = ({
  tag,
  textareaRef,
  value,
  onChange,
}: IAddTextOnClickProps) => {
  const textarea = textareaRef.current;
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Insert the tag at the current cursor position
    const newText = value.substring(0, start) + tag + value.substring(end);

    // Calculate the new cursor position
    const newCursorPosition = start + tag.length;

    onChange?.(newText);

    // Restore the cursor position after updating the textarea's value
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      textarea.focus();
    }, 30); // We are waiting till code editor updates it's content to set new position
  }
};
