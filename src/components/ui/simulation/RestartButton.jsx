import { FaCar } from 'react-icons/fa';

import { useSceneStore } from '@/store/useSceneStore';

const RestartButton = () => {
  const setSimulationProgress = useSceneStore((state) => state.setSimulationProgress);

  return (
    <button
      type="button"
      onClick={() => setSimulationProgress(0)}
      className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:scale-105 active:scale-95"
    >
      <FaCar />
      다시 타기
    </button>
  );
};

export default RestartButton;
