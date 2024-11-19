import { Stack } from 'expo-router/stack';
import { BillProvider } from '../../../context/billContext';

export default function Layout() {
  return (
    <BillProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: 'Menu' }} />
        <Stack.Screen name="[id]" options={{ headerTitle: 'Détail' }} />
        <Stack.Screen name="History/index" options={{ headerTitle: 'Historique des comptes' }} />
        <Stack.Screen name="Stats/index" options={{ headerTitle: 'Statistique' }} />
      </Stack>
    </BillProvider>
  );
}
