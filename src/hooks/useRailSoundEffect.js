import { useEffect } from 'react';

import { SFX_PATHS, SOUND_CONFIG } from '@/constants/sound';
import { useAudioStore } from '@/store/useAudioStore';

export const useRailSoundEffect = ({ progress }) => {
  const playSfx = useAudioStore((state) => state.playSfx);
  const stopSfx = useAudioStore((state) => state.stopSfx);
  const loopingSfxAudio = useAudioStore((state) => state.loopingSfxAudio);

  useEffect(() => {
    if (progress >= 1) {
      stopSfx();

      return;
    }

    if (!loopingSfxAudio) {
      playSfx(SFX_PATHS.run, SOUND_CONFIG.BGM.DEFAULT_VOLUME, true);
    }
  }, [progress, loopingSfxAudio, playSfx, stopSfx]);
};
