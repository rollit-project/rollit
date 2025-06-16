import { create } from 'zustand';

import { INITIAL_RAILS } from '@/constants/initialRails';

export const useSceneStore = create((set) => ({
  selectedItem: null,
  selectedRail: null,
  coasterPath: null,
  placedItems: [],
  placedRails: [...INITIAL_RAILS],
  railHistory: [[...INITIAL_RAILS]],
  viewMode: 'thirdPerson',
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSelectedRail: (rail) => set({ selectedRail: rail }),
  setCoasterPath: (path) => set({ coasterPath: path }),
  setPlacedItems: (item) => set({ placedItems: item }),
  setPlacedRails: (rails) =>
    set((state) => ({
      placedRails: rails,
      railHistory: [...state.railHistory, [...state.placedRails]],
    })),
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'firstPerson' ? 'thirdPerson' : 'firstPerson',
    })),
  undoRail: () =>
    set((state) => {
      if (state.railHistory.length <= 1) {
        return {
          placedRails: state.railHistory[0],
          railHistory: state.railHistory,
        };
      }

      const previous = state.railHistory[state.railHistory.length - 2];
      const newHistory = state.railHistory.slice(0, -1);

      return {
        placedRails: previous,
        railHistory: newHistory,
      };
    }),
  resetRails: () =>
    set(() => ({
      placedRails: [...INITIAL_RAILS],
      railHistory: [[...INITIAL_RAILS]],
    })),
}));
