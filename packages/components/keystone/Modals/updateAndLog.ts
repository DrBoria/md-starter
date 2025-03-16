import { ApolloClient, DocumentNode, ReactiveVar } from "@apollo/client";

/**
 *
 * @param client - Apollo Client from keystone apollo provider
 * @param clientVar - Variable that will be updated
 * @returns void
 *
 * Main Idea of the funciton is to uptade passed variable and store information about it in Apollo dev tools
 */
export const updateAndLog =
  <T>(
    client: ApolloClient<any>,
    clientVar: {
      variable: ReactiveVar<T>;
      query: DocumentNode;
      mutation: DocumentNode;
      fieldName: string; // Added to specify the query field name
    },
  ) =>
  async (payload: T) => {
    if (!clientVar) {
      throw new Error("mutateInCache: clientVar parameter required.");
    }
    if (payload === undefined) {
      throw new Error("mutateInCache: payload parameter required.");
    }

    clientVar.variable(payload); // Update the reactive variable
    await client.mutate({
      mutation: clientVar.mutation,
      variables: { input: payload }, // Wrap payload in { input: ... } for mutation
    }); // Perform mutation (likely for logging in dev tools)
    client.writeQuery({
      query: clientVar.query,
      data: { [clientVar.fieldName]: payload }, // Shape data to match query
    }); // Update the cache
  };
