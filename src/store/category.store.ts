import { create } from 'zustand';

type CategoryState = {
  selectedCategoryId: string | null;
  setSelectedCategory: (categoryId: string) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategoryId: null,
  setSelectedCategory: (categoryId) =>
    set({
      selectedCategoryId: categoryId,
    }),
}));
