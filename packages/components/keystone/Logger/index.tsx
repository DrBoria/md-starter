import React, { useEffect } from 'react';
import { useToasts } from '@keystone-ui/toast';
import { useApolloClient, gql } from '@apollo/client';
import type { LoggerContextType, TToastData } from '../../default/Logger';
import { LoggerContext } from '../../default/Logger';

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

  // Add proper promise handling
  const logMessage = async (message: string) => {
    try {
      await fetch('/api/log', {
        method: 'POST',
        body: JSON.stringify({ message })
      });
    } catch (error) {
      console.error('Logging failed:', error);
    }
  };

  // Fix floating promises
  useEffect(() => {
    void (async () => {
      try {
        await logMessage('Component mounted');
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Fix floating promises in mutations
  const add = async (toast: Omit<TToastData, 'id'>) => {
    try {
      const id = Date.now().toString();
      const toastData = { id, ...toast };

      toasts.addToast({
        ...toastData,
        message: toastData.description,
        tone: toastData.tone || "positive"
      });

      await client.mutate({
        mutation: LOG_TOAST_ADDED,
        variables: { toastData },
      });
    } catch (error) {
      console.error('Failed to add toast:', error);
    }
  };

  // Remove a toast and log the action in Apollo
  const remove = async (id: string) => {
    try {
      toasts.removeToast(id);
      await client.mutate({
        mutation: LOG_TOAST_REMOVED,
        variables: { toastId: id },
      });
    } catch (error) {
      console.error('Failed to remove toast:', error);
    }
  };

  // Context value with add and remove methods
  const value: LoggerContextType = {
    add,
    remove,
  };

  return <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>;
};
