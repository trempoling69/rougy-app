import { create } from 'zustand';

type PriceSheetState = {
  isPriceSheetOpen: boolean;
  priceSheetData: {
    priceId: string | null;
  } | null;
  openPriceSheet: (priceId: string | null) => void;
  closePriceSheet: () => void;
};

export const usePriceSheetStore = create<PriceSheetState>((set) => ({
  isPriceSheetOpen: false,
  priceSheetData: null,
  openPriceSheet: (priceId) =>
    set({
      isPriceSheetOpen: true,
      priceSheetData: { priceId },
    }),
  closePriceSheet: () => set({ isPriceSheetOpen: false, priceSheetData: null }),
}));
