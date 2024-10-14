import { gql, useMutation } from "@apollo/client";

import { upperCaseFirstLetter } from "../../../utils/upperCaseFirstLetter";

// Define the variables interface
interface TDeleteVariables {
  where: { id: string }[];
}

const useDeleteMutation = <TData>(listName: string) => {
  // Use the useMutation hook
  const [
    deleteFunction,
    { loading, error: errorMutation, data: dataMutation },
  ] = useMutation<TData, TDeleteVariables>(
    gql`
      mutation Delete($where: [${upperCaseFirstLetter(listName)}WhereUniqueInput!]!) {
        items: delete${upperCaseFirstLetter(listName)}s(where: $where) {
            id
          }
        }
    `,
    {
      errorPolicy: "all",
    },
  );

  // Fires delete mutations for all passed ID's
  const executeDelete = (ids: string[]) => {
    // Prepare the 'where' variable for the mutation
    const where = ids.map((id) => ({ id }));

    return deleteFunction({
      variables: {
        where,
      },
    });
  };

  return {
    deleteMutation: executeDelete,
    error: errorMutation,
    loading,
    data: dataMutation,
  };
};

export { useDeleteMutation };
