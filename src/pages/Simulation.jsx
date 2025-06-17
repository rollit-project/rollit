import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import RestartButton from '@/components/ui/simulation/RestartButton';
import SwitchViewButton from '@/components/ui/simulation/SwitchViewButton';
import { useSceneStore } from '@/store/useSceneStore';

const Simulation = () => {
  const simulationProgress = useSceneStore((state) => state.simulationProgress);
  const isSimulationFinished = simulationProgress >= 1;

  return (
    <main className="h-full">
      <SimulationCanvas />
      {isSimulationFinished ? <RestartButton /> : <SwitchViewButton />}
    </main>
  );
};

export default Simulation;
