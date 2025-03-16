import type {
  ApolloClient,
  DocumentNode,
  OperationVariables,
  ReactiveVar,
} from "@apollo/client";
import { gql, makeVar, useApolloClient } from "@apollo/client";
import { ITabs, TConditionalField } from "@md/sections/keystone";

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
    client: ApolloClient<object>,
    clientVar: {
      variable: ReactiveVar<T>;
      query: DocumentNode;
      mutation: DocumentNode;
    },
  ) =>
    async (payload: unknown) => {
      if (!clientVar)
        throw new Error("mutateInCache: clientVar parameter required.");
      if (payload === undefined)
        throw new Error("mutateInCache: payload parameter required.");

      clientVar.variable(payload as T); // Reactive Variable changes
      await client.mutate({
        mutation: clientVar.mutation,
        variables: payload as OperationVariables,
      }); // Mutation runs ( in dev tools )

      // Writing to Cache variable with new data
      client.writeQuery({
        query: clientVar.query,
        data: payload,
      });
    };

/**
 * Here is the list of available variables
 */

export interface IModalButton {
  name: string;
  view: (
    // Onclick will have action that should be used by default - create item, save edited item, delete item and so on
    onClick?: () => unknown,
    isDisabled?: boolean,
  ) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}

export type TSideBarModalData = {
  type: "edit" | "dataSource" | "create" | "custom";
  headerText: string;
  listName?: string;
  id?: string;
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  tabs?: ITabs;
  // TODO: make default value visible for users
  defaultValues?: Record<string, unknown>;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
  children?: React.ReactElement;
} | null;

const SideBarModalData = makeVar<TSideBarModalData>(null);

export type TModalData = {
  content: React.ReactNode;
} | null;

const ModalData = makeVar<TModalData>(null);

export type TFullScreenData = {
  content: React.ReactNode;
} | null;

const FullScreenData = makeVar<TModalData>(null);

const GlobalVars = {
  get SideBarModalData() {
    return SideBarModalData();
  },
  set SideBarModalData(value: TSideBarModalData) {
    const client = useApolloClient();
    updateAndLog(client, {
      variable: SideBarModalData,
      query: gql`
        query GetSideBarModalData {
          SideBarModalData @client
        }
      `,
      mutation: gql`
        mutation Variable_Update_SideBarModalData($input: modalDataInput!) {
          updateSideBarModalData(input: $input) @client
        }
      `,
    })(value);
  },

  get ModalData() {
    return ModalData();
  },
  set ModalData(value: TModalData) {
    const client = useApolloClient();

    updateAndLog(client, {
      variable: ModalData,
      query: gql`
        query GetModalData {
          ModalData @client
        }
      `,
      mutation: gql`
        mutation Variable_Update_ModalData($input: modalDataInput!) {
          updateModalData(input: $input) @client
        }
      `,
    })(value);
  },

  get FullScreenData() {
    return FullScreenData();
  },
  set FullScreenData(value: TFullScreenData) {
    const client = useApolloClient();

    updateAndLog(client, {
      variable: FullScreenData,
      query: gql`
        query GetFullScreenData {
          FullScreenData @client
        }
      `,
      mutation: gql`
        mutation Variable_Update_FullScreenData($input: modalDataInput!) {
          updateFullScreenData(input: $input) @client
        }
      `,
    })(value);
  },
};

export { GlobalVars };
