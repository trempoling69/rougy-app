import { queryOptions, useQuery } from '@tanstack/react-query';
import { priceQueryKeys } from '../queryKey/price.key';
import { fetchBasicPrice } from '../service/price.service';

export const basicPriceQueryOptions = queryOptions({
  queryKey: priceQueryKeys.allBasic,
  queryFn: fetchBasicPrice,
});

export const useGetAllBasicPrice = () => {
  return useQuery(basicPriceQueryOptions);
};

export const useGetAllBasicPriceOfCategory = (categoryId: string | null) => {
  return useQuery({
    ...basicPriceQueryOptions,
    select: (prices) => {
      return prices.filter((price) => price.category_id === categoryId);
    },
    enabled: !!categoryId,
  });
};

export const useGetOnePriceById = (priceId: string | null) => {
  return useQuery({
    ...basicPriceQueryOptions,
    select: (prices) => {
      return prices.find((price) => price.id === priceId);
    },
    enabled: !!priceId,
  });
};
