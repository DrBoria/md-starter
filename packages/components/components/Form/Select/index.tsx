import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "@keystone-ui/icons";
import styled from "styled-components";

import { IOption } from "../../../../types";

interface SelectProps {
  options: IOption[];
  value: IOption | null;
  onChange: (option: IOption | null) => void;
  isClearable?: boolean;
  placeholder?: string;
}

// Styled components
const Container = styled.div`
  position: relative;
`;

const SelectedValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  color: #374151;
  background-color: #f9fafb;
  cursor: pointer;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 8px;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Adds shadow effect */
`;

const DropdownItem = styled.li<{ highlighted: boolean }>`
  padding: 10px 15px;
  background-color: ${({ highlighted }) => (highlighted ? "#007bff" : "#fff")};
  color: ${({ highlighted }) => (highlighted ? "#fff" : "#000")};
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

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  font-size: 16px;
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
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  isClearable = false,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: IOption) => {
    onChange(option);
    setIsOpen(false);
  };

  // Handle key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (isOpen && options[highlightedIndex]) {
          handleSelectOption(options[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Clear the selected option
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to open dropdown
    onChange(null);
    setIsOpen(false);
  };

  // Close dropdown on outside click
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
        onKeyDown={handleKeyDown} // Now handling keydown events
        tabIndex={0} // Make it focusable for key events
      >
        {value ? value.label : <Placeholder>{placeholder}</Placeholder>}
        <IconsContainer>
          {isClearable && value && (
            <ClearButton onClick={handleClear}>
              <XIcon />
            </ClearButton>
          )}
          <Separator />
          <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </IconsContainer>
      </SelectedValueWrapper>
      {isOpen && (
        <Dropdown>
          {options?.length ? (
            options.map((option, index) => (
              <DropdownItem
                key={option.value}
                highlighted={highlightedIndex === index}
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
