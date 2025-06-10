import { Line, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';

import DirectionalLight from '@/components/scene/DirectionalLight';
import Ground from '@/components/scene/Ground';
import ItemModel from '@/components/scene/ItemModel';
import MouseFollower from '@/components/scene/MouseFollower';
import MoveControls from '@/components/scene/MoveControls';
import RailRenderer from '@/components/scene/RailRenderer';

const EditorCanvas = ({
  cameraRotationSpeed,
  cameraMoveSpeed,
  selectedItem,
  placedRails,
  handleSelectItem,
  curve,
}) => {
  const orbitControlsRef = useRef();
  const [placedItems, setPlacedItems] = useState([]);
  const { scene: coaster } = useGLTF('/objects/coaster.glb');

  const handlePlaceItems = (item) => {
    setPlacedItems((prev) => [...prev, item]);
  };

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
      <Ground />
      <gridHelper args={[10, 10, 'red', 'white']} position={[0, -0.5, 0]} />
      {curve && <Line points={curve.getPoints(100)} color="yellow" lineWidth={2} />}
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
  placedRails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      modelPath: PropTypes.string.isRequired,
      position: PropTypes.oneOfType([
        PropTypes.instanceOf(Vector3),
        PropTypes.arrayOf(PropTypes.number),
      ]),
      rotation: PropTypes.arrayOf(PropTypes.number).isRequired,
      points: PropTypes.arrayOf(PropTypes.instanceOf(Vector3)).isRequired,
    }),
  ).isRequired,
  curve: PropTypes.instanceOf(THREE.CatmullRomCurve3),
};

export default EditorCanvas;
