import { useEffect } from 'react';

import { RAIL_SOUNDS } from '@/constants/sound';
import { useAudioStore } from '@/store/useAudioStore';

export const useRailSoundEffect = ({ progress, placedRails }) => {
  const playSfx = useAudioStore((s) => s.playSfx);
  const stopSfx = useAudioStore((s) => s.stopSfx);
  const lastRailType = useAudioStore((s) => s.lastRailType);
  const setLastRailType = useAudioStore((s) => s.setLastRailType);

  useEffect(() => {
    if (progress >= 1) {
      stopSfx();

      return;
    }

    const index = Math.floor(progress * placedRails.length);
    const rail = placedRails[index];

    if (!rail) {
      return;
    }

    const getRailTypeFromPath = (path) =>
      ['straight', 'up', 'down'].find((type) => path.includes(type)) || 'straight';

    const currentType = getRailTypeFromPath(rail.modelPath);

    if (currentType !== lastRailType) {
      const sfx = RAIL_SOUNDS[currentType];

      if (sfx) {
        playSfx(sfx);
        setLastRailType(currentType);
      }
    }
  }, [progress, placedRails, lastRailType]);
};
