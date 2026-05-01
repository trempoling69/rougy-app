import { useQuery } from '@tanstack/react-query';
import { basicPriceQueryOptions } from '../price/hook/price.hook';
import { CategoryPrice } from '../../type/basic';

export const useGetAllCategoriesFromPrices = () => {
  return useQuery({
    ...basicPriceQueryOptions,
    select: (prices) => {
      const allCategories = prices
        .map((price) => price.categoryPrice)
        .filter((category): category is CategoryPrice => !!category);

      return Array.from(new Map(allCategories.map((category) => [category.id, category])).values());
    },
  });
};
