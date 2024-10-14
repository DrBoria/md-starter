import { gql, useMutation } from "@apollo/client";

import { upperCaseFirstLetter } from "../../../utils/upperCaseFirstLetter";

// Define the variables interface for the create mutation
interface TCreateVariables {
  data: Record<string, unknown>;
}

interface IUseCreateMutation {
  listName: string;
  selectedFields?: string;
}

const useCreateMutation = <TData>({
  listName,
  selectedFields = "",
}: IUseCreateMutation) => {
  // Use the useMutation hook for creating
  const [
    createFunction,
    { loading, error: errorMutation, data: dataMutation },
  ] = useMutation<TData, TCreateVariables>(
    gql`
      mutation Create($data: ${upperCaseFirstLetter(listName)}CreateInput!) {
        item: create${upperCaseFirstLetter(listName)}(data: $data) {
          id
          __typename
          ${selectedFields}
        }
      }
    `,
    {
      errorPolicy: "all",
    },
  );

  // Fires create mutation with the provided data
  const executeCreate = (data: TCreateVariables["data"]) => {
    return createFunction({
      variables: {
        data,
      },
    });
  };

  return {
    createMutation: executeCreate,
    error: errorMutation,
    loading,
    data: dataMutation,
  };
};

export { useCreateMutation };
