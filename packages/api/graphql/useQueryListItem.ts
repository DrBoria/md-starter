import { gql } from "@apollo/client";
import { lowerCaseFirstLetter } from "@md/utils";
import { TUseQuery } from ".";

interface IUseQueryList<TData> {
  listName: string;
  selectedFields: string;
  itemId?: string;
  useQuery: TUseQuery<TData>
}

const useQueryListItem = <TData>({
  listName,
  selectedFields,
  itemId,
  useQuery
}: IUseQueryList<TData>): TData => {
  const query = useQuery(
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
