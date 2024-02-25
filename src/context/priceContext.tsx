import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { CategoryPrice, Price } from '../type/basic';
import { get } from '../config/api';

type PriceContext = {
  prices: Price[];
  isLoading: boolean;
  isError: boolean;
  categoriesPrice: CategoryPrice[];
};
export const priceContext = createContext<PriceContext>({
  prices: [],
  isError: false,
  isLoading: false,
  categoriesPrice: [],
});

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [prices, setPrices] = useState<Price[]>([]);
  const [categoriesPrice, setCategoriesPrice] = useState<CategoryPrice[]>([]);
  const getAllCateogries = (prices: Price[]) => {
    const allCategories = prices
      .map((price) => price.categoryPrice)
      .filter((category): category is CategoryPrice => !!category);
    const uniqueCategories: CategoryPrice[] = Object.values(
      allCategories.reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {})
    );
    setCategoriesPrice(uniqueCategories);
  };
  const fetchPrice = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await get<Price[]>('/api/prices/type/BP');
      getAllCateogries(response.data);
      setPrices(response.data);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPrice();
  }, []);
  return (
    <priceContext.Provider value={{ prices, isLoading, isError, categoriesPrice }}>{children}</priceContext.Provider>
  );
};

export const usePriceContext = () => {
  const context = useContext(priceContext);
  if (!context) {
    throw new Error('usePriceContext must be used with the provider');
  }
  return context;
};
