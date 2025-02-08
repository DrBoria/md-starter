import { gql } from "@apollo/client";

// Define the variables interface for the mutation
interface TCreateVariables {
    [key: string]: unknown;
}

interface IUseAuthenticateMutation {
    identityField: string;
    secretField: string;
    successTypename: string;
    failureTypename: string;
    useMutation: (
        mutation: ReturnType<typeof gql>,
        options?: any
      ) => any
}

const mutationName = "authenticateUserWithPassword";
const useAuthenticate = ({
    identityField,
    secretField,
    successTypename,
    failureTypename,
    useMutation
}: IUseAuthenticateMutation) => {

    const [
        authenticateFunciton,
        { loading, error: errorMutation, data: dataMutation },
    ] = useMutation(
        gql`
        mutation($${identityField}: String!, $${secretField}: String!) {
            item: ${mutationName}(${identityField}: $${identityField}, ${secretField}: $${secretField}) {
                ... on ${successTypename} {
                item {
                    id
                }
                }
                ... on ${failureTypename} {
                message
                }
            }
        }
    `, {
        errorPolicy: "all",
    });

    // Fires the mutation with provided data
    const authenticate = (variables: TCreateVariables) => {
        return authenticateFunciton({
            variables,
        });
    };
    return {
        authenticateMutation: authenticate,
        error: errorMutation,
        loading,
        data: dataMutation,
    };

};

export { useAuthenticate };
