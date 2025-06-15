import { useEffect } from 'react';

import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import { SFX_PATHS } from '@/constants/sound';
import { useAudioStore } from '@/store/useAudioStore';

const Simulation = () => {
  const playSfx = useAudioStore((state) => state.playSfx);
  const pauseBgm = useAudioStore((state) => state.pauseBgm);

  useEffect(() => {
    pauseBgm();
    playSfx(SFX_PATHS.play, 0.5, true);
  }, []);

  return (
    <main className="h-full">
      <SimulationCanvas />
    </main>
  );
};

export default Simulation;
