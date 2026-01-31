import React, { createContext, useContext, useState } from 'react';

// Create context for logger
export const LoggerContext = createContext<LoggerContextType | undefined>(undefined);

// Logger provider using React state
export const LoggerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<TToastData[]>([]);

  // Add a new toast to the state
  const add = (toast: Omit<TToastData, 'id'>) => {
    const id = Date.now().toString(); // Generate unique ID for the toast
    const newToast = { id, ...toast };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  // Remove a toast from the state by ID
  const remove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Context value with add and remove methods
  const value: LoggerContextType = {
    add,
    remove,
  };

  return (
    <LoggerContext.Provider value={value}>
      {children}
      {/* Render active toasts */}
      <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 1000 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              margin: '10px',
              padding: '10px',
              background: 'white',
              border: '1px solid black',
              borderRadius: '4px',
            }}
          >
            <h4>{toast.title}</h4>
            {toast.description && <p>{toast.description}</p>}
            <button onClick={() => remove(toast.id)}>Close</button>
          </div>
        ))}
      </div>
    </LoggerContext.Provider>
  );
};

// Hook to use the logger context
export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error('useLogger must be used within a LoggerProvider');
  }
  return context;
};

// Toast data type
export type TToastData = {
    id: string;
    title: string;
    description?: string;
    tone?: 'positive' | 'negative' | 'warning';
  };
  
  // Context type for logger
  export type LoggerContextType = {
    add: (toast: Omit<TToastData, 'id'>) => void;
    remove: (id: string) => void;
  };
