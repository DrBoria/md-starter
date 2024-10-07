import { gql, useQuery } from "@apollo/client";

import type { TOrderBy } from "../system-components/utils/getNextSortOrder";
import { lowerCaseFirstLetter } from "../../utils/lowerCaseFirstLetter";
import { toPlural } from "../../utils/toPlural";
import { upperCaseFirstLetter } from "../../utils/upperCaseFirstLetter";

// Define the interface for the query parameters
interface IUseQueryList {
  listName: string;
  selectedFields: string;
  limit?: number;
  skip?: number;
  where?: Record<string, unknown>;
  orderBy?: TOrderBy;
}

// Define the type for query variables
interface QueryVariables {
  where?: Record<string, unknown>;
  take?: number;
  skip?: number;
  orderBy?: TOrderBy;
}

// Update the useQueryList function
const useQueryList = <TData>({
  listName,
  selectedFields,
  limit,
  skip = 0,
  where,
  orderBy,
}: IUseQueryList) => {
  const query = useQuery<TData>(
    gql`
      query ${listName}Query($where: ${upperCaseFirstLetter(listName)}WhereInput, $take: Int, $skip: Int, $orderBy: [${upperCaseFirstLetter(listName)}OrderByInput!]) {
        items: ${toPlural(lowerCaseFirstLetter(listName))}(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
          ${selectedFields}
        }
        itemsCount: ${toPlural(lowerCaseFirstLetter(listName))}Count(where: $where)
      }
    `,
    {
      variables: {
        where,
        take: limit,
        skip,
        orderBy,
      } as QueryVariables,
      errorPolicy: "all",
    },
  );

  return query;
};

export { useQueryList };
