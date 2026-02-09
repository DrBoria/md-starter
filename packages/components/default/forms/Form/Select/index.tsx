import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { LucideIcon } from "@md/components/default/common";
import { Input } from "@md/components/default/forms";

export type TOption = {
  label: string;
  value: string | number;
};

// Styled components с использованием темы
const Container = styled.div`
  position: relative;
`;

const SelectedValueWrapper = styled.div<{ $readOnly: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.offsets.elementContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border-style: solid;
  border-width: ${({ theme }) => theme.border.size}px;
  border-color: ${({ theme }) => theme.colors.labelBackground};
  color: ${({ theme }) => theme.colors.sectionContent};
  background-color: ${({ theme }) => theme.colors.section};
  cursor: ${({ $readOnly }) => ($readOnly ? "default" : "pointer")};

  ${({ $readOnly, theme }) =>
    $readOnly &&
    `
    background-color: ${theme.colors.section};
    border-color: ${theme.colors.section};
    color: ${theme.colors.labelBackground};
  `}

  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
    background-color: ${theme.colors.section}; /* Stone lighter */
    background-image: ${theme.effects.texture};
    color: ${theme.colors.sectionContent};
    
    /* Ragged corners */
    clip-path: ${theme.geometry.ragged}; 
    
    /* Border implied by inset shadow */
    box-shadow: 
      inset 0 0 0 1px ${theme.colors.disabled},
      ${theme.effects.depth.inner.medium};
    border: none;

    &:hover {
      /* Subtle Glow on hover */
      box-shadow: inset 0 0 0 1px ${theme.colors.highlighted}, ${theme.effects.glow.soft};
      color: ${theme.colors.highlighted};
    }
  `}
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%; /* Ensure full width */
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.labelBackground};
  max-height: calc(${({ theme }) => theme.elements.form.height} * 6);
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.section};
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: ${({ theme }) => theme.offsets.betweenElements};
  border-radius: ${({ theme }) => theme.border.radius}px;
  z-index: 100;

  /* VIKING THEME OVERRIDE */
  ${({ theme }) => theme.theme === 'viking' && css`
    background-color: ${theme.colors.section};
    background-image: ${theme.effects.texture};
    border: 1px solid ${theme.colors.disabled};
    border-top: none;
    
    /* Floating effect */
    box-shadow: ${theme.effects.depth.outer.medium};
  `}
`;

const DropdownItem = styled.li<{ $highlighted: boolean }>`
  padding: ${({ theme }) => theme.offsets.elementContent};
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.highlighted : theme.colors.section};
  color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.highlightedText : theme.colors.sectionContent};
  font-size: ${({ theme }) => theme.font.sizes.regular};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
  }

  /* VIKING THEME ITEM */
  ${({ theme, $highlighted }) => theme.theme === 'viking' && css`
    color: ${$highlighted ? theme.colors.highlightedText : theme.colors.sectionContent};
    background-color: ${$highlighted ? theme.colors.highlighted : theme.colors.section};
    
    &:hover {
      background-color: ${theme.colors.highlighted};
      color: ${theme.colors.highlightedText};
      box-shadow: ${theme.effects.glow.medium};
    }
  `}
`;

const IconsContainer = styled.div`
  color: ${({ theme }) => theme.colors.labelBackground};
  display: flex;
  gap: ${({ theme }) => theme.offsets.betweenElements};
  padding-left: ${({ theme }) => theme.offsets.betweenElements};
`;

const NoOptions = styled.li`
  padding: ${({ theme }) => theme.offsets.elementContent};
  color: ${({ theme }) => theme.colors.labelBackground};
`;

const ClearButton = styled.button<{ $readOnly: boolean }>`
  background: none;
  border: none;
  cursor: ${({ $readOnly }) => ($readOnly ? "default" : "pointer")};
  margin-left: ${({ theme }) => theme.offsets.betweenElements};
  font-size: ${({ theme }) => theme.font.sizes.regular};
  color: ${({ $readOnly, theme }) => ($readOnly ? theme.colors.labelBackground : theme.colors.sectionContent)};
`;

const Separator = styled.div`
  width: ${({ theme }) => theme.border.size}px;
  background-color: ${({ theme }) => theme.colors.labelBackground};
  margin-bottom: ${({ theme }) => theme.offsets.betweenElements};
  margin-top: ${({ theme }) => theme.offsets.betweenElements};
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  color: ${({ theme }) => theme?.colors?.labelBackground};
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
        $readOnly={readOnly}
      >
        {value ? value.label : <Placeholder>{placeholder}</Placeholder>}
        <IconsContainer>
          {isClearable && value && (
            <ClearButton onClick={handleClear} $readOnly={readOnly}>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
export default Select;
