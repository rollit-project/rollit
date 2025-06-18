import { create } from 'zustand';

export const useSimulationStore = create((set) => ({
  coasterPath: null,
  viewMode: 'thirdPerson',
  simulationSpeed: 1,
  simulationProgress: 0,

  setCoasterPath: (path) => set({ coasterPath: path }),
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'firstPerson' ? 'thirdPerson' : 'firstPerson',
    })),
  setSimulationSpeed: (value) => set({ simulationSpeed: value }),
  setSimulationProgress: (value) => set({ simulationProgress: value }),
}));
