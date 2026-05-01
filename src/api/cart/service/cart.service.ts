import { patch, post } from '../../../config/api';
import { Item } from '../../../store/cart.store';

export const createOneCart = async ({ products, total }: { products: Item[]; total: number }) => {
  const { data } = await post<string, { products: Item[]; total: number }>('/api/cart', { products, total });
  return data;
};

export const updateOneCart = async ({
  cartId,
  products,
  total,
}: {
  cartId: string;
  products: Item[];
  total: number;
}) => {
  const { data } = await patch<string, { products: Item[]; total: number }>(`/api/cart/${cartId}`, {
    products,
    total,
  });
  return data;
};
