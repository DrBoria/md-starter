import type {
  DataGetter,
  ItemData,
  Value,
} from "@keystone-6/core/admin-ui/utils";
import type { ListMeta } from "@keystone-6/core/types";
import React, { useMemo, useState } from "react";
import { deserializeValue } from "@keystone-6/core/admin-ui/utils";

import type { IGraphQLObject } from "../../../../types";

interface EditableCellProps {
  element: IGraphQLObject;
  itemGetter: DataGetter<ItemData>;
  list: ListMeta;
  gqlElement: string;
  onChange: (data: (value: Value) => Value) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  element,
  itemGetter,
  list,
  gqlElement,
  onChange,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  // Each field in list contains react component to display itself (list.fields.FieldName.view.Cell + Field + CardValue)
  const field = list.fields[gqlElement];
  const Cell = field?.views?.Cell;
  const Field = field?.views?.Field;

  const value = deserializeValue(list.fields, itemGetter);
  const fieldValue = value[field?.path];
  let actualValue: unknown;

  if (fieldValue?.kind === "value") {
    actualValue = fieldValue.value;
  } else {
    return null;
  }

  const handleChange = useMemo(() => {
    if (!onChange) return undefined;
    return (newValue: Value) => {
      onChange((val: Value) => ({
        ...val,
        [field.controller.path]: { kind: "value", value: newValue },
      }));
    };
  }, [onChange, field.controller.path]);

  return (
    <div onDoubleClick={() => setIsEdit(!isEdit)}>
      {isEdit ? (
        <Field
          field={field.controller}
          value={actualValue}
          itemValue={"it's required but not used"}
          onChange={handleChange}
        />
      ) : (
        <Cell field={field.controller} item={element} linkTo={undefined} />
      )}
    </div>
  );
};

export { EditableCell };
