import { Stack } from 'expo-router/stack';
import { PriceProvider } from '../../../context/priceContext';

export default function Layout() {
  return (
    <PriceProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Les prix" }} />
        <Stack.Screen name="Scan" options={{ headerTitle: 'Scanner' }} />
      </Stack>
    </PriceProvider>
  );
}