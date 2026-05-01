// import 'react-native-gesture-handler';
// import 'react-native-reanimated';

import { Slot } from 'expo-router';
import { SessionProvider } from '../context/ctx';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <SessionProvider>
            <BottomSheetModalProvider>
              <Slot screenOptions={{ color: 'red' }} />
            </BottomSheetModalProvider>
          </SessionProvider>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
