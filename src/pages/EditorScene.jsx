import { useState } from 'react';

import EditorCanvas from '@/components/scene/EditorCanvas';
import EditorPanel from '@/components/ui/EditorPanel';
import Slider from '@/components/ui/Slider';
import { MIN_CAMERA_SPEED } from '@/constants/cameraSensitivity';

const EditorScene = () => {
  const [cameraRotationSpeed, setCameraRotationSpeed] = useState(MIN_CAMERA_SPEED);
  const [cameraMoveSpeed, setCameraMoveSpeed] = useState(MIN_CAMERA_SPEED);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleRotationSpeedChange = (value) => {
    setCameraRotationSpeed(value);
  };

  const handleMoveSpeedChange = (value) => {
    setCameraMoveSpeed(value);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  return (
    <main className="h-full">
      <EditorCanvas
        cameraRotationSpeed={cameraRotationSpeed}
        cameraMoveSpeed={cameraMoveSpeed}
        selectedTrack={selectedTrack}
        selectedItem={selectedItem}
        handleSelectItem={handleSelectItem}
      />
      <EditorPanel handleSelectItem={handleSelectItem} handleSelectTrack={handleSelectTrack} />
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
      </aside>
    </main>
  );
};

export default EditorScene;
