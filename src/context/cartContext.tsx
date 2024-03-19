import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { patch, post } from '../config/api';

type CartContext = {
  items: Item[];
  total: number;
  handleAddItemToCart: (item: Item) => void;
  addQuantityToItem: (itemCode: string, value: number) => void;
  removeQuantityToItem: (itemCode: string, value: number) => void;
  handleRemoveItemToCart: (itemCode: string) => void;
  validateCart: () => void;
  validateCartLoading: boolean;
  validateCartError: boolean;
  retrieveCart: (items: Item[], total: number, id: string) => void;
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
  validateCart: () => {},
  validateCartLoading: false,
  validateCartError: false,
  retrieveCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [validateCartLoading, setValidateCartLoading] = useState(false);
  const [validateCartError, setValidateCartError] = useState(false);
  const [idUpdated, setIdUpdated] = useState<string | null>(null);

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

  const handleAddItemToCart = (item: Item) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.priceCode === item.priceCode);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = String(
          Number(updatedItems[existingItemIndex].quantity) + Number(item.quantity)
        );
        return updatedItems;
      }
      return [...prevItems, item];
    });
  };

  const handleRemoveItemToCart = (itemPriceCode: string) => {
    const newArray = [...items];
    const element = newArray.findIndex((item) => item.priceCode === itemPriceCode);
    if (element !== -1) {
      newArray.splice(element, 1);
    }
    setItems(newArray);
  };

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

  const validateCart = async () => {
    try {
      if (items.length === 0) return;
      setValidateCartLoading(true);
      setValidateCartError(false);
      if (idUpdated !== null) {
        console.log(items);
        await patch<string, { products: Item[]; total: number }>(`/api/cart/${idUpdated}`, {
          products: items,
          total,
        });
        setIdUpdated(null);
      } else {
        await post<string, { products: Item[]; total: number }>('/api/cart', { products: items, total });
      }
      setItems([]);
    } catch (err) {
      setValidateCartError(true);
    } finally {
      setValidateCartLoading(false);
    }
  };

  const retrieveCart = (items: Item[], total: number, id: string) => {
    setItems(items);
    setTotal(total);
    setIdUpdated(id);
  };

  return (
    <cartContext.Provider
      value={{
        items,
        total,
        handleAddItemToCart,
        addQuantityToItem,
        removeQuantityToItem,
        handleRemoveItemToCart,
        validateCart,
        validateCartLoading,
        validateCartError,
        retrieveCart,
      }}
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
