import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface SingInCredentials {
  email: string;
  password: string;
}

interface AutoContextData {
  user: object;
  signIn(credentials: SingInCredentials): Promise<void>;
}

interface AutoState {
  token: string;
  user: object;
}

export const AuthContext = createContext<AutoContextData>({} as AutoContextData);

export const AutoProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AutoState;
  })

  const signIn = useCallback(async ({ email, password }) => {

    const response = await api.post<AutoState>('sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
