import { FaCar } from 'react-icons/fa';

import { SFX_PATHS, SOUND_CONFIG } from '@/constants/sound';
import { useAudio } from '@/hooks/useAudio';
import { useSceneStore } from '@/store/useSceneStore';

const RestartButton = () => {
  const { playSfx } = useAudio();
  const setSimulationProgress = useSceneStore((state) => state.setSimulationProgress);
  const { START_VOLUME } = SOUND_CONFIG;

  return (
    <button
      type="button"
      onClick={() => {
        setSimulationProgress(0);
        playSfx(SFX_PATHS.play, START_VOLUME, true);
      }}
      className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:scale-105 active:scale-95"
    >
      <FaCar />
      다시 타기
    </button>
  );
};

export default RestartButton;
