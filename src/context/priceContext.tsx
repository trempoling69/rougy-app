import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { Price } from '../type/basic';

type PriceContext = {
  setScannedPrice: Dispatch<SetStateAction<Price | null>>;
  scannedPrice: Price | null;
  scanError: boolean;
  setScanError: Dispatch<SetStateAction<boolean>>;
};
export const priceContext = createContext<PriceContext>({
  scannedPrice: null,
  setScannedPrice: () => null,
  scanError: false,
  setScanError: () => true,
});

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [scannedPrice, setScannedPrice] = useState<Price | null>(null);
  const [scanError, setScanError] = useState<boolean>(false);

  return (
    <priceContext.Provider value={{ scannedPrice, setScannedPrice, scanError, setScanError }}>
      {children}
    </priceContext.Provider>
  );
};

export const usePriceContext = () => {
  const context = useContext(priceContext);
  if (!context) {
    throw new Error('usePriceContext must be used with the provider');
  }
  return context;
};
