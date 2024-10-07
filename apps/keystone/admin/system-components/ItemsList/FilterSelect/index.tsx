import type { FieldMeta } from "@keystone-6/core/types";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@keystone-ui/button";
import { ChevronDownIcon } from "@keystone-ui/icons";

import { IOption } from "../../../../types";
import {
  Condition,
  ConditionType,
} from "../../utils/data-mapping/toWhereParameters";
import FilterFieldSelectPage from "./filterFieldSelectPage";
import { FilterValuePage } from "./filterValuePage";
import { FilterDropdown, FilterWrapper } from "./styles";

interface IFilterSelectProps {
  fields: FieldMeta[];
  inputValues: Record<string, string | undefined | null>;
  filterConditions: Condition;
  onChange: (value: Record<string, string | undefined | null>) => void;
  onSelect: (value: Condition) => void;
  onSubmit: () => void;
}

const FilterSelect = ({
  fields,
  onChange,
  onSelect,
  onSubmit,
  inputValues,
  filterConditions,
}: IFilterSelectProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Open/close the dropdown
  const [selectedField, setSelectedField] = useState<FieldMeta | null>(null); // Selected filter type (field)
  const filterRef = useRef<HTMLDivElement | null>(null); // Reference for click outside

  const cancelFiltering = () => {
    setSelectedField(null);
    setIsFilterOpen(false);
  };

  // Click outside filter box logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        cancelFiltering();
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  // Handle going to second page
  const handleFilterTypeSelect = (field: FieldMeta) => {
    setSelectedField(field);
  };

  const handleFilterConditionChange = (option: IOption | null) => {
    if (!selectedField) return;
    onSelect({
      ...filterConditions, // Previouslty added
      [selectedField.label]: option?.value as ConditionType, // New condition
    });
  };

  const handleFilterValueChange = (value: string | IOption) => {
    // Relations field
    if (typeof value === "object") {
      onChange({
        ...inputValues,
        [selectedField?.label as string]: value.value as string,
      });
    } else {
      // Non relations field
      onChange({
        ...inputValues,
        [selectedField?.label as string]: value,
      });
    }
  };

  return (
    <FilterWrapper ref={filterRef}>
      <Button tone="active" onClick={() => setIsFilterOpen(!isFilterOpen)}>
        {/* Same width as in keystone */}
        <div className="flex items-center gap-2">
          Filter List <ChevronDownIcon style={{ width: "16px" }} />
        </div>
      </Button>

      {isFilterOpen && (
        <FilterDropdown>
          {!selectedField ? (
            // First page with selection column in table to filter for
            <FilterFieldSelectPage
              fields={fields}
              inputValues={inputValues}
              onFilterFieldSelect={handleFilterTypeSelect}
            />
          ) : (
            // Second page with selection filter properties and vilter value
            <FilterValuePage
              field={selectedField}
              onBackClick={() => setSelectedField(null)}
              inputValues={inputValues}
              filterConditions={filterConditions}
              onSelect={handleFilterConditionChange}
              onChange={handleFilterValueChange}
              onCancel={cancelFiltering}
              onSubmit={onSubmit}
            />
          )}
        </FilterDropdown>
      )}
    </FilterWrapper>
  );
};

export { FilterSelect };
