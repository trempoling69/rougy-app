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
  fetchAllBill: (startDate: string, endDate?: string) => Promise<void>;
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

  const fetchAllBill = async (startDate: string, endDate?: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const request = await get<Bill[]>(`/api/cart/history`, { startDate: startDate, endDate: endDate });
      setBills(request.data);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return <billContext.Provider value={{ bills, isError, isLoading, fetchAllBill }}>{children}</billContext.Provider>;
};

export const useBillContext = () => {
  const context = useContext(billContext);
  if (!context) {
    throw new Error('useBillContext must be used with the provider');
  }
  return context;
};
