import { create } from 'zustand';

interface CategoryState {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useCategory = create<CategoryState>((set) => ({
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
