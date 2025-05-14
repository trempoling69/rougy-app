import { CameraView } from 'expo-camera';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScanOverlay } from '../../../components/UI/ScanOverlay';
import { usePriceContext } from '../../../context/priceContext';
import { get } from '../../../config/api';
import { Price } from '../../../type/basic';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';

const Scan = () => {
  const [isActive, setIsActive] = useState(false);
  const { prices, setScannedPrice, setScanError } = usePriceContext();

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      // Invoked whenever the route is focused.
      setIsActive(true);
      // Return function is invoked whenever the route gets out of focus.
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  const isProcessing = useRef(false);

  const setProcessingAfterTimeout = () => {
    setTimeout(() => {
      isProcessing.current = false;
    }, 1000);
  };

  const handleGetScannedPrice = async (id: string) => {
    if (isProcessing.current) return;
    isProcessing.current = true;
    try {
      let priceScanned = null;
      const findIndexInBasicPrice = prices.findIndex((price) => price.id === id);
      if (findIndexInBasicPrice !== -1) {
        priceScanned = prices[findIndexInBasicPrice];
        setScannedPrice(priceScanned);
        router.back();
        return;
      }
      const priceFetch = await get<Price>(`/api/prices/${id}`);
      setScannedPrice(priceFetch.data);
      router.back();
    } catch (err) {
      setScanError(true);
      router.back();
    } finally {
      setProcessingAfterTimeout();
    }
  };
  return (
    <SafeAreaView style={styles.sceen}>
      {isActive && (
        <CameraView
          style={styles.sceen}
          facing="back"
          autofocus="on"
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={({ data }) => {
            setTimeout(async () => {
              await handleGetScannedPrice(data);
            }, 500);
          }}
        >
          <ScanOverlay />
        </CameraView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sceen: {
    flex: 1,
  },
});

export default Scan;
