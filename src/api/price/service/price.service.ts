import { get } from '../../../config/api';
import { Price } from '../../../type/basic';

export const fetchBasicPrice = async () => {
  const { data } = await get<Price[]>('/api/prices/type/BP');
  return data;
};
