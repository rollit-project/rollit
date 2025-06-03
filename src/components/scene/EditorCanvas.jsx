import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import DirectionalLight from '@/components/scene/DirectionalLight';
import Ground from '@/components/scene/Ground';
import MouseFollower from '@/components/scene/MouseFollower';
import MoveControls from '@/components/scene/MoveControls';

const EditorCanvas = ({ cameraRotationSpeed, cameraMoveSpeed, selectedItem }) => {
  const orbitControlsRef = useRef();

  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
      <MouseFollower selectedItem={selectedItem} />
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
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <Ground />
      <gridHelper args={[10, 10, 'red', 'white']} position={[0, -0.5, 0]} />
    </Canvas>
  );
};

EditorCanvas.propTypes = {
  cameraRotationSpeed: PropTypes.number.isRequired,
  cameraMoveSpeed: PropTypes.number.isRequired,
  selectedItem: PropTypes.string.isRequired,
};

export default EditorCanvas;
