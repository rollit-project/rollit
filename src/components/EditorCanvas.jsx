import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import DirectionalLight from '@/components/DirectionalLight';
import Ground from '@/components/Ground';
import MoveControls from '@/components/MoveControls';

const EditorCanvas = ({ cameraRotationSpeed, cameraMoveSpeed }) => {
  const orbitControlsRef = useRef();

  return (
    <Canvas shadows camera={{ position: [0, 0, 2], fov: 75 }}>
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
    </Canvas>
  );
};

EditorCanvas.propTypes = {
  cameraRotationSpeed: PropTypes.number.isRequired,
  cameraMoveSpeed: PropTypes.number.isRequired,
};

export default EditorCanvas;
