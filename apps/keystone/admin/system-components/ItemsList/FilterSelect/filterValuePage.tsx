import React from "react";
import { FieldMeta } from "@keystone-6/core/types";

import { IOption } from "../../../../types";
import { Button, Input, Select } from "@md/components";
import { getFieldType } from "../../../queries/getFieldType";
import { useQueryList } from "../../../queries/useQueryList";
import { toRelationSelect } from "../../utils/data-mapping/toRelationSelect";
import { Condition } from "../../utils/data-mapping/toWhereParameters";
import { BackButton, FilterTitle } from "./styles";
import { getOptionsByFilterType } from "./utils";

interface IRelationFieldController {
  refListKey: string;
  refLabelField: string;
}

interface IFilterSelectProps {
  field: FieldMeta;
  inputValues: Record<string, string | undefined | null>;
  filterConditions: Condition;
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

  const options = getOptionsByFilterType(field);
  const fieldType = getFieldType(field);
  const controller = field.controller as unknown as IRelationFieldController;

  // For relation field we need to display all existing objects to make user see readable fields, not Id's
  if (fieldType === "relation") {
    const response = useQueryList<{
      items: [unknown];
    }>({
      listName: controller.refListKey,
      selectedFields: `id ${controller.refLabelField}`,
    });
    relationsOptions = response.data?.items.map(toRelationSelect);
    relationsValue = relationsOptions?.filter(
      (option) => option.value === inputValues[field.label],
    )[0];
  }

  const filterConditionValue = options.filter(
    (option) => option.value === filterConditions[field.label],
  )[0];

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
            placeholder={`Enter ${field.label}`}
            value={inputValues[field.label]!}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {fieldType === "relation" && relationsOptions && (
          <Select
            value={relationsValue as IOption}
            // @ts-ignore - StyledSelect expects (option: IOption) => void, and not string | IOption
            onChange={onChange}
            options={relationsOptions}
          />
        )}
        <div className="flex justify-between pt-2">
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button weight="bold" tone="active" onClick={onSubmit}>
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};

export { FilterValuePage };
