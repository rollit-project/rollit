import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import { useAudioStore } from '@/store/useAudioStore';

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const { src, playing, volume } = useAudioStore();

  useEffect(() => {
    const handleAudio = async () => {
      const audio = audioRef.current;

      if (!audio || !src) {
        return;
      }

      audio.src = src;
      audio.loop = true;

      if (playing) {
        try {
          await audio.play();
          audio.volume = volume;
        } catch (error) {
          toast.error('🔇 자동 재생 실패:', { duration: 1000 });
        }
      } else {
        audio.pause();
      }
    };

    handleAudio();
  }, [src, playing]);

  useEffect(() => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = volume;
      } catch (error) {
        toast.error('🔇 볼륨 조절 실패:', { duration: 1000 });
      }
    }
  }, [volume]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <audio ref={audioRef} hidden />;
};

export default GlobalAudioPlayer;
