import type { OperationVariables, QueryResult } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";

import { lowerCaseFirstLetter } from "@md/utils";

interface IUseQueryList {
  listName: string;
  selectedFields: string;
  itemId?: string;
}

const useQueryListItem = <TData>({
  listName,
  selectedFields,
  itemId,
}: IUseQueryList): QueryResult<TData, OperationVariables> => {
  const query = useQuery<TData>(
    gql`
      query ${listName}Item($id: ID!) {
          ${lowerCaseFirstLetter(listName)} (where: {id: $id}) {
              ${selectedFields}
          }
      }
  `,
    {
      variables: { id: itemId, listKey: listName },
      errorPolicy: "all",
    },
  );

  return query;
};

export { useQueryListItem };
