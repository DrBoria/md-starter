import type { FieldMeta } from "@keystone-6/core/types";
import React, { useState } from "react";
import { ChevronRightIcon } from "@keystone-ui/icons";

import { Input } from "@md/components";
import { FilterTitle } from "./styles";
import { getFieldType } from "@md/api/graphql";
import { upperCaseFirstLetter } from "@md/utils";

interface IFilterFieldSelectPageProps {
  fields: FieldMeta[];
  inputValues: Record<string, string | undefined | null>;
  onFilterFieldSelect: (field: FieldMeta) => void;
}

const availableFilterTypes = [
  "number",
  "relation",
  "select",
  "boolean",
  "string",
];

const FilterFieldSelectPage = ({
  fields,
  onFilterFieldSelect,
  inputValues,
}: IFilterFieldSelectPageProps) => {
  const [filterText, setFilterText] = useState("");

  // Filter fields based on the filter text entered in the input
  const filteredFields = fields
    .filter((field) => availableFilterTypes.includes(getFieldType(field)))
    .filter((field) => field.label.includes(filterText));

  return (
    <>
      <FilterTitle className="text-center">Filter</FilterTitle>
      {/* Filter Bar at the top */}
      <div className="p-2">
        <Input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Select..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Filter options */}
      <div className="divide-y">
        {filteredFields.map((field, index) => (
          <button
            key={index}
            onClick={() => onFilterFieldSelect(field)}
            className={
              "w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-100"
            }
          >
            <span
              className={`${inputValues[upperCaseFirstLetter(field.path)] ? "text-blue-500" : ""}`}
            >
              {field.label}
            </span>
            <ChevronRightIcon />
          </button>
        ))}
      </div>
    </>
  );
};

export default FilterFieldSelectPage;
