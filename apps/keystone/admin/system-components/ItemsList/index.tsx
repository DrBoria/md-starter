import type { DeserializedValue, Value } from "@keystone-6/core/admin-ui/utils";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useToasts } from "@keystone-ui/toast";

import { PlainText, Pagination, Input, Select, Button } from "@md/components";
import { Checkbox } from "@md/components/keystone";
import { DeleteTemplate } from "../../sections/Modals/CentralModal";

import type { IGraphQLObject, IOption } from "../../../types";
import { ModalData, TModalData, useGlobalVariable } from "../../state";

import type { TOrderBy } from "../utils/getNextSortOrder";
import { lowerCaseFirstLetter } from "../../../utils/lowerCaseFirstLetter";
import { toKebabCase } from "../../../utils/toKebabCase";
import { getGQLFields } from "../utils/data-mapping/getGQLFields";

import { getFieldType } from "../../queries/getFieldType";
import { useDeleteMutation } from "../../queries/useDeleteMutation";
import {
  Condition,
  toWhereParameter,
} from "../utils/data-mapping/toWhereParameters";
import { getNextSortOrder } from "../utils/getNextSortOrder";
import { useFieldsData } from "../utils/useFieldsData";

import { FilterSelect } from "./FilterSelect";
import { EditableCell } from "./EditableCell";
import { ViewCell } from "./ViewCell";

import { HeaderCell, Row, Table } from "./styles";
import { OneLineContainer } from "@md/components";

interface IItemsList {
  listName: string;
  displayedFields?: string[];
  /** Keystone uses only readonly cells, 'isEditable' property allows edit fields inside list by double click on cell */
  isEditable?: boolean;
  timestamp?: Date | null;
  // TODO: remove field after new design will be applied
  withFullSupport?: boolean;
  withPagination?: boolean;
  withFilter?: boolean;
}

// Define the options for item display count
const displayOptions: IOption[] = [
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

const ItemsList = ({
  listName,
  displayedFields,
  isEditable,
  timestamp,
  withFullSupport,
  withPagination,
  withFilter,
}: IItemsList) => {
  const toasts = useToasts();
  const prevFieldsValueRef = useRef<DeserializedValue>();
  const [_, setModalData] = useGlobalVariable<TModalData>(
    ModalData,
    "ModalData",
  );

  // This values will be passed to queries
  const minLimit = 20;
  const [limit, setLimit] = useState<number>(minLimit); // Set the initial limit to 20
  const [where, setWhere] = useState<Record<string, unknown>>();
  const [orderBy, setOrderBy] = useState<TOrderBy>();
  const [skip, setSkip] = useState<number>(0); // Pagination

  // Search state
  const [searchValue, setSearchValue] = useState("");

  // Filter state
  const [inputValues, setInputValues] = useState<
    Record<string, string | undefined | null>
  >({});
  const [filterConditions, setFilterConditions] = useState<Condition>({});
  // Deletion state
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  // Handle limit change
  const handleLimitChange = (option: IOption | null) => {
    if (option) {
      setLimit(Number(option.value));
      setSkip(0); // Reset pagination when limit changes
    }
  };

  const {
    list,
    refetch,
    listItemData,
    itemGetter,
    onFieldChange,
    onUpdate,
    fieldsValue,
  } = useFieldsData({ listName, where, orderBy, limit, skip });
  const listData = listItemData?.items || [];

  const { deleteMutation } = useDeleteMutation<{ items: [{ id: string }] }>(
    listName,
  );

  useEffect(() => {
    void refetch();
  }, [timestamp]);

  useEffect(() => {
    if (prevFieldsValueRef.current !== fieldsValue) {
      if (prevFieldsValueRef.current) {
        void onUpdate();
      }
      prevFieldsValueRef.current = fieldsValue;
    }
  }, [fieldsValue]);

  const itemListRow = (element: IGraphQLObject) => {
    const onEditCell = (id: string) => (data: (value: Value) => Value) => {
      // Update field state
      onFieldChange(data, id);
    };

    const fieldsToDisplay = displayedFields || getGQLFields(element);
    const listRow = fieldsToDisplay.map((gqlElement, index) => {
      // Switch between editable cell (on double click text becomes input with value) and non editable (plain text without options to edit on this page)
      return isEditable ? (
        <EditableCell
          key={index}
          gqlElement={gqlElement}
          element={element}
          itemGetter={itemGetter}
          onChange={onEditCell(element.id)}
          list={list}
        />
      ) : (
        <ViewCell
          key={index}
          gqlElement={gqlElement}
          element={element}
          list={list}
          linkTo={index === 0 ? `/${toKebabCase(listName)}s/${element.id}` : ""}
        />
      );
    });
    return listRow;
  };

  // HANDLE INPUT SEARCH
  const handleSearch = () => {
    const textFields = displayedFields?.filter(
      (fieldName) => getFieldType(list.fields[fieldName]) === "string",
    );

    const whereParameters =
      toWhereParameter(inputValues, filterConditions) || {};
    setWhere({
      // here is the filter parameters
      ...whereParameters,
      // here is the global search parameters across all text fields in table
      OR: searchValue
        ? textFields?.map((fieldName) => ({
            [lowerCaseFirstLetter(fieldName)]: {
              contains: searchValue,
              mode: "insensitive",
            },
          }))
        : {},
    });
  };

  // HANDLE SORT
  const handleOrderBy = (name: string) => {
    setOrderBy({
      [name]: getNextSortOrder(name, orderBy),
    });
  };

  // HANDLE CHECKBOX LOGIC
  const handleCheckboxChange = (id: string | null, isChecked: boolean) => {
    if (id === null) {
      // Handle global checkbox change
      if (isChecked && Array.isArray(listData)) {
        const allIds = listData.map((element: IGraphQLObject) => element.id);
        setSelectedForDelete(allIds);
      } else {
        setSelectedForDelete([]);
      }
      setAllChecked(isChecked);
    } else {
      // Handle individual checkbox change
      setSelectedForDelete((prevSelected) => {
        const updatedSelection = isChecked
          ? [...prevSelected, id]
          : prevSelected.filter((selectedId) => selectedId !== id);

        // If all items are selected, check the global checkbox
        setAllChecked(updatedSelection.length === listData.length);
        return updatedSelection;
      });
    }
  };

  const showPopupBeforeDelete = () => {
    setModalData({
      content: (
        <DeleteTemplate
          item={listName}
          onCancel={() => setModalData(null)}
          onDelete={handleDeleteSelected}
        />
      ),
    });
  };

  const handleDeleteSelected = async () => {
    setModalData(null);
    await deleteMutation(selectedForDelete);
    toasts.addToast({
      tone: "positive",
      title: `Deleted ${selectedForDelete.length} ${listName}s`,
    });
    setSelectedForDelete([]);
    setAllChecked(false);
    void refetch();
  };

  const itemsCount = listItemData?.itemsCount as unknown as number;
  const shouldShowPagination = withPagination && itemsCount > minLimit;

  return (
    <Table>
      {withFullSupport && (
        <>
          <OneLineContainer>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button onClick={handleSearch}>Search</Button>
            {withFilter && displayedFields && (
              <FilterSelect
                fields={displayedFields.map(
                  (fieldName) => list.fields[fieldName],
                )}
                inputValues={inputValues}
                filterConditions={filterConditions}
                onSelect={setFilterConditions}
                onChange={setInputValues}
                onSubmit={handleSearch}
              />
            )}
          </OneLineContainer>

          {/* Deletion is visible only if any element is selected */}
          {selectedForDelete.length ? (
            <OneLineContainer width='1/2'>
              <PlainText>
                Delete {selectedForDelete.length} {listName}s
              </PlainText>
              <Button tone="negative" onClick={showPopupBeforeDelete}>
                Delete
              </Button>
            </OneLineContainer>
          ) : null}
        </>
      )}

      {/* TABLE HEADER */}
      <Row>
        {/* GLOBAL SELECT */}
        {withFullSupport && (
          <Checkbox
            checked={allChecked}
            onChange={(e) => handleCheckboxChange(null, e.target.checked)}
          >
            {null}
          </Checkbox>
        )}

        {displayedFields?.map((element, index) => {
          // It's not possible to sort relations, files etc.
          const fieldType = getFieldType(list.fields[element]);
          const isSortable = ["boolean", "number", "string", "date"].includes(
            fieldType,
          );

          return (
            <HeaderCell
              key={index}
              isSortable={isSortable}
              sortOrder={orderBy?.[element]}
              onSortChange={() => isSortable && handleOrderBy(element)}
            >
              {element}
            </HeaderCell>
          );
        })}
      </Row>

      {/* TABLE BODY */}
      {Array.isArray(listData)
        ? listData.map((element: IGraphQLObject) => (
            <Row key={element.id}>
              {/* SELECT CHECKBOX */}
              {withFullSupport && (
                <Checkbox
                  checked={selectedForDelete.includes(element.id)}
                  onChange={(e) =>
                    handleCheckboxChange(element.id, e.target.checked)
                  }
                >
                  {null}
                </Checkbox>
              )}
              {/* REST COLUMNS */}
              {itemListRow(element)}
            </Row>
          ))
        : null}

      {shouldShowPagination && (
        <div className="flex items-center justify-center">
          <Pagination
            totalPages={Math.ceil(itemsCount / limit)}
            currentPage={skip / limit + 1}
            onPageChange={(pageNumber: number) => setSkip((pageNumber - 1) * limit)}
          />
          <Select
            options={displayOptions}
            value={
              displayOptions.find((option) => option.value === limit) || null
            }
            onChange={handleLimitChange}
            placeholder="Select items per page"
          />
        </div>
      )}
    </Table>
  );
};

ItemsList.displayName = "List Example";

export { ItemsList };
