import { queryOptions, useQuery } from '@tanstack/react-query';
import { billQueryKeys } from '../queryKey/bill.key';
import { fetchBillHistory } from '../service/bill.service';

export const billHistoryQueryOptions = (startDate: string, endDate?: string) =>
  queryOptions({
    queryKey: billQueryKeys.history(startDate, endDate),
    queryFn: () => fetchBillHistory(startDate, endDate),
  });

export const useGetBillHistory = (startDate: string, endDate?: string) => {
  return useQuery(billHistoryQueryOptions(startDate, endDate));
};

export const useGetOneBillById = (id: string, startDate: string, endDate?: string) => {
  return useQuery({ ...billHistoryQueryOptions(startDate, endDate), select: (bill) => bill.find((bill) => bill.id === id) });
};
