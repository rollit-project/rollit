import { create } from 'zustand';

import { INITIAL_RAILS } from '@/constants/initialRails';

export const useSceneStore = create((set) => ({
  selectedItem: null,
  selectedRail: null,
  coasterPath: null,
  placedItems: [],
  placedRails: [],
  railHistory: [],
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSelectedRail: (rail) => set({ selectedRail: rail }),
  setCoasterPath: (path) => set({ coasterPath: path }),
  setPlacedItems: (item) => set({ placedItems: item }),
  setPlacedRails: (rails) =>
    set((state) => ({
      placedRails: rails,
      railHistory: [...state.railHistory, state.placedRails],
    })),
  undoRail: () =>
    set((state) => {
      if (state.railHistory.length === 0) {
        return {};
      }

      const newHistory = [...state.railHistory];
      const previous = newHistory.pop();

      return {
        placedRails: previous,
        railHistory: newHistory,
      };
    }),
  resetRails: () =>
    set(() => ({
      placedRails: [...INITIAL_RAILS],
      railHistory: [],
    })),
}));
