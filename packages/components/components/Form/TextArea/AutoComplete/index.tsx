import type { RefObject } from "react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface TPosition {
  top: number;
  left: number;
}
const SuggestionList = styled.ul<{ $suggestionsPosition: TPosition }>`
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  position: absolute;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  // Here we assume that line height is 1.5 rem and width of symbol is 0.5rem
  top: ${({ $suggestionsPosition }) =>
    `calc(${$suggestionsPosition.top} * 1.5rem)`};
  left: ${({ $suggestionsPosition }) =>
    `calc(${$suggestionsPosition.left} * 0.5rem)`};
`;

const SuggestionItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

interface TAutoComplete {
  inputValue: string;
  variables: string[];
  textAreaRef: RefObject<HTMLTextAreaElement>;
  onSelect: (value: string, offset?: number) => void;
}

// Component definition
const AutoComplete: React.FC<TAutoComplete> = ({
  textAreaRef,
  variables = [],
  inputValue,
  onSelect,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [lastEnteredWord, setLastEnteredWord] = useState<string>();
  const [suggestionsPosition, setSuggestionsPosition] = useState<TPosition>({
    top: 0,
    left: 0,
  });

  const getLastWord = (s: string): string | null => {
    const regex = /([A-Za-z]+)$/;
    const match = s.match(regex);
    return match ? match[0] : null;
  };

  useEffect(() => {
    const position: TPosition = { top: 0, left: 0 };
    const start = textAreaRef.current?.selectionStart ?? 0;
    const textBeforeCursor = inputValue.substring(0, start);
    const lastWord = getLastWord(textBeforeCursor);

    // Show suggestions only for words with 2 and more letters
    if (!lastWord || lastWord.length < 2) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = variables.filter((suggestion) => {
      return suggestion.toLowerCase().startsWith(lastWord.toLowerCase());
    });

    // Calculate the cursor position in terms of rows and columns
    const listOfRows = textBeforeCursor.split("\n");
    const lastRow = listOfRows[listOfRows.length - 1];

    // Get textarea scroll information
    const scrollTop = textAreaRef.current?.scrollTop ?? 0;
    const lineHeightInPx =
      parseFloat(getComputedStyle(textAreaRef.current!).lineHeight) || 24; // default 24px for 1.5rem
    const scrollOffsetInLines = scrollTop / lineHeightInPx;

    // Calculate number of lines before the cursor
    const linesBeforeCursor = listOfRows.length - scrollOffsetInLines;

    // Calculate top and left positions for suggestions
    position.top = linesBeforeCursor; // number of lines before the cursor
    position.left = lastRow.length; // number of characters in the current line

    setLastEnteredWord(lastWord);
    setSuggestionsPosition(position);
    setSuggestions(newSuggestions);
  }, [inputValue]);

  if (suggestions.length > 0) {
    return (
      <SuggestionList $suggestionsPosition={suggestionsPosition}>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={index}
            onClick={() => {
              // Offset = last entered word length + added space
              onSelect(`${suggestion} `, lastEnteredWord?.length);
            }}
          >
            {suggestion}
          </SuggestionItem>
        ))}
      </SuggestionList>
    );
  }
  return null;
};

export { AutoComplete };
