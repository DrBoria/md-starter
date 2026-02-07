import type { FieldMeta } from "@keystone-6/core/types";
import React from "react";

import type { IOption } from "@md/types";
import type { TCondition } from "@md/sections/keystone/common/utils/data-mapping/mapFilterParameters";
import { Button, Input, Select } from "@md/components";
import { toRelationSelect } from "@md/sections/keystone/common/utils/data-mapping/toRelationSelect";
import { BackButton, FilterTitle } from "./styles";
import { getOptionsByFilterType } from "./utils";
import { upperCaseFirstLetter } from "@md/utils";
import { getFieldType, useQueryList } from "@md/api/graphql";
import type { QueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";

interface IRelationFieldController {
  refListKey: string;
  refLabelField: string;
}

interface IFilterSelectProps {
  field: FieldMeta;
  inputValues: Record<string, string | undefined | null>;
  filterConditions: TCondition;
  onBackClick: () => void;
  onSelect: (value: IOption | null) => void;
  onChange: (value: string | IOption) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const FilterValuePage = ({
  field,
  onBackClick,
  onSelect,
  onChange,
  onSubmit,
  onCancel,
  inputValues,
  filterConditions,
}: IFilterSelectProps) => {
  if (!field) return null; // Safety check
  let relationsOptions;
  let relationsValue;
  let selectOptions;
  let selectValue;

  const options = getOptionsByFilterType(field);
  const fieldType = getFieldType(field);
  const controller = field.controller as unknown as IRelationFieldController;
  const fieldLabel = field.label;
  const fieldPath = upperCaseFirstLetter(field.path);

  // For relation field we need to display all existing objects to make user see readable fields, not Id's
  if (fieldType === "relation") {
    const response = useQueryList<QueryResult<{
      items: [unknown];
    }>>({
      listName: controller.refListKey,
      selectedFields: `id ${controller.refLabelField}`,
      useQuery
    });
    relationsOptions = response.data?.items.map(toRelationSelect);

    relationsValue = relationsOptions?.find(
      (option) => option.value === inputValues[fieldPath],
    );
  }

  if (fieldType === "select") {
    selectOptions = (field.fieldMeta as { options?: IOption[] } | undefined)?.options;
    selectValue = selectOptions?.filter(
      (option: IOption) => option.value === inputValues[fieldPath],
    )[0];
  }

  const filterConditionValue = options.find(
    (option) => option.value === filterConditions[fieldPath],
  );

  const handleRelationsChange = (value: IOption | string) => {
    onSelect(options[0]); // User don't need to select option, relations got only matches option
    onChange(value);
  };

  return (
    <>
      <BackButton onClick={() => onBackClick()}>← Back</BackButton>
      <div className="flex flex-col gap-2 justify-start">
        <FilterTitle>Filter by {field.label}</FilterTitle>
        <Select
          // For relations field there could be only one option - 'Matches'
          value={fieldType === "relation" ? options[0] : filterConditionValue}
          options={options}
          onChange={onSelect}
        />
        {(fieldType === "string" || fieldType === "number") && (
          <Input
            placeholder={`Enter ${fieldLabel}`}
            value={inputValues[fieldPath]!}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {fieldType === "relation" && relationsOptions && (
          <Select
            value={relationsValue as IOption}
            onChange={handleRelationsChange as (option: IOption | null) => void}
            options={relationsOptions}
          />
        )}
        {fieldType === "select" && (
          <Select
            value={selectValue as IOption}
            onChange={onChange as (option: IOption | null) => void}
            options={(field.fieldMeta as { options?: IOption[] } | undefined)?.options || []}
          />
        )}
        <div className="flex justify-between pt-2">
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button weight="bold" tone="active" onClick={() => onSubmit()}>
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};

export { FilterValuePage };
