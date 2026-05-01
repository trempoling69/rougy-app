import { get } from '../../../config/api';
import { Bill } from '../../../type/basic';

export const fetchBillHistory = async (startDate: string, endDate?: string) => {
  const { data } = await get<Bill[]>(`/api/cart/history`, { startDate, endDate });
  return data;
};
