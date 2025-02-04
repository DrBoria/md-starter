import type { RefObject } from "react";
import React, { useEffect, useRef, useState } from "react";
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
  top: ${({ $suggestionsPosition }) =>
    `calc(${$suggestionsPosition.top} * 1.5rem + 10px)`};
  left: ${({ $suggestionsPosition }) =>
    `calc(${$suggestionsPosition.left} * 0.5rem + 10px)`};
`;

const SuggestionItem = styled.li<{ selected: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#f5f5f5" : "white")};
`;

interface TAutoComplete {
  variables: string[];
  textAreaRef: RefObject<HTMLTextAreaElement>;
  onSelect: (value: string, index: number) => void;
}

const AutoComplete: React.FC<TAutoComplete> = ({
  textAreaRef,
  variables = [],
  onSelect,
}) => {
  const [isOpenSuggestions, setIsOpenSuggestions] = useState(false);
  const [lastEnteredWord, setLastEnteredWord] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsPosition, setSuggestionsPosition] = useState<TPosition>({
    top: 0,
    left: 0,
  });
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

  const suggestionsRef = useRef<HTMLUListElement>(null);

  const getLastWord = (s: string): string | null => {
    const regex = /([A-Za-z]+)$/;
    const match = s.match(regex);
    return match ? match[0] : null;
  };

  const updateSuggestions = () => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const position: TPosition = { top: 0, left: 0 };
    const start = textArea.selectionStart ?? 0;
    const textBeforeCursor = textArea.value.substring(0, start);
    const lastWord = getLastWord(textBeforeCursor);

    const newSuggestions = variables.filter((suggestion) =>
      lastWord
        ? suggestion.toLowerCase().startsWith(lastWord.toLowerCase())
        : true,
    );

    const listOfRows = textBeforeCursor.split("\n");
    const lastRow = listOfRows[listOfRows.length - 1];

    const scrollTop = textArea.scrollTop ?? 0;
    const lineHeightInPx =
      parseFloat(getComputedStyle(textArea).lineHeight) || 24;
    const scrollOffsetInLines = scrollTop / lineHeightInPx;

    const linesBeforeCursor = listOfRows.length - scrollOffsetInLines;

    position.top = linesBeforeCursor;
    position.left = lastRow.length;

    setLastEnteredWord(lastWord || "");
    setSuggestionsPosition(position);
    setSuggestions(newSuggestions);
    setSelectedSuggestionIndex(-1);
  };

  useEffect(() => {
    const textArea = textAreaRef.current;

    if (textArea) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
          updateSuggestions();
          setIsOpenSuggestions(true);
        } else if (suggestions.length > 0) {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedSuggestionIndex((prevIndex) =>
              prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0,
            );
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedSuggestionIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1,
            );
          } else if (e.key === "Escape") {
            e.preventDefault();
            setSuggestions([]);
            setIsOpenSuggestions(false);
          } else if (e.key === "Enter" && selectedSuggestionIndex >= 0) {
            e.preventDefault();
            e.stopPropagation();
            onSelect(
              suggestions[selectedSuggestionIndex],
              lastEnteredWord.length,
            );
            setSuggestions([]);
            setIsOpenSuggestions(false);
          }
        }
      };

      const handleInput = () => {
        if (isOpenSuggestions) updateSuggestions();
      };

      textArea.addEventListener("keydown", handleKeyDown);
      textArea.addEventListener("input", handleInput);

      return () => {
        textArea.removeEventListener("keydown", handleKeyDown);
        textArea.removeEventListener("input", handleInput);
      };
    }
  }, [textAreaRef, suggestions, selectedSuggestionIndex]);

  // Handle click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const textArea = textAreaRef.current;
      const suggestionsList = suggestionsRef.current;

      if (
        textArea &&
        suggestionsList &&
        !textArea.contains(e.target as Node) &&
        !suggestionsList.contains(e.target as Node)
      ) {
        setSuggestions([]);
        setIsOpenSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [textAreaRef, suggestionsRef]);

  if (suggestions.length > 0) {
    return (
      <SuggestionList
        ref={suggestionsRef}
        $suggestionsPosition={suggestionsPosition}
      >
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={`${index} suggestion item`}
            selected={index === selectedSuggestionIndex}
            onMouseEnter={() => setSelectedSuggestionIndex(index)}
            onClick={() => {
              onSelect(suggestion, lastEnteredWord.length);
              setSuggestions([]);
              setIsOpenSuggestions(false);
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
