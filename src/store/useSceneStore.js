import { create } from 'zustand';

export const useSceneStore = create((set) => ({
  selectedItem: null,
  selectedRail: null,
  coasterPath: null,
  placedItems: [],
  placedRails: [],
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSelectedRail: (rail) => set({ selectedRail: rail }),
  setCoasterPath: (path) => set({ coasterPath: path }),
  setPlacedItems: (item) => set({ placedItems: item }),
  setPlacedRails: (rail) => set({ placedRails: rail }),
}));
