import type {
  ApolloClient,
  DocumentNode,
  OperationVariables,
  ReactiveVar,
} from "@apollo/client";
import type React from "react";
import { JSXElementConstructor, ReactElement } from "react";
import { gql, makeVar, useApolloClient, useReactiveVar } from "@apollo/client";

import { TConditionalField } from "./system-components/DynamicForms";
import { ITabs } from "./system-components/DynamicForms";

/**
 * Add variable name here to display it in queries
 */
type TGlobalVariableNames = "SideBarModalData" | "ModalData";

/**
 *
 * @param client - Apollo Client from keystone apollo provider
 * @param clientVar - Variable that will be updated
 * @returns void
 *
 * Main Idea of the funciton is to uptade passed variable and store information about it in Apollo dev tools
 */
const updateAndLog =
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

const useGlobalVariable = <T>(
  variable: ReactiveVar<T>,
  name?: TGlobalVariableNames,
): [T, (payload: T) => void] => {
  const client = useApolloClient();

  const setSideBarModalDataClientVar = {
    variable: variable,
    query: gql`
    query Get${name} {
      ${name} @client
    }`,
    mutation: gql`
    mutation Variable_Update_${name}($input: modalDataInput!) {
      update${name}(input: $input) @client
    }`,
  };

  const reactiveVar = useReactiveVar(variable);
  return [reactiveVar, updateAndLog<T>(client, setSideBarModalDataClientVar)];
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
  ) => ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}

export type TSideBarModalData = {
  listName?: string;
  id?: string;
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  type: "edit" | "dataSource" | "create";
  headerText: string;
  tabs?: ITabs;
  // TODO: make default value visible for users
  defaultValues?: Record<string, unknown>;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
} | null;
const SideBarModalData = makeVar<TSideBarModalData>(null);

export type TModalData = {
  content: React.ReactNode;
} | null;
const ModalData = makeVar<TModalData>(null);

export { SideBarModalData, ModalData, useGlobalVariable };
