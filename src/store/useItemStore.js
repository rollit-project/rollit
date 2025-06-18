import { create } from 'zustand';

export const useItemStore = create((set) => ({
  placedItems: [],
  selectedItem: null,

  setPlacedItems: (items) => set({ placedItems: items }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  resetItems: () => set({ placedItems: [] }),
}));
