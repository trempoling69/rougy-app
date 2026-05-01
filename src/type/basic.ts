import { Item } from "../store/cart.store";

export type Price = {
  id: string;
  name: string;
  amount: number;
  category_id?: string;
  categoryPrice?: CategoryPrice | null;
};

export type CategoryPrice = {
  id: string;
  name: string;
};

export type Bill = {
  id: string;
  products: Item[];
  total: number;
  createdAt: string;
};
