import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import EditorCanvas from '@/components/scene/EditorCanvas';
import EditorPanel from '@/components/ui/EditorPanel';
import Slider from '@/components/ui/Slider';
import { MIN_CAMERA_SPEED } from '@/constants/cameraSensitivity';
import { INITIAL_RAILS } from '@/constants/initialRails';
import { usePlaceRails } from '@/hooks/usePlaceRails';
import { generateTrackCurve } from '@/utils/generateTrackCurve';

const EditorScene = () => {
  const [cameraRotationSpeed, setCameraRotationSpeed] = useState(MIN_CAMERA_SPEED);
  const [cameraMoveSpeed, setCameraMoveSpeed] = useState(MIN_CAMERA_SPEED);
  const [selectedRail, setSelectedRail] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const placedRails = usePlaceRails(selectedRail, INITIAL_RAILS);
  const [curve, setCurve] = useState(null);
  const navigate = useNavigate();

  const handleRotationSpeedChange = (value) => {
    setCameraRotationSpeed(value);
  };

  const handleMoveSpeedChange = (value) => {
    setCameraMoveSpeed(value);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleSelectRail = (railName) => {
    setSelectedRail({
      name: railName,
      id: uuidv4(),
    });
  };

  const handleStartSimulation = () => {
    const points = placedRails.flatMap((rail) => rail.points);
    const generatedCurve = generateTrackCurve(points);

    setCurve(generatedCurve);
    navigate('/simulation');
  };

  return (
    <main className="h-full">
      <EditorCanvas
        cameraRotationSpeed={cameraRotationSpeed}
        cameraMoveSpeed={cameraMoveSpeed}
        placedRails={placedRails}
        selectedItem={selectedItem}
        handleSelectItem={handleSelectItem}
        curve={curve}
      />
      <EditorPanel
        handleSelectItem={handleSelectItem}
        handleSelectRail={handleSelectRail}
        handleStartSimulation={handleStartSimulation}
      />
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
