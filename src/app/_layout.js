import { Slot } from 'expo-router';
import { SessionProvider } from '../context/ctx';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CartProvider } from '../context/cartContext';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <CartProvider>
        <BottomSheetModalProvider>
          <Slot screenOptions={{ color: 'red' }} />
        </BottomSheetModalProvider>
      </CartProvider>
    </SessionProvider>
  );
}
