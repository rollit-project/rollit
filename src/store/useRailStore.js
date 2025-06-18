import { create } from 'zustand';

import { INITIAL_RAILS } from '@/constants/rail/initialRails';

export const useRailStore = create((set) => ({
  placedRails: [...INITIAL_RAILS],
  railHistory: [[...INITIAL_RAILS]],
  selectedRail: null,

  setPlacedRails: (rails) =>
    set((state) => ({
      placedRails: rails,
      railHistory: [...state.railHistory, [...state.placedRails]],
    })),
  undoRail: () =>
    set((state) => {
      if (state.railHistory.length <= 1) {
        return state;
      }
      const previous = state.railHistory[state.railHistory.length - 2];
      const newHistory = state.railHistory.slice(0, -1);

      return { placedRails: previous, railHistory: newHistory };
    }),
  resetRails: () =>
    set(() => ({
      placedRails: [...INITIAL_RAILS],
      railHistory: [[...INITIAL_RAILS]],
    })),
  setSelectedRail: (rail) => set({ selectedRail: rail }),
}));
