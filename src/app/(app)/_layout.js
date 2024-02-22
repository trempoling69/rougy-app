import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../context/ctx';
import { Text } from 'react-native';
import { useEffect } from 'react';

export default function AppLayout() {
  const { isLoggedIn, verifyLogin } = useAuth();

  useEffect(() => {
    verifyLogin();
  }, []);

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>;
  }

  if (isLoggedIn === false) {
    return <Redirect href="/sign-in" />;
  }

  return <Tabs />;
}
