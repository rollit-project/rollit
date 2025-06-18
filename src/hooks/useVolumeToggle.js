import { useCallback, useState } from 'react';

import { SOUND_CONFIG } from '@/constants/sound';

const { DEFAULT_VOLUME, MIN_VOLUME } = SOUND_CONFIG.BGM;

export const useVolumeToggle = (initialVolume) => {
  const [lastVolume, setLastVolume] = useState(
    initialVolume > MIN_VOLUME ? initialVolume : DEFAULT_VOLUME,
  );

  const isMuted = initialVolume === MIN_VOLUME;

  const toggle = useCallback(
    (onChange) => {
      if (initialVolume > MIN_VOLUME) {
        setLastVolume(initialVolume);
        onChange(0);
      } else {
        onChange(lastVolume || DEFAULT_VOLUME);
      }
    },
    [initialVolume, lastVolume],
  );

  return { toggle, isMuted };
};
