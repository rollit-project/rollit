import { useEffect, useRef } from 'react';

import { SFX_PATHS, SOUND_CONFIG } from '@/constants/sound';
import { useAudioStore } from '@/store/useAudioStore';

export const useRailSoundEffect = ({ progress }) => {
  const playSfx = useAudioStore((state) => state.playSfx);
  const stopSfx = useAudioStore((state) => state.stopSfx);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (progress >= 1) {
      stopSfx();
      hasPlayedRef.current = false;

      return;
    }

    if (!hasPlayedRef.current) {
      playSfx(SFX_PATHS.run, SOUND_CONFIG.BGM.DEFAULT_VOLUME, true);
      hasPlayedRef.current = true;
    }
  }, [progress]);
};
