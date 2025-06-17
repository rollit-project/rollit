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
  simulationSpeed: 1,
  simulationProgress: 0,
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSelectedRail: (rail) => set({ selectedRail: rail }),
  setPlacedItems: (items) => set({ placedItems: items }),
  setPlacedRails: (rails) =>
    set((state) => ({
      placedRails: rails,
      railHistory: [...state.railHistory, [...state.placedRails]],
    })),
  setCoasterPath: (path) => set({ coasterPath: path }),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  setSimulationProgress: (progress) => set({ simulationProgress: progress }),
  setViewMode: (mode) => set({ viewMode: mode }),

  undoRail: () =>
    set((state) => {
      if (state.railHistory.length <= 1) {
        return {
          placedRails: state.railHistory[0],
          railHistory: state.railHistory,
        };
      }

      const previous = state.railHistory[state.railHistory.length - 1];
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

  resetItems: () =>
    set(() => ({
      placedItems: [],
    })),

  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'firstPerson' ? 'thirdPerson' : 'firstPerson',
    })),
}));
