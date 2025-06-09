import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import DirectionalLight from '@/components/scene/DirectionalLight';
import Ground from '@/components/scene/Ground';
import ItemModel from '@/components/scene/ItemModel';
import MouseFollower from '@/components/scene/MouseFollower';
import MoveControls from '@/components/scene/MoveControls';
import RailRenderer from '@/components/scene/RailRenderer';
import { RAIL_POINT_TEMPLATES } from '@/constants/railPointTemplates';
import { RAIL_ROTATION_MAP } from '@/constants/railRotationMap';
import { getWorldRailPoints } from '@/utils/getWorldRailPoints';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

const EditorCanvas = ({
  cameraRotationSpeed,
  cameraMoveSpeed,
  selectedItem,
  selectedRail,
  handleSelectItem,
}) => {
  const orbitControlsRef = useRef();
  const [placedItems, setPlacedItems] = useState([]);
  const [placedRails, setPlacedRails] = useState([]);

  const { scene: coaster } = useGLTF('/objects/coaster.glb');
  const { scene: railStraight } = useGLTF('/objects/rail-straight.glb');

  const handlePlaceItems = (item) => {
    setPlacedItems((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (!selectedRail) {
      return;
    }

    const lastPlacedRail = placedRails.at(-1);
    const startPosition = lastPlacedRail?.endPoint ?? new THREE.Vector3(0, 0, -6);
    const previousYRotation = lastPlacedRail?.accumulatedRotY ?? 0;

    const railPoints = RAIL_POINT_TEMPLATES[selectedRail.name];
    const currentRailYRotation = RAIL_ROTATION_MAP[selectedRail.name] ?? 0;
    const accumulatedRotY = previousYRotation + currentRailYRotation;
    const worldPoints = getWorldRailPoints(railPoints, startPosition, [0, previousYRotation, 0]);
    const endPosition = worldPoints.at(-1);

    const newRail = {
      id: selectedRail.id,
      modelPath: getModelPathByName(selectedRail.name),
      position: startPosition,
      rotation: [0, previousYRotation, 0],
      points: worldPoints,
      endPoint: endPosition,
      accumulatedRotY,
    };

    setPlacedRails((prev) => [...prev, newRail]);
  }, [selectedRail]);

  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
      <color attach="background" args={['#b0eaff']} />
      <MouseFollower
        selectedItem={selectedItem}
        handlePlaceItems={handlePlaceItems}
        handleSelectItem={handleSelectItem}
      />
      <MoveControls moveSpeed={cameraMoveSpeed} orbitControlsRef={orbitControlsRef} />
      <OrbitControls
        ref={orbitControlsRef}
        mouseButtons={{
          LEFT: null,
          MIDDLE: 0,
          RIGHT: 2,
        }}
        rotateSpeed={cameraRotationSpeed}
        panSpeed={cameraMoveSpeed}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.4} />
      <DirectionalLight />
      {placedItems.map((item) => (
        <ItemModel
          key={item.id}
          selectedItem={item.name}
          position={item.position}
          rotation={[0, item.rotationY, 0]}
        />
      ))}
      <RailRenderer placedRails={placedRails} />
      <primitive object={coaster.clone()} position={[0, 0, 0]} />
      <primitive object={railStraight.clone()} position={[0, 0, 0]} />
      <primitive object={railStraight.clone()} position={[0, 0, 6]} />
      <primitive object={railStraight.clone()} position={[0, 0, 12]} />
      <Ground />
      <gridHelper args={[10, 10, 'red', 'white']} position={[0, -0.5, 0]} />
    </Canvas>
  );
};

EditorCanvas.propTypes = {
  cameraRotationSpeed: PropTypes.number.isRequired,
  cameraMoveSpeed: PropTypes.number.isRequired,
  selectedItem: PropTypes.string.isRequired,
  handleSelectItem: PropTypes.func.isRequired,
  selectedRail: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

export default EditorCanvas;
