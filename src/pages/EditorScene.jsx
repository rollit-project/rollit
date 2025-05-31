import { useState } from 'react';

import EditorCanvas from '@/components/EditorCanvas';
import Slider from '@/components/Slider';

const EditorScene = () => {
  const [cameraRotationSpeed, setCameraRotationSpeed] = useState(0.1);
  const [cameraMoveSpeed, setCameraMoveSpeed] = useState(0.1);

  const handleRotationSpeedChange = (value) => {
    setCameraRotationSpeed(value);
  };
  const handleMoveSpeedChange = (value) => {
    setCameraMoveSpeed(value);
  };

  return (
    <main className="h-full">
      <EditorCanvas cameraRotationSpeed={cameraRotationSpeed} cameraMoveSpeed={cameraMoveSpeed} />
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
