import { useEffect } from 'react';

import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import { useAudioStore } from '@/store/useAudioStore';

const Simulation = () => {
  useEffect(() => {
    useAudioStore.getState().pauseBgm();
  }, []);

  return (
    <main className="h-full">
      <SimulationCanvas />
    </main>
  );
};

export default Simulation;
