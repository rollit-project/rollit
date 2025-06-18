import { useAudioStore } from '@/store/useAudioStore';

export const useAudio = () => {
  const volume = useAudioStore((state) => state.volume);
  const setVolume = useAudioStore((state) => state.setVolume);

  const playBgm = useAudioStore((state) => state.playBgm);
  const pauseBgm = useAudioStore((state) => state.pauseBgm);

  const playSfx = useAudioStore((state) => state.playSfx);
  const stopSfx = useAudioStore((state) => state.stopSfx);

  const isBgmPlaying = useAudioStore((state) => state.bgm.isPlaying);
  const currentBgm = useAudioStore((state) => state.bgm.audio);
  const sfxAudio = useAudioStore((state) => state.sfx);

  return {
    volume,
    setVolume,
    playBgm,
    pauseBgm,
    playSfx,
    stopSfx,
    isBgmPlaying,
    currentBgm,
    sfxAudio,
  };
};
