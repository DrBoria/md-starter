import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "@keystone-ui/icons";
import styled from "styled-components";

import type { IOption } from "@md/types";

interface SelectProps {
  options: IOption[];
  value: IOption | null;
  onChange: (option: IOption | null) => void;
  isClearable?: boolean;
  placeholder?: string;
}

const Container = styled.div`
  position: relative;
`;

const SelectedValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border-style: solid;
  border-width: ${({ theme }) => theme.border.size}px;
  color: ${({ theme }) => theme.colors.sectionContent};
  background-color: ${({ theme }) => theme.colors.section};
  cursor: pointer;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  max-height: ${({ theme }) => theme.elements.form.height};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.section};
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: ${({ theme }) => theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const DropdownItem = styled.li<{ $highlighted: boolean }>`
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: ${({ $highlighted, theme }) => ($highlighted ? theme.colors.highlighted : theme.colors.section)};
  color: ${({ $highlighted, theme }) => ($highlighted ? theme.colors.highlightedText : theme.colors.sectionContent)};
  font-size: ${({ theme }) => theme.font.sizes.regular};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
  }
`;

const IconsContainer = styled.div`
  color: ${({ theme }) => theme.colors.disabled};
  display: flex;
  gap: ${({ theme }) => theme.offsets.elementContent};
  padding-left: ${({ theme }) => theme.offsets.elementContent};
`;

const NoOptions = styled.li`
  padding: ${({ theme }) => theme.offsets.elementContent};
  color: ${({ theme }) => theme.colors.disabled};
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.offsets.elementContent};
  font-size: ${({ theme }) => theme.font.sizes.regular};
`;

const Separator = styled.div`
  width: ${({ theme }) => theme.border.size}px;
  background-color: ${({ theme }) => theme.colors.disabled};
  margin-bottom: ${({ theme }) => theme.offsets.elementContent};
  margin-top: ${({ theme }) => theme.offsets.elementContent};
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.disabled};
`;
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  isClearable = false,
  placeholder = "Select an option",
}) => {
  const [$isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!$isOpen);
  };

  const handleSelectOption = (option: IOption) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if ($isOpen && options[highlightedIndex]) {
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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setIsOpen(false);
  };

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
      >
        {value ? value.label : <Placeholder>{placeholder}</Placeholder>}
        <IconsContainer>
          {isClearable && value && (
            <ClearButton onClick={handleClear}>
              <XIcon />
            </ClearButton>
          )}
          <Separator />
          <span>{$isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </IconsContainer>
      </SelectedValueWrapper>
      {$isOpen && (
        <Dropdown>
          {options?.length ? (
            options.map((option, index) => (
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
