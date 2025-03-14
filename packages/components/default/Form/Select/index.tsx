import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LucideIcon } from "../../Icons";
import { Input } from "../Input";

export type TOption = {
  label: string;
  value: string | number;
};

// Styled components с использованием темы
const Container = styled.div`
  position: relative;
`;

const SelectedValueWrapper = styled.div<{ readOnly: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile};
  border-radius: ${({ theme }) => theme.variables.border.radius};
  border-style: solid;
  border-width: ${({ theme }) => theme.variables.border.size};
  border-color: ${({ theme }) => theme.colors.label};
  color: ${({ theme }) => theme.colors.sectionContent};
  background-color: ${({ theme }) => theme.colors.section};
  cursor: ${({ readOnly }) => (readOnly ? "default" : "pointer")};

  ${({ readOnly, theme }) =>
    readOnly &&
    `
    background-color: ${theme.colors.section};
    border-color: ${theme.colors.section};
    color: ${theme.colors.label};
  `}
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  border: ${({ theme }) => theme.variables.border.size} solid ${({ theme }) => theme.colors.label};
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.section};
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: ${({ theme }) => theme.variables.offsets.betweenElements.mobile};
  border-radius: ${({ theme }) => theme.variables.border.radius};
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows?.dropdown || "0px 4px 8px rgba(0, 0, 0, 0.1)"};
`;

const DropdownItem = styled.li<{ $highlighted: boolean }>`
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile};
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.highlighted : theme.colors.section};
  color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.highlightedText : theme.colors.sectionContent};
  font-size: ${({ theme }) => theme.font.size};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
  }
`;

const IconsContainer = styled.div`
  color: ${({ theme }) => theme.colors.label};
  display: flex;
  gap: ${({ theme }) => theme.variables.offsets.betweenElements.mobile};
  padding-left: ${({ theme }) => theme.variables.offsets.betweenElements.mobile};
`;

const NoOptions = styled.li`
  padding: ${({ theme }) => theme.variables.offsets.elementContent.mobile};
  color: ${({ theme }) => theme.colors.label};
`;

const ClearButton = styled.button<{ readOnly: boolean }>`
  background: none;
  border: none;
  cursor: ${({ readOnly }) => (readOnly ? "default" : "pointer")};
  margin-left: 5px;
  font-size: 16px;
  color: ${({ readOnly, theme }) => (readOnly ? theme.colors.label : "inherit")};
`;

const Separator = styled.div`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.label};
  margin-bottom: ${({ theme }) => theme.variables.offsets.betweenElements.mobile};
  margin-top: ${({ theme }) => theme.variables.offsets.betweenElements.mobile};
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.label};
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
    setSearchTerm("");
  };

  const handleSelectOption = (option: TOption) => {
    if (readOnly) return;
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!readOnly) {
      onChange(null);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
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
    option.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
            {isOpen ? <LucideIcon name="ChevronUp" /> : <LucideIcon name="ChevronDown" />}
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
