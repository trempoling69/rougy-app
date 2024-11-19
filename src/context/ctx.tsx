import React, { useCallback, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_URL, get } from '../config/api';
type Credential = { username: string; password: string };
const AuthContext = React.createContext<{
  signIn: (value: Credential) => Promise<void>;
  signOut: () => void;
  token?: string | null;
  isError: boolean;
  errorMessage: string;
  isLoggedIn: boolean | null;
  verifyLogin: () => Promise<void>;
}>({
  signIn: async () => {},
  signOut: () => null,
  token: null,
  isError: false,
  errorMessage: '',
  isLoggedIn: null,
  verifyLogin: async () => {},
});

export function useAuth() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const login = async (credential: Credential) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, credential);
    await SecureStore.setItemAsync('token', response.data.data.access_token);
    setIsLoggedIn(true);
  };

  const getCurrentUser = async () => {
    await get('/api/auth/me');
    setIsLoggedIn(true);
  };

  const verifyLogin = useCallback(async () => {
    try {
      await getCurrentUser();
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (credential: Credential) => {
          try {
            setIsError(false);
            await login(credential);
          } catch (err: any) {
            console.log(err.response.data.message);
            setIsLoggedIn(false);
            setIsError(true);
            if (err?.response?.data?.message) {
              setErrorMessage(err.response.data.message);
            } else {
              setErrorMessage('Une erreur est survenue');
            }
          }
        },
        signOut: async () => {
          await axios.post(`${API_URL}/api/auth/clear-auth-cookie`, {}, { withCredentials: true });
          SecureStore.deleteItemAsync('token');
          setIsLoggedIn(false);
        },
        isError,
        errorMessage,
        isLoggedIn,
        verifyLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
