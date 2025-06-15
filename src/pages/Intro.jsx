import { useNavigate } from 'react-router-dom';

import { useAudioStore } from '@/store/useAudioStore';

const Intro = () => {
  const navigate = useNavigate();
  const playBgm = useAudioStore((state) => state.playBgm);

  const handleStart = () => {
    playBgm('/sounds/intro.mp3');
    navigate('/editor');
  };

  return (
    <main className="h-screen bg-[url(/images/intro.png)] bg-cover bg-center">
      <button
        type="button"
        onClick={handleStart}
        className="btn-primary fixed top-2/3 right-1/2 translate-x-1/2 p-[20px] text-[36px]"
      >
        START
      </button>
    </main>
  );
};

export default Intro;
