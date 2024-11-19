import { Slot } from 'expo-router';
import { SessionProvider } from '../context/ctx';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { CartProvider } from '../context/cartContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <GestureHandlerRootView style={styles.container}>
      <SessionProvider>
        <CartProvider>
          <BottomSheetModalProvider>
            <Slot screenOptions={{ color: 'red' }} />
          </BottomSheetModalProvider>
        </CartProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
 const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 })