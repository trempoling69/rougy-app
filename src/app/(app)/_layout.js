import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../context/ctx';
import { Text } from 'react-native';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useCartContext } from '../../context/cartContext';

export default function AppLayout() {
  const { isLoggedIn, verifyLogin } = useAuth();
  const { items } = useCartContext();

  useEffect(() => {
    verifyLogin();
  }, []);

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>;
  }

  if (isLoggedIn === false) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="Price"
        options={{
          tabBarLabel: 'Caisse',
          tabBarIcon: ({ color, size }) => <Ionicons name="flower" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          tabBarLabel: 'Panier',
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" color={color} size={size} />,
          tabBarBadge: items.length,
          headerTitle: 'Panier en cours',
        }}
      />
      <Tabs.Screen
        name="Bill"
        options={{
          headerShown: false,
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" color={color} size={size} />,
          headerTitle: 'Menu',
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          tabBarLabel: 'Mon Compte',
          tabBarIcon: ({ color, size }) => <Ionicons name="happy" color={color} size={size} />,
          headerTitle: 'Mon compte',
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
