import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Item } from './cartContext';
import { get } from '../config/api';

export type Bill = {
  id: string;
  products: Item[];
  total: number;
  createdAt: string;
};

type BillContext = {
  bills: Bill[];
  isError: boolean;
  isLoading: boolean;
  fetchAllBill: () => Promise<void>;
};

export const billContext = createContext<BillContext>({
  bills: [],
  isError: false,
  isLoading: false,
  fetchAllBill: () => new Promise(() => {}),
});

export const BillProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllBill = async () => {
    try {
      console.log('fetch');
      setIsError(false);
      setIsLoading(true);
      const request = await get<Bill[]>('/api/cart');
      setBills(request.data);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBill();
  }, []);

  return <billContext.Provider value={{ bills, isError, isLoading, fetchAllBill }}>{children}</billContext.Provider>;
};

export const useBillContext = () => {
  const context = useContext(billContext);
  if (!context) {
    throw new Error('useBillContext must be used with the provider');
  }
  return context;
};
