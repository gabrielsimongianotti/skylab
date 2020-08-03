import React, { createContext, useCallback, useContext } from 'react';
import ToastContainer from '../components/ToustContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}
const ToastConstext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log("add")
  }, [])

  const removeToast = useCallback(() => {
    console.log("remove")
  }, [])

  return (
    <ToastConstext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
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

