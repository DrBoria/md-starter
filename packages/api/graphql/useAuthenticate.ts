import { gql, useMutation } from "@apollo/client";
import { Lists } from "@md/types";

// Define the variables interface for the mutation
interface TCreateVariables {
    [key: string]: unknown;
}

interface IUseAuthenticateMutation {
    identityField: string;
    secretField: string;
    successTypename: string;
    failureTypename: string;
}

const mutationName = "authenticateUserWithPassword";
const useAuthenticate = ({
    identityField,
    secretField,
    successTypename,
    failureTypename,
}: IUseAuthenticateMutation) => {

    const [
        authenticateFunciton,
        { loading, error: errorMutation, data: dataMutation },
    ] = useMutation<{ item: { item: Lists.User.Item, __typename: string } }, TCreateVariables>(
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
