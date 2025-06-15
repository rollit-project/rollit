import toast from 'react-hot-toast';
import { create } from 'zustand';

import { SOUND_CONFIG } from '@/constants/sound';

export const useAudioStore = create((set, get) => {
  const {
    BGM: { DEFAULT_VOLUME },
    SFX: { RAIL_INSTALL_VOLUME },
  } = SOUND_CONFIG;

  let loopAudio = null;

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

    playSfx: async (src, sfxVolume = RAIL_INSTALL_VOLUME, loop = false) => {
      try {
        if (loop && loopAudio) {
          loopAudio.pause();
          loopAudio.currentTime = 0;
          loopAudio.src = '';
          loopAudio = null;
        }

        if (loop) {
          const audio = new Audio(src);

          audio.volume = sfxVolume;
          audio.loop = true;
          loopAudio = audio;

          audio.addEventListener('canplaythrough', () => {
            audio.play().catch(() => {
              toast.error('🔇 효과음 재생 실패', { duration: 1000 });
            });
          });

          audio.load();
        } else {
          const sfx = new Audio(src);

          sfx.volume = sfxVolume;
          await sfx.play();
          set({ currentSfxAudio: sfx });
        }
      } catch (error) {
        toast.error('🔇 효과음 재생 실패', { duration: 1000 });
      }
    },

    stopSfx: () => {
      const { currentSfxAudio } = get();

      if (currentSfxAudio) {
        currentSfxAudio.pause();
        currentSfxAudio.currentTime = 0;
        set({ currentSfxAudio: null });
      }

      if (loopAudio) {
        loopAudio.pause();
        loopAudio.currentTime = 0;
        loopAudio.src = '';
        loopAudio = null;
      }
    },

    setVolume: (volume) => {
      const numericVolume = parseFloat(volume);

      set({ volume: numericVolume });
    },

    setLastRailType: (type) => set({ lastRailType: type }),
  };
});
