import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { LucideIcon } from "../../Icons";
import { Input } from "../Input";

export type TOption = {
  label: string;
  value: string | number;
}

// Styled components
const Container = styled.div`
  position: relative;
`;

const SelectedValueWrapper = styled.div<{ readOnly: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  color: #374151;
  background-color: var(--color-bg-secondary);
  cursor: ${({ readOnly }) => (readOnly ? "default" : "pointer")};

  ${({ readOnly }) =>
    readOnly &&
    `
    background-color: #fafbfc;
    border-color: #fafbfc;
    color: var(--color-placeholder);
  `}
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 8px;
  border-radius: 8px;
  z-index: 100;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.li<{ $highlighted: boolean }>`
  padding: 10px 15px;
  background-color: ${({ $highlighted }) =>
    $highlighted ? "#007bff" : "#fff"};
  color: ${({ $highlighted }) => ($highlighted ? "#fff" : "#000")};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const IconsContainer = styled.div`
  color: #b1b5b9;
  display: flex;
  gap: 0.5rem;
  padding-left: 0.5rem;
`;

const NoOptions = styled.li`
  padding: 10px;
  color: #999;
`;

const ClearButton = styled.button<{ readOnly: boolean }>`
  background: none;
  border: none;
  cursor: ${({ readOnly }) => (readOnly ? "default" : "pointer")};
  margin-left: 5px;
  font-size: 16px;
  color: ${({ readOnly }) => (readOnly ? "#b1b5b9" : "inherit")};
`;

const Separator = styled.div`
  width: 1px;
  background-color: hsl(0, 0%, 80%);
  margin-bottom: 4px;
  margin-top: 4px;
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  color: #b4b8bc;
`;

interface SelectProps {
  options: TOption[];
  value?: TOption | null;
  onChange: (option: TOption | null) => void;
  readOnly?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  isSearchable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  isClearable = false,
  readOnly = false,
  placeholder = "Select an option",
  isSearchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    if (readOnly) return;

    setIsOpen(!isOpen);
    setSearchTerm(""); // Clear search term when opening/closing dropdown
  };

  const handleSelectOption = (option: TOption) => {
    if (readOnly) return;

    onChange(option);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to open dropdown
    if (!readOnly) {
      onChange(null);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1),
        );
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (isOpen && filteredOptions[highlightedIndex]) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Container ref={containerRef}>
      <SelectedValueWrapper
        onClick={handleToggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        readOnly={readOnly}
      >
        {value ? value.label : <Placeholder>{placeholder}</Placeholder>}
        <IconsContainer>
          {isClearable && value && (
            <ClearButton onClick={handleClear} readOnly={readOnly}>
              <LucideIcon name="X" />
            </ClearButton>
          )}
          <Separator />
          <span>
            {isOpen ? (
              <LucideIcon name="ChevronUp" />
            ) : (
              <LucideIcon name="ChevronDown" />
            )}
          </span>
        </IconsContainer>
      </SelectedValueWrapper>
      {isOpen && !readOnly && (
        <Dropdown>
          {isSearchable && (
            <Input
              type="text"
              value={searchTerm}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          )}
          {filteredOptions?.length ? (
            filteredOptions.map((option, index) => (
              <DropdownItem
                key={option.value}
                $highlighted={highlightedIndex === index}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </DropdownItem>
            ))
          ) : (
            <NoOptions>No options found</NoOptions>
          )}
        </Dropdown>
      )}
    </Container>
  );
};

export { Select };
