import { useEffect, useState } from 'react';

import EditorCanvas from '@/components/canvas/EditorCanvas';
import EditorPanel from '@/components/ui/editor/EditorPanel';
import Slider from '@/components/ui/editor/Slider';
import VolumeSlider from '@/components/ui/editor/VolumeSlider';
import { MIN_CAMERA_SPEED } from '@/constants/cameraSensitivity';
import { INITIAL_RAILS } from '@/constants/initialRails';
import { usePlaceRails } from '@/hooks/usePlaceRails';
import { useAudioStore } from '@/store/useAudioStore';

const Editor = () => {
  const [cameraRotationSpeed, setCameraRotationSpeed] = useState(MIN_CAMERA_SPEED);
  const [cameraMoveSpeed, setCameraMoveSpeed] = useState(MIN_CAMERA_SPEED);

  const volume = useAudioStore((state) => state.volume);
  const setVolume = useAudioStore((state) => state.setVolume);
  const playBgm = useAudioStore((state) => state.playBgm);

  usePlaceRails(INITIAL_RAILS);

  useEffect(() => {
    const bgmEnabled = localStorage.getItem('bgm_enabled');

    if (bgmEnabled === 'true') {
      const onUserInteraction = () => {
        playBgm('/sounds/intro.mp3');
        document.removeEventListener('click', onUserInteraction);
      };

      document.addEventListener('click', onUserInteraction);
    }
  }, [playBgm]);

  return (
    <main className="h-full">
      <EditorCanvas cameraRotationSpeed={cameraRotationSpeed} cameraMoveSpeed={cameraMoveSpeed} />
      <EditorPanel />

      <aside className="fixed top-10 left-10 flex flex-col gap-3 rounded-xl bg-white/20 p-5 shadow-md backdrop-blur-md">
        <Slider
          label="회전 속도"
          id="rotationSpeed"
          value={cameraRotationSpeed}
          onChange={setCameraRotationSpeed}
        />
        <Slider
          label="이동 속도"
          id="moveSpeed"
          value={cameraMoveSpeed}
          onChange={setCameraMoveSpeed}
        />
        <VolumeSlider label="BGM 볼륨" id="bgmVolume" value={volume} onChange={setVolume} />
      </aside>
    </main>
  );
};

export default Editor;
