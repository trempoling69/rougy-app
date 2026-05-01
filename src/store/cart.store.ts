import { create } from 'zustand';

export type Item = {
  priceId: string;
  unitPrice: string;
  quantity: string;
  name: string;
};

type CartState = {
  products: Item[];
  idUpdated: string | null;

  handleAddItemToCart: (products: Item) => void;
  addQuantityToItem: (itemPriceId: string, value: number) => void;
  removeQuantityToItem: (itemPriceId: string, value: number) => void;
  handleRemoveItemToCart: (itemPriceId: string) => void;
  retrieveCart: (products: Item[], id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  products: [],
  idUpdated: null,

  handleAddItemToCart: (newItem) =>
    set((state) => {
      const existingItemIndex = state.products.findIndex((item) => item.priceId === newItem.priceId);

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.products];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: String(Number(existingItem.quantity) + Number(newItem.quantity)),
        };
        return { products: updatedItems };
      }
      return { products: [...state.products, newItem] };
    }),

  addQuantityToItem: (itemPriceId, value) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.priceId === itemPriceId ? { ...item, quantity: String(Number(item.quantity) + value) } : item
      ),
    })),

  removeQuantityToItem: (itemPriceId, value) =>
    set((state) => ({
      products: state.products.map((item) => {
        if (item.priceId === itemPriceId) {
          const newQuantity = Number(item.quantity) - value;
          return { ...item, quantity: String(Math.max(1, newQuantity)) };
        }
        return item;
      }),
    })),

  handleRemoveItemToCart: (itemPriceId) =>
    set((state) => ({
      products: state.products.filter((item) => item.priceId !== itemPriceId),
    })),

  retrieveCart: (products, id) => set({ products, idUpdated: id }),

  clearCart: () => set({ products: [], idUpdated: null }),
}));

export const useCartTotal = () => {
  return useCartStore((state) => {
    const totalInCents = state.products.reduce((acc, item) => {
      const unitPriceInCents = Math.round(parseFloat(item.unitPrice) * 100);
      const quantity = parseInt(item.quantity, 10);
      if (!isNaN(unitPriceInCents) && !isNaN(quantity)) {
        return acc + unitPriceInCents * quantity;
      }
      return acc;
    }, 0);

    return totalInCents / 100;
  });
};
