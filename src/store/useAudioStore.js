import toast from 'react-hot-toast';
import { create } from 'zustand';

import { SOUND_CONFIG } from '@/constants/sound';

export const useAudioStore = create((set, get) => {
  const {
    BGM: { DEFAULT_VOLUME },
    SFX: { RAIL_INSTALL_VOLUME },
  } = SOUND_CONFIG;

  return {
    bgmAudio: null,
    src: null,
    isBgmPlaying: false,
    volume: DEFAULT_VOLUME,
    oneShotSfxAudio: null,
    loopingSfxAudio: null,

    playBgm: async (src) => {
      const { bgmAudio, volume } = get();

      if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      }

      const audio = new Audio(src);

      audio.loop = true;
      audio.volume = volume;

      try {
        await audio.play();
        set({ bgmAudio: audio, isBgmPlaying: true, src });
      } catch {
        toast.error('🔇 BGM 재생 실패');
      }
    },

    pauseBgm: () => {
      const { bgmAudio } = get();

      if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      }

      localStorage.removeItem('bgm_enabled');
      set({ isBgmPlaying: false, bgmAudio: null });
    },

    playSfx: async (src, sfxVolume = RAIL_INSTALL_VOLUME, loop = false) => {
      const state = get();

      if (loop && state.loopingSfxAudio) {
        state.loopingSfxAudio.pause();
        state.loopingSfxAudio.currentTime = 0;
        set({ loopingSfxAudio: null });
      }

      try {
        const audio = new Audio(src);

        audio.volume = sfxVolume;
        audio.loop = loop;

        await audio.play();

        if (loop) {
          set({ loopingSfxAudio: audio });
        } else {
          set({ oneShotSfxAudio: audio });
        }
      } catch (error) {
        toast.error('🔇 효과음 재생 실패', { duration: 1000 });
      }
    },

    stopSfx: () => {
      const { oneShotSfxAudio, loopingSfxAudio } = get();

      if (oneShotSfxAudio) {
        oneShotSfxAudio.pause();
        oneShotSfxAudio.currentTime = 0;
        set({ oneShotSfxAudio: null });
      }

      if (loopingSfxAudio) {
        loopingSfxAudio.pause();
        loopingSfxAudio.currentTime = 0;
        set({ loopingSfxAudio: null });
      }
    },

    setVolume: (volume) => {
      const numericVolume = parseFloat(volume);

      set({ volume: numericVolume });

      const { bgmAudio, loopingSfxAudio, oneShotSfxAudio } = get();

      if (bgmAudio) {
        bgmAudio.volume = numericVolume;
      }
      if (loopingSfxAudio) {
        loopingSfxAudio.volume = numericVolume;
      }
      if (oneShotSfxAudio) {
        oneShotSfxAudio.volume = numericVolume;
      }
    },
  };
});
