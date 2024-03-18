import { Stack } from 'expo-router/stack';
import { BillProvider } from '../../../context/billContext';

export default function Layout() {
  return (
    <BillProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: 'Historique des comptes' }} />
        <Stack.Screen name="[id]" options={{ headerTitle: 'Détail' }} />
      </Stack>
    </BillProvider>
  );
}
