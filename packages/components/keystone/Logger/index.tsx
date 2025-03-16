import React, { createContext, useContext } from 'react';
import { useToasts } from '@keystone-ui/toast';
import { useApolloClient, gql } from '@apollo/client';
import { LoggerContext, LoggerContextType, TToastData } from '../../default/Logger';

// Apollo mutations for logging toast actions
const LOG_TOAST_ADDED = gql`
  mutation LogToastAdded($toastData: Any!) {
    logToastAdded(toastData: $toastData) @client
  }
`;

const LOG_TOAST_REMOVED = gql`
  mutation LogToastRemoved($toastId: String!) {
    logToastRemoved(toastId: $toastId) @client
  }
`;

// Logger provider with Keystone Toasts and Apollo
export const LoggerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toasts = useToasts();
  const client = useApolloClient();

  // Add a new toast and log it in Apollo
  const add = (toast: Omit<TToastData, 'id'>) => {
    const id = Date.now().toString(); // Generate unique ID for the toast
    const toastData = { id, ...toast };

    // Display toast using Keystone's useToasts
    toasts.addToast({
      ...toastData,
      message: toastData.description,
      tone: toastData.tone || "positive"
    });

    // Log the toast addition in Apollo
    client.mutate({
      mutation: LOG_TOAST_ADDED,
      variables: { toastData },
    });
  };

  // Remove a toast and log the action in Apollo
  const remove = (id: string) => {
    toasts.removeToast(id);
    // Note: Keystone's useToasts might not support direct removal.
    // Here, we only log the removal action in Apollo.
    client.mutate({
      mutation: LOG_TOAST_REMOVED,
      variables: { toastId: id },
    });
  };

  // Context value with add and remove methods
  const value: LoggerContextType = {
    add,
    remove,
  };

  return <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>;
};
