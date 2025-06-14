import toast from 'react-hot-toast';
import { create } from 'zustand';

import { SOUND_CONFIG } from '@/constants/sound';

export const useAudioStore = create((set, get) => {
  const {
    BGM: { DEFAULT_VOLUME },
    SFX: { RAIL_INSTALL_VOLUME },
  } = SOUND_CONFIG;

  return {
    src: null,
    playing: false,
    volume: DEFAULT_VOLUME,
    currentSfxAudio: null,
    lastRailType: null,

    playBgm: (src) => {
      localStorage.setItem('bgm_enabled', 'true');
      set({ src, playing: true });
    },

    pauseBgm: () => {
      localStorage.removeItem('bgm_enabled');
      set({ playing: false });
    },

    playSfx: async (src, sfxVolume = RAIL_INSTALL_VOLUME) => {
      const { currentSfxAudio } = get();
      const isSoundActiveAndPlaying = currentSfxAudio && !currentSfxAudio.ended;

      if (isSoundActiveAndPlaying) {
        currentSfxAudio.pause();
        currentSfxAudio.currentTime = 0;
      }

      const sfx = new Audio(src);

      sfx.volume = sfxVolume;

      set({ currentSfxAudio: sfx });

      try {
        await sfx.play();
      } catch (error) {
        toast.error('🔇 효과음 재생 실패: ', { duration: 1000 });
      }
    },

    setVolume: (volume) => {
      const numericVolume = parseFloat(volume);

      set({ volume: numericVolume });
    },

    stopSfx: () => {
      const { currentSfxAudio } = get();
      const isSoundActiveAndPlaying = currentSfxAudio && !currentSfxAudio.ended;

      if (isSoundActiveAndPlaying) {
        currentSfxAudio.pause();
        currentSfxAudio.currentTime = 0;
        set({ currentSfxAudio: null });
      }
    },

    setLastRailType: (type) => set({ lastRailType: type }),
  };
});
