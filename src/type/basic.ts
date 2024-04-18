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
