import type { DeserializedValue, Value } from "@keystone-6/core/admin-ui/utils";
import type { KeyboardEvent } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Button, useLogger } from "@md/components";
import { ArrowRightIcon } from "@keystone-ui/icons";

import type { IGraphQLObject, IOption } from "../../../types";
import type { TCondition } from "../utils/data-mapping/mapFilterParameters";
import type { TOrderBy } from "../utils/getNextSortOrder";
import { toKebabCase, lowerCaseFirstLetter } from "@md/utils";
import { Pagination, Loading, Input, Select, PlainText, SectionTitle, Link } from "@md/components";
import { Label, Checkbox } from "@md/components/keystone";
import { getFieldType, useDeleteMutation } from "@md/api/graphql";
import { getGQLFields } from "../utils/data-mapping/getGQLFields";
import {
  filterToPath,
  filterToWhereParameters,
  parseQuery,
  pathToFilter,
  pathToWhereParameters,
} from "../utils/data-mapping/mapFilterParameters";
import { getNextSortOrder } from "../utils/getNextSortOrder";
import { useFieldsData } from "../utils/useFieldsData";
import { EditableCell } from "./EditableCell";
import { FilterSelect } from "./FilterSelect";
import {
  BodyCell,
  HeaderCell,
  ItemsTableContainer,
  Row,
  SearchBarContainer,
  Table,
  TableHeader,
} from "./styles";
import { ViewCell } from "./ViewCell";
import { DeleteTemplate } from "../Modals/templates";
import { NotFoundSection } from "../NotFoundSection";
import { useMutation } from "@apollo/client";

interface FieldLabel {
  field: string;
  label: string;
}

interface ItemsTableProps {
  listName: string;
  tableTitle?: React.ReactNode;
  fieldsToRender?: string[];
  fieldLabels?: FieldLabel[];
  isEditable?: boolean;
  isLoading?: boolean;
  timestamp?: Date | null;
  // TODO: remove field after new design will be applied
  withFullSupport?: boolean;
  withPagination?: boolean;
  withFilter?: boolean;
  initialFilter?: Record<string, unknown>;
  initialOrderBy?: TOrderBy;
  linkPrefix?: string;
  label?: string;
  onDelete?: () => void;
  GlobalVars?: { ModalData: unknown };
}

// Define the options for item display count
const displayOptions: IOption[] = [
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

export const ItemsList = ({
  listName,
  tableTitle,
  fieldsToRender,
  fieldLabels,
  isEditable,
  timestamp,
  isLoading,
  withFullSupport,
  withPagination,
  withFilter,
  initialFilter,
  initialOrderBy,
  linkPrefix,
  label,
  onDelete,
  GlobalVars,
}: ItemsTableProps) => {
  const { query, push, pathname } = useRouter();
  const searchParams = useSearchParams();
  const logger = useLogger();
  const prevFieldsValueRef = useRef<DeserializedValue>();

  // This values will be passed to queries
  const minLimit = 20;

  const [limit, setLimit] = useState<number>(minLimit); // Set the initial limit to 20
  const [where, setWhere] = useState<Record<string, unknown>>(
    pathToWhereParameters(query as Record<string, string>) || {},
  );
  const [orderBy, setOrderBy] = useState<TOrderBy | undefined>(
    initialOrderBy || undefined,
  );
  const [skip, setSkip] = useState<number>(0); // Pagination

  // Search state
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { readableConditions: readableQueryParameters } = parseQuery(
    query as Record<string, string>,
  );

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
  } = useFieldsData({
    listName: listName,
    where: { ...initialFilter, ...where },
    orderBy,
    limit,
    skip,
  });
  const tableData = listItemData?.items || [];

  const { deleteMutation } = useDeleteMutation(
    listName,
    useMutation
  );

  const textFields = fieldsToRender?.filter(
    (fieldName) => getFieldType(list.fields[fieldName]) === "string",
  );

  useEffect(() => {
    // We need to know list of all fields, that's why execution is inside use effect
    if (query?.search) {
      setWhere({
        ...where,
        OR: textFields?.map((fieldName) => ({
          [lowerCaseFirstLetter(fieldName)]: {
            contains: query?.search,
            mode: "insensitive",
          },
        })),
      });
    }
  }, []);

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

  const itemTableRow = (element: IGraphQLObject) => {
    const onEditCell = (id: string) => (data: (value: Value) => Value) => {
      // Update field state
      onFieldChange(data, id);
    };

    const fieldsToDisplay = fieldsToRender || getGQLFields(element);
    const tableRow = fieldsToDisplay.map((gqlElement, index) => {
      const linkToElement = linkPrefix
        ? `${linkPrefix}/${element.id}`
        : `/${toKebabCase(listName)}s/${element.id}`;
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
          linkTo={index === 0 ? linkToElement : ""}
        />
      );
    });
    return tableRow;
  };

  // HANDLE INPUT SEARCH
  const handleSearch = ({
    inputValues,
    filterConditions,
    forcedQuery,
  }: {
    inputValues?: Record<string, string | null | undefined>;
    filterConditions?: TCondition;
    forcedQuery?: Record<string, string>;
  } = {}) => {
    const filterParameters =
      filterToWhereParameters(inputValues!, filterConditions!) || {};
    const filterValue = {
      ...pathToWhereParameters(
        forcedQuery || (query as Record<string, string>),
      ),
      ...filterParameters,
    };

    setWhere({
      ...filterValue,
      OR: searchValue
        ? textFields?.map((fieldName) => ({
          [lowerCaseFirstLetter(fieldName)]: {
            contains: searchValue,
            mode: "insensitive",
          },
        }))
        : {},
    });

    const pathQuery = filterToPath(inputValues, filterConditions);
    const updatedParams = new URLSearchParams(searchParams.toString());

    const currentSearchValue = searchValue ?? query.search;

    if (searchValue) {
      updatedParams.set("search", searchValue);
    } else if (!currentSearchValue) {
      updatedParams.delete("search");
    }

    const queryParameters = `${[pathQuery ? `${pathQuery}${currentSearchValue ? `&search=${currentSearchValue}` : ""}` : updatedParams].filter(Boolean).join("&")}`;
    void push({ pathname, query: forcedQuery || queryParameters });
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
      if (isChecked && Array.isArray(tableData)) {
        const allIds = tableData.map((element: IGraphQLObject) => element.id);
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
        setAllChecked(updatedSelection.length === tableData.length);
        return updatedSelection;
      });
    }
  };

  const handleRemoveQueryParameter = async (key: string) => {
    // Clone the current query parameters
    const updatedQuery = { ...query };

    // Remove all query parameters that start with the given key
    Object.keys(updatedQuery).forEach((paramKey) => {
      if (paramKey.toLowerCase().startsWith(`${key.toLowerCase()}_`)) {
        delete updatedQuery[paramKey];
      }
    });

    // Push the updated query back to the router
    await push({
      pathname,
      query: updatedQuery,
    });

    // Update the search with the new query parameters
    handleSearch({ forcedQuery: updatedQuery as Record<string, string> });
  };

  const showPopupBeforeDelete = () => {
    if (GlobalVars) {
      GlobalVars.ModalData = {
        content: (
          <DeleteTemplate
            item={listName}
            onCancel={() => GlobalVars.ModalData = null}
            onDelete={handleDeleteSelected}
          />
        ),
      };
    }
  };

  const handleDeleteSelected = async () => {
    if (GlobalVars) {
      GlobalVars.ModalData = null;
    }

    await deleteMutation(selectedForDelete);
    logger.add({
      tone: "positive",
      title: `Deleted ${selectedForDelete.length} ${listName}s`,
    });
    setSelectedForDelete([]);
    setAllChecked(false);
    onDelete?.();
    void refetch();
  };

  const itemsCount = listItemData?.itemsCount as unknown as number;
  const shouldShowPagination = withPagination && itemsCount > minLimit;

  return (
    <ItemsTableContainer>
      <TableHeader>
        {tableTitle && <SectionTitle>{tableTitle}</SectionTitle>}
        {withFullSupport && (
          <>
            {/* Deletion is visible only if any element is selected */}
            {selectedForDelete.length ? (
              <div className="flex gap-5 items-center">
                <PlainText>
                  Delete {selectedForDelete.length} {listName}s
                </PlainText>
                <Button tone="negative" onClick={showPopupBeforeDelete}>
                  Delete
                </Button>
              </div>
            ) : null}

            {Object.entries(readableQueryParameters).map(
              ([key, queryParameter], index) => (
                <Label
                  key={`readable-query-parameter-${index}`}
                  onClose={() => handleRemoveQueryParameter(`!${key}`)}
                >
                  {queryParameter}
                </Label>
              ),
            )}

            <SearchBarContainer>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                defaultValue={query?.search as string}
              />
              <Button onClick={() => handleSearch()}>Search</Button>
              {withFilter && fieldsToRender && (
                <FilterSelect
                  fields={fieldsToRender.map(
                    (fieldName) => list.fields[fieldName],
                  )}
                  whereParameters={{
                    ...where,
                    ...pathToFilter(query as Record<string, string>),
                  }}
                  onSubmit={handleSearch}
                />
              )}
            </SearchBarContainer>
          </>
        )}
      </TableHeader>
      <Table>
        <Loading hidden={!isLoading} />
        {/* TABLE HEADER */}
        <Row withFullSupport={withFullSupport}>
          {/* GLOBAL SELECT */}
          {withFullSupport && (
            <Checkbox
              checked={allChecked}
              onChange={(e) => handleCheckboxChange(null, e.target.checked)}
              className="ml-4"
              data-test-id="global-checkbox"
            >
              {null}
            </Checkbox>
          )}

          {fieldsToRender?.map((element, index) => {
            // It's not possible to sort relations, files etc.
            const fieldType = getFieldType(list.fields[element]);
            const isSortable = ["boolean", "number", "string", "date"].includes(
              fieldType,
            );

            // Find custom label if it exists
            const customLabel = fieldLabels?.find(
              (label) => label.field === element,
            )?.label;

            return (
              <HeaderCell
                key={index}
                isSortable={isSortable}
                sortOrder={orderBy?.[element]}
                onSortChange={() => isSortable && handleOrderBy(element)}
              >
                {customLabel || list.fields[element].label}
              </HeaderCell>
            );
          })}

          {/* Empty header cell for arrow column */}
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <HeaderCell isSortable={false} onSortChange={() => { }}>
            {null}
          </HeaderCell>
        </Row>

        {/* TABLE BODY */}
        {Array.isArray(tableData) && tableData.length ? (
          tableData.map((element: IGraphQLObject) => (
            <Row key={element.id} withFullSupport={withFullSupport}>
              {/* SELECT CHECKBOX */}
              {withFullSupport && (
                <Checkbox
                  checked={selectedForDelete.includes(element.id)}
                  onChange={(e) =>
                    handleCheckboxChange(element.id, e.target.checked)
                  }
                  className="ml-4"
                >
                  {null}
                </Checkbox>
              )}
              {/* REST COLUMNS */}
              {itemTableRow(element)}

              {/* Arrow column */}
              <BodyCell>
                <Link
                  href={`/${linkPrefix ? linkPrefix : list.path}/${element.id}`}
                  data-test-id="list-link-arrow"
                  className="ml-auto mr-2 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <ArrowRightIcon className="w-4 h-4 text-blue-500" />
                </Link>
              </BodyCell>
            </Row>
          ))
        ) : (
          <NotFoundSection name={label || listName} />
        )}
      </Table>
      {shouldShowPagination && (
        <div className="flex items-center justify-center">
          <Pagination
            totalPages={Math.ceil(itemsCount / limit)}
            currentPage={skip / limit + 1}
            onPageChange={(pageNumber) => setSkip((pageNumber - 1) * limit)}
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
    </ItemsTableContainer>
  );
};
