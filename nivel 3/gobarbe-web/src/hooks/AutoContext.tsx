import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface SingInCredentials {
  email: string;
  password: string;
}

interface AutoContextData {
  user: object;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AutoContextData>({} as AutoContextData);

export const AutoProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState;
  })

  const signIn = useCallback(async ({ email, password }) => {

    const response = await api.post<AuthState>('sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AutoContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuto must be used withid an AutoProvider')
  }

  return context;
}
