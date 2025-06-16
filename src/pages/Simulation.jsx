import { FaEye, FaUser } from 'react-icons/fa';

import SimulationCanvas from '@/components/canvas/SimulationCanvas';
import { useSceneStore } from '@/store/useSceneStore';

const Simulation = () => {
  const viewMode = useSceneStore((state) => state.viewMode);
  const setViewMode = useSceneStore((state) => state.setViewMode);

  return (
    <main className="h-full">
      <SimulationCanvas />
      <button
        type="button"
        onClick={setViewMode}
        className="absolute top-5 right-5 z-10 flex items-center gap-2 rounded-full bg-yellow-300 px-4 py-3 text-sm font-semibold text-black shadow transition hover:scale-105 active:scale-95"
        title="시점 전환"
      >
        {viewMode === 'firstPerson' ? (
          <>
            <FaUser />
            <span>3인칭 보기</span>
          </>
        ) : (
          <>
            <FaEye />
            <span>1인칭 보기</span>
          </>
        )}
      </button>
    </main>
  );
};

export default Simulation;
