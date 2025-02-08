import { gql, useMutation } from "@apollo/client";

interface TDuplicateVariables {
  id: string;
}

const useDuplicateMutation = <TData>(entity: string) => {
  const [
    duplicateFunction,
    { loading, error: errorMutation, data: dataMutation },
  ] = useMutation<TData, TDuplicateVariables>(
    gql`mutation Duplicate($id: ID!) {
      item: duplicate${entity}(id: $id) {
        id
      }
    }`,
    { errorPolicy: "all" },
  );

  return {
    duplicate: duplicateFunction,
    error: errorMutation,
    loading,
    data: dataMutation,
  };
};

export { useDuplicateMutation };
