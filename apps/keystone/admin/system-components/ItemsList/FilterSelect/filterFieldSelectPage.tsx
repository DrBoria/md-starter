import React, { useState } from "react";
import { FieldMeta } from "@keystone-6/core/types";
import { ChevronRightIcon } from "@keystone-ui/icons";

import { Button, ColumnsContainer, Input } from "@md/components";
import { getFieldType } from "../../../queries/getFieldType";
import { SectionTitle } from "@md/components/default/Typography";

interface IFilterFieldSelectPageProps {
  fields: FieldMeta[];
  inputValues: Record<string, string | undefined | null>;
  onFilterFieldSelect: (field: FieldMeta) => void;
}

const availableFilterTypes = ["number", "relation", "boolean", "string"];

const FilterFieldSelectPage = ({
  fields,
  onFilterFieldSelect,
  inputValues,
}: IFilterFieldSelectPageProps) => {
  const [filterText, setFilterText] = useState("");

  // Filter fields based on the filter text entered in the input
  const filteredFields = fields
    .filter((field) => availableFilterTypes.includes(getFieldType(field)))
    .filter((field) =>
      field.label.toLowerCase().includes(filterText.toLowerCase()),
    );

  return (
    <>
      <SectionTitle offsetBottom>Filter</SectionTitle>
      {/* Filter Bar at the top */}
      <ColumnsContainer $colsRatio={['1fr']} offsetBottom>
        <Input
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Select..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </ColumnsContainer>
      {/* Filter options */}
      <ColumnsContainer $colsRatio={['1fr']}>
        {filteredFields.map((field, index) => (
          <Button
            key={index}
            onClick={() => onFilterFieldSelect(field)}
            offsetBottom
          >
            <span
              className={`${inputValues[field.label] ? "text-blue-500" : ""}`}
            >
              {field.label}
            </span>
            <ChevronRightIcon />
          </Button>
        ))}
      </ColumnsContainer>
    </>
  );
};

export default FilterFieldSelectPage;
