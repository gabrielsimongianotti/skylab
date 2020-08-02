import React, { createContext, useCallback } from 'react';
import  api  from '../services/api';

interface SingInCredentials {
  email: string;
  password: string;
}

interface AutoContextData {
  name: string;
  signIn(credentials: SingInCredentials): Promise<void>;
}

export const AuthContext = createContext<AutoContextData>({} as AutoContextData);

export const AutoProvider: React.FC = ({ children }) => {

  const signIn = useCallback(async ({ email, password }) => {
    console.log(email, password)
    const response = await api.post('sessions', { email, password });
    console.log(response)

  }, []);

  return (
    <AuthContext.Provider value={{ name: 'gatão', signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
