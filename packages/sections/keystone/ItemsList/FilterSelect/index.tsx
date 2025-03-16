import type { FieldMeta } from "@keystone-6/core/types";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@md/components";
import { ChevronDownIcon } from "@keystone-ui/icons";

import type { IOption } from "../../../../types";
import type {
  ConditionType,
  TCondition,
} from "../../utils/data-mapping/mapFilterParameters";
import {
  whereParameterToCondition,
  whereParameterToInput,
} from "../../utils/data-mapping/mapFilterParameters";
import FilterFieldSelectPage from "./filterFieldSelectPage";
import { FilterValuePage } from "./filterValuePage";
import { FilterDropdown, FilterWrapper } from "./styles";
import { upperCaseFirstLetter } from "@md/utils";

interface IFilterSelectProps {
  fields: FieldMeta[];
  whereParameters: Record<string, unknown>;
  onSubmit: (value: {
    forcedQuery?: Record<string, string>;
    inputValues?: Record<string, string | null | undefined>;
    filterConditions?: TCondition;
  }) => void;
}

const FilterSelect = ({
  fields,
  onSubmit,
  whereParameters,
}: IFilterSelectProps) => {
  const defaultInputValues = whereParameterToInput(
    whereParameters as TCondition,
  );
  const [inputValues, setInputValues] = useState<
    Record<string, string | undefined | null>
  >(defaultInputValues || {});
  const defaultFilterConditions = whereParameterToCondition(
    whereParameters as TCondition,
  );
  const [filterConditions, setFilterConditions] = useState<TCondition>(
    defaultFilterConditions || {},
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false); // Open/close the dropdown
  const [selectedField, setSelectedField] = useState<FieldMeta | null>(null); // Selected filter type (field)
  const filterRef = useRef<HTMLDivElement | null>(null); // Reference for click outside

  const selectedPath = upperCaseFirstLetter(selectedField?.path!);

  const closeFilter = () => {
    setSelectedField(null);
    setIsFilterOpen(false);
  };

  const clearFilter = () => {
    closeFilter();
    onSubmit({ forcedQuery: {} });
  };

  const handleSubmit = () => {
    onSubmit({
      inputValues,
      filterConditions,
    });
  };

  // Click outside filter box logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        closeFilter();
      }
    };

    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  // Update inputValues and filterConditions when external values change
  useEffect(() => {
    setInputValues(defaultInputValues || {});
    setFilterConditions(defaultFilterConditions || {});
  }, [whereParameters]);

  // Handle going to second page
  const handleFilterTypeSelect = (field: FieldMeta) => {
    setSelectedField(field);
  };

  const handleFilterConditionChange = (option: IOption | null) => {
    if (!selectedField) return;
    setFilterConditions({
      ...filterConditions, // Previouslty added
      [selectedPath]: option?.value as ConditionType, // New condition
    });
  };

  const handleFilterValueChange = (value: string | IOption) => {
    // Relations field
    if (typeof value === "object") {
      setInputValues({
        ...inputValues,
        [selectedPath]: value.value as string,
      });
    } else {
      // Non relations field
      setInputValues({
        ...inputValues,
        [selectedPath]: value,
      });
    }
  };

  return (
    <FilterWrapper ref={filterRef}>
      <Button tone="active" onClick={() => setIsFilterOpen(!isFilterOpen)}>
        <div className="flex items-center gap-2">
          {/* Same width as in keystone */}
          Filter List <ChevronDownIcon style={{ width: "16px" }} />
        </div>
      </Button>

      {isFilterOpen && (
        <FilterDropdown>
          {!selectedField ? (
            // First page with selection column in table to filter for
            <>
              <FilterFieldSelectPage
                fields={fields}
                inputValues={inputValues}
                onFilterFieldSelect={handleFilterTypeSelect}
              />
              <Button className="w-full" onClick={clearFilter}>
                Clear
              </Button>
            </>
          ) : (
            // Second page with selection filter properties and vilter value
            <FilterValuePage
              field={selectedField}
              onBackClick={() => setSelectedField(null)}
              inputValues={inputValues}
              filterConditions={filterConditions}
              onSelect={handleFilterConditionChange}
              onChange={handleFilterValueChange}
              onCancel={closeFilter}
              onSubmit={handleSubmit}
            />
          )}
        </FilterDropdown>
      )}
    </FilterWrapper>
  );
};

export { FilterSelect };
