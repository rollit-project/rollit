import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import SwitchViewButton from '@/components/ui/simulation/SwitchViewButton';

const Simulation = () => {
  return (
    <main className="h-full">
      <SimulationCanvas />
      <SwitchViewButton />
    </main>
  );
};

export default Simulation;
