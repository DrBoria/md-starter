import type { ListMeta } from "@keystone-6/core/types";
import { gql, useMutation } from "@apollo/client";

const useUpdateMutation = <TData, TVariables>(
  list: ListMeta,
  selectedFields: string,
) => {
  const [
    updateFunction,
    { loading, error: errorMutation, data: dataMutation },
  ] = useMutation<TData, TVariables>(
    gql`mutation UpdateItem($data: ${list.gqlNames.updateInputName}!, $id: ID!) {
      item: ${list.gqlNames.updateMutationName}(where: { id: $id }, data: $data) {
        ${selectedFields}
      }
    }`,
    { errorPolicy: "all" },
  );

  // Returning the states and mutation function
  return {
    update: updateFunction,
    error: errorMutation,
    loading,
    data: dataMutation,
  };
};

export { useUpdateMutation };
