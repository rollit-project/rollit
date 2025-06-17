import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import RestartButton from '@/components/ui/simulation/RestartButton';
import SwitchViewButton from '@/components/ui/simulation/SwitchViewButton';
import { useSceneStore } from '@/store/useSceneStore';

const Simulation = () => {
  const simulationProgress = useSceneStore((state) => state.simulationProgress);

  return (
    <main className="h-full">
      <SimulationCanvas />
      {simulationProgress >= 1 ? <RestartButton /> : <SwitchViewButton />}
    </main>
  );
};

export default Simulation;
