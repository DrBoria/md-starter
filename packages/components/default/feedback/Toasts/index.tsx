import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer, ToastItem } from './styles';

export type TToastData = {
    id: string;
    title: string;
    description?: string;
    tone?: 'positive' | 'negative' | 'warning';
    duration?: number;
};

export type ToastsContextType = {
    add: (toast: Omit<TToastData, 'id'>) => void;
    remove: (id: string) => void;
};

export const ToastsContext = createContext<ToastsContextType | undefined>(undefined);

export const ToastsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<TToastData[]>([]);

    const remove = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const add = useCallback((toast: Omit<TToastData, 'id'>) => {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newToast = { id, ...toast };
        setToasts((prev) => [...prev, newToast]);

        if (toast.duration !== 0) {
            setTimeout(() => remove(id), toast.duration || 5000);
        }
    }, [remove]);

    return (
        <ToastsContext.Provider value={{ add, remove }}>
            {children}
            <ToastContainer>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} $tone={toast.tone}>
                        <h4>{toast.title}</h4>
                        {toast.description && <p>{toast.description}</p>}
                        <button className="close-btn" onClick={() => remove(toast.id)}>✕</button>
                    </ToastItem>
                ))}
            </ToastContainer>
        </ToastsContext.Provider>
    );
};

export const useToasts = () => {
    const context = useContext(ToastsContext);
    if (!context) {
        throw new Error('useToasts must be used within a ToastsProvider');
    }
    return context;
};

export const useLogger = useToasts; // Backward compatibility alias
export const LoggerProvider = ToastsProvider; // Backward compatibility alias
