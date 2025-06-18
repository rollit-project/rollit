import { Link } from 'react-router-dom';

import { useAudio } from '@/hooks/useAudio';

const Intro = () => {
  const { playBgm } = useAudio();

  const handleStart = () => {
    localStorage.setItem('bgm_enabled', 'true');
    playBgm('/sounds/intro.mp3');
  };

  return (
    <main className="h-screen bg-[url(/images/ui/intro.png)] bg-cover bg-center">
      <Link
        to="/editor"
        onClick={handleStart}
        className="btn-primary fixed top-2/3 right-1/2 translate-x-1/2 p-[20px] text-[36px]"
      >
        START
      </Link>
    </main>
  );
};

export default Intro;
