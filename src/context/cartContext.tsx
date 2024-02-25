import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type CartContext = {
  items: Item[];
  total: number;
  handleAddItemToCart: (item: Item) => void;
  addQuantityToItem: (itemCode: string, value: number) => void;
  removeQuantityToItem: (itemCode: string, value: number) => void;
  handleRemoveItemToCart: (itemCode: string) => void;
};
export type Item = {
  priceCode: string;
  unitPrice: string;
  quantity: string;
  name: string;
};

export const cartContext = createContext<CartContext>({
  items: [],
  total: 0,
  handleAddItemToCart: () => {},
  addQuantityToItem: () => {},
  removeQuantityToItem: () => {},
  handleRemoveItemToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const handleAddItemToCart = (item: Item) => {
    console.log(item);
    setItems((prevItems) => {
      const newItems = [...prevItems, item];
      return newItems;
    });
  };

  const handleRemoveItemToCart = (itemPriceCode: string) => {
    const newArray = [...items];
    const element = newArray.findIndex((item) => item.priceCode === itemPriceCode);
    if (element !== -1) {
      newArray.splice(element, element);
    }
    setItems(newArray);
  };

  const getCartTotal = () => {
    const total = items.reduce((accumulateur, item) => {
      const unitPrice = parseFloat(item.unitPrice);
      const quantity = parseInt(item.quantity);
      if (!isNaN(unitPrice) && !isNaN(quantity)) {
        accumulateur += unitPrice * quantity;
      }
      return accumulateur;
    }, 0);
    const roundTotal = Math.round((total + Number.EPSILON) * 100) / 100;
    setTotal(roundTotal);
  };

  useEffect(() => {
    getCartTotal();
  }, [items]);

  const addQuantityToItem = (itemPriceCode: string, value: number) => {
    const newArray = [...items];
    const element = newArray.find((item) => item.priceCode === itemPriceCode);
    if (element) {
      element.quantity = JSON.stringify(parseInt(element.quantity, 10) + value);
    }
    setItems(newArray);
  };
  const removeQuantityToItem = (itemPriceCode: string, value: number) => {
    const newArray = [...items];
    const element = newArray.find((item) => item.priceCode === itemPriceCode);
    if (element) {
      const newValue = parseInt(element.quantity, 10) - value;
      if (newValue < 1) {
        return;
      } else {
        element.quantity = JSON.stringify(newValue);
      }
    }
    setItems(newArray);
  };
  return (
    <cartContext.Provider
      value={{ items, total, handleAddItemToCart, addQuantityToItem, removeQuantityToItem, handleRemoveItemToCart }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCartContext must be used with the provider');
  }
  return context;
};
