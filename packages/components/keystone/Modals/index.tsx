import React from "react";
import {
  useApolloClient,
  gql,
  makeVar,
  useReactiveVar,
} from "@apollo/client";
import { ModalContext, ModalContextType, TFullScreenData, TModalData, TSideBarModalData } from "../../default/Modals";
import { updateAndLog } from "./updateAndLog";

// Define reactive variables with initial null values
export const sideBarModalDataVar = makeVar<TSideBarModalData>(null);
export const modalDataVar = makeVar<TModalData>(null);
export const fullScreenDataVar = makeVar<TFullScreenData>(null);

// Modal provider component
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = useApolloClient();

    // Read current values from reactive variables
  const sideBarModalData = useReactiveVar(sideBarModalDataVar);
  const modalData = useReactiveVar(modalDataVar);
  const fullScreenData = useReactiveVar(fullScreenDataVar);

  // Setter for sidebar modal data
  const setSideBarModalData = (data: TSideBarModalData) => {
    updateAndLog(client, {
      variable: sideBarModalDataVar,
      query: gql`
        query GetSideBarModalData {
          SideBarModalData @client
        }
      `,
      mutation: gql`
        mutation Variable_Update_SideBarModalData($input: TSideBarModalData!) {
          updateSideBarModalData(input: $input) @client
        }
      `,
      fieldName: "SideBarModalData",
    })(data);
  };

  // Setter for regular modal data
  const setModalData = (data: TModalData) => {
    updateAndLog(client, {
      variable: modalDataVar,
      query: gql`
        query GetModalData {
          ModalData @client
        }
      `,
      mutation: gql`
        mutation Variable_Update_ModalData($input: TModalData!) {
          updateModalData(input: $input) @client
        }
      `,
      fieldName: "ModalData",
    })(data);
  };

  // Setter for fullscreen modal data
  const setFullScreenData = (data: TFullScreenData) => {
    updateAndLog(client, {
      variable: fullScreenDataVar,
      query: gql`
        query GetFullScreenData {
          FullScreenData @client
        }
      `,
      mutation: gql`
        mutation Variable_Update_FullScreenData($input: TFullScreenData!) {
          updateFullScreenData(input: $input) @client
        }
      `,
      fieldName: "FullScreenData",
    })(data);
  };

  // Context value with data and setters
  const value: ModalContextType = {
    sideBarModalData,
    setSideBarModalData,
    modalData,
    setModalData,
    fullScreenData,
    setFullScreenData,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
