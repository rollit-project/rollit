import { useEffect, useState } from 'react';

import EditorCanvas from '@/components/canvas/EditorCanvas';
import CameraSpeedSlider from '@/components/ui/editor/CameraSpeedSlider';
import EditorPanel from '@/components/ui/editor/EditorPanel';
import VolumeSlider from '@/components/ui/editor/VolumeSlider';
import { MIN_CAMERA_SPEED } from '@/constants/camera/cameraSensitivity';
import { INITIAL_RAILS } from '@/constants/rail/initialRails';
import { useAudio } from '@/hooks/useAudio';
import { usePlaceRails } from '@/hooks/usePlaceRails';
import { useItemStore } from '@/store/useItemStore';
import { useRailStore } from '@/store/useRailStore';
import { useSimulationStore } from '@/store/useSimulationStore';

const Editor = () => {
  const [cameraRotationSpeed, setCameraRotationSpeed] = useState(MIN_CAMERA_SPEED);
  const [cameraMoveSpeed, setCameraMoveSpeed] = useState(MIN_CAMERA_SPEED);
  const resetRails = useRailStore((state) => state.resetRails);
  const resetItems = useItemStore((state) => state.resetItems);
  const setCoasterPath = useSimulationStore((state) => state.setCoasterPath);
  const { volume, setVolume } = useAudio();

  const handleRotationSpeedChange = (value) => {
    setCameraRotationSpeed(value);
  };

  const handleMoveSpeedChange = (value) => {
    setCameraMoveSpeed(value);
  };

  usePlaceRails(INITIAL_RAILS);

  useEffect(() => {
    resetRails();
    resetItems();
    setCoasterPath(null);
  }, []);

  return (
    <main className="h-full">
      <EditorCanvas cameraRotationSpeed={cameraRotationSpeed} cameraMoveSpeed={cameraMoveSpeed} />
      <EditorPanel />
      <aside className="fixed top-10 left-10 flex flex-col gap-3 rounded-xl bg-white/20 p-5 shadow-md backdrop-blur-md">
        <CameraSpeedSlider
          label="카메라 회전 속도"
          id="rotationSpeed"
          value={cameraRotationSpeed}
          onChange={handleRotationSpeedChange}
        />
        <CameraSpeedSlider
          label="카메라 이동 속도"
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
