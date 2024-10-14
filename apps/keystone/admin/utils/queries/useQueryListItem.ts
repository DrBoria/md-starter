import type { OperationVariables, QueryResult } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";

import { lowerCaseFirstLetter } from "../../../utils/lowerCaseFirstLetter";

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
      query ${listName}Item($id: ID!, $listKey: String!) {
          ${lowerCaseFirstLetter(listName)} (where: {id: $id}) {
              ${selectedFields}
          }
          keystone {
            adminMeta {
              list(key: $listKey) {
                hideCreate
                hideDelete
                fields {
                  path
                  itemView(id: $id) {
                    fieldMode
                    fieldPosition
                  }
                }
              }
            }
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
