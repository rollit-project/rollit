import toast from 'react-hot-toast';
import { create } from 'zustand';

import { SOUND_CONFIG } from '@/constants/sound';

export const useAudioStore = create((set, get) => {
  const {
    BGM: { DEFAULT_VOLUME },
    SFX: { RAIL_INSTALL_VOLUME },
  } = SOUND_CONFIG;

  const pauseAndReset = (audio) => {
    if (!audio) {
      return;
    }
    const audioRef = audio;

    audioRef.pause();
    audioRef.currentTime = 0;
  };

  return {
    bgm: {
      audio: null,
      isPlaying: false,
    },
    sfx: {
      oneShot: null,
      loop: null,
    },
    volume: DEFAULT_VOLUME,

    playBgm: async (src) => {
      const { bgm, volume } = get();

      if (bgm.audio) {
        pauseAndReset(bgm.audio);
      }

      const audio = new Audio(src);

      audio.loop = true;
      audio.volume = volume;

      try {
        await audio.play();
        set({ bgm: { audio, isPlaying: true } });
      } catch (err) {
        toast.error('🔇 BGM 재생 실패');
      }
    },

    pauseBgm: () => {
      const { bgm } = get();

      if (bgm.audio) {
        pauseAndReset(bgm.audio);
      }

      localStorage.removeItem('bgm_enabled');
      set({ bgm: { audio: null, isPlaying: false } });
    },

    playSfx: async (src, sfxVolume = RAIL_INSTALL_VOLUME, loop = false) => {
      const { sfx } = get();

      if (loop && sfx.loop) {
        pauseAndReset(sfx.loop);
      } else if (!loop && sfx.oneShot) {
        pauseAndReset(sfx.oneShot);
      }

      const audio = new Audio(src);

      audio.volume = sfxVolume;
      audio.loop = loop;
      if (loop) {
        set((state) => ({ sfx: { ...state.sfx, loop: audio } }));
      } else {
        set((state) => ({ sfx: { ...state.sfx, oneShot: audio } }));
      }

      try {
        await audio.play();
      } catch (err) {
        if (!loop) {
          toast.error('🔇 효과음 재생 실패');
        }
      }
    },

    stopSfx: () => {
      const { sfx } = get();

      if (sfx.oneShot) {
        pauseAndReset(sfx.oneShot);
      }

      if (sfx.loop) {
        pauseAndReset(sfx.loop);
      }

      set({ sfx: { oneShot: null, loop: null } });
    },

    setVolume: (value) => {
      const volume = parseFloat(value);
      const { bgm, sfx } = get();

      if (bgm.audio) {
        bgm.audio.volume = volume;
      }
      if (sfx.oneShot) {
        sfx.oneShot.volume = volume;
      }
      if (sfx.loop) {
        sfx.loop.volume = volume;
      }

      set({ volume });
    },
  };
});
