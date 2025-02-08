import { gql } from "@apollo/client";

import { upperCaseFirstLetter, toPlural, lowerCaseFirstLetter } from "@md/utils";
import { TUseQuery } from ".";

type TSortOrder = "asc" | "desc";

type TOrderBy = Record<string, TSortOrder>;

// Define the interface for the query parameters
interface IUseQueryList<TData> {
  listName: string;
  selectedFields: string;
  limit?: number;
  skip?: number;
  where?: Record<string, unknown>;
  orderBy?: TOrderBy;
  useQuery: TUseQuery<TData>
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
  useQuery,
}: IUseQueryList<TData>) => {
  const query = useQuery(
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
