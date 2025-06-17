import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import RestartButton from '@/components/ui/simulation/RestartButton';
import SwitchViewButton from '@/components/ui/simulation/SwitchViewButton';
import { useSceneStore } from '@/store/useSceneStore';

const Simulation = () => {
  const navigate = useNavigate();
  const simulationProgress = useSceneStore((state) => state.simulationProgress);
  const coasterPath = useSceneStore((state) => state.coasterPath);
  const isSimulationFinished = simulationProgress >= 1;

  useEffect(() => {
    if (!coasterPath) {
      navigate('/', { replace: true });
    }
  }, [coasterPath, navigate]);

  return (
    <main className="h-full">
      <SimulationCanvas />
      {isSimulationFinished ? <RestartButton /> : <SwitchViewButton />}
    </main>
  );
};

export default Simulation;
