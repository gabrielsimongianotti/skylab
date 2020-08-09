import React, { createContext, useCallback, useContext, useState } from 'react';
import ToastContainer from '../components/ToustContainer';
import { uuid } from 'uuidv4';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}
const ToastConstext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }
    setMessages(oldMessage => [...oldMessage, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessage => oldMessage.filter(message => message.id !== id))
  }, [])

  return (
    <ToastConstext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastConstext.Provider>
  );
}

export function useToast(): ToastContextData {
  const context = useContext(ToastConstext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context;
}

