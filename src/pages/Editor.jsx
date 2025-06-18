import { useEffect, useState } from 'react';

import EditorCanvas from '@/components/canvas/EditorCanvas';
import EditorPanel from '@/components/ui/editor/EditorPanel';
import Slider from '@/components/ui/editor/Slider';
import VolumeSlider from '@/components/ui/editor/VolumeSlider';
import { MIN_CAMERA_SPEED } from '@/constants/cameraSensitivity';
import { INITIAL_RAILS } from '@/constants/initialRails';
import { useAudio } from '@/hooks/useAudio';
import { usePlaceRails } from '@/hooks/usePlaceRails';
import { useSceneStore } from '@/store/useSceneStore';

const Editor = () => {
  const [cameraRotationSpeed, setCameraRotationSpeed] = useState(MIN_CAMERA_SPEED);
  const [cameraMoveSpeed, setCameraMoveSpeed] = useState(MIN_CAMERA_SPEED);
  const resetRails = useSceneStore((state) => state.resetRails);
  const resetItems = useSceneStore((state) => state.resetItems);
  const setCoasterPath = useSceneStore((state) => state.setCoasterPath);
  const { stopSfx, volume, setVolume } = useAudio();

  const handleRotationSpeedChange = (value) => {
    setCameraRotationSpeed(value);
  };

  const handleMoveSpeedChange = (value) => {
    setCameraMoveSpeed(value);
  };

  usePlaceRails(INITIAL_RAILS);

  useEffect(() => {
    stopSfx();
    resetRails();
    resetItems();
    setCoasterPath(null);
  }, []);

  return (
    <main className="h-full">
      <EditorCanvas cameraRotationSpeed={cameraRotationSpeed} cameraMoveSpeed={cameraMoveSpeed} />
      <EditorPanel />
      <aside className="fixed top-10 left-10 flex flex-col gap-3 rounded-xl bg-white/20 p-5 shadow-md backdrop-blur-md">
        <Slider
          label="회전 속도"
          id="rotationSpeed"
          value={cameraRotationSpeed}
          onChange={handleRotationSpeedChange}
        />
        <Slider
          label="이동 속도"
          id="moveSpeed"
          value={cameraMoveSpeed}
          onChange={handleMoveSpeedChange}
        />
        <VolumeSlider label="BGM 볼륨" id="bgmVolume" value={volume} onChange={setVolume} />
      </aside>
    </main>
  );
};

export default Editor;
