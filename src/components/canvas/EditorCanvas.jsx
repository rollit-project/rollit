import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import DirectionalLight from '@/components/scene/common/DirectionalLight';
import Ground from '@/components/scene/common/Ground';
import ItemRenderer from '@/components/scene/common/ItemRenderer';
import RailRenderer from '@/components/scene/common/RailRenderer';
import MouseFollower from '@/components/scene/editor/MouseFollower';
import MoveControls from '@/components/scene/editor/MoveControls';

const EditorCanvas = ({ cameraRotationSpeed, cameraMoveSpeed }) => {
  const orbitControlsRef = useRef();
  const gltf = useGLTF('/objects/coaster/entrance.glb');

  if (!gltf?.scene) {
    return null;
  }

  const { scene: coasterEntrance } = gltf;

  return (
    <Canvas shadows camera={{ position: [20, 10, 25], fov: 75 }}>
      <color attach="background" args={['#b0eaff']} />
      <MouseFollower />
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
      <ItemRenderer />
      <RailRenderer />
      <primitive object={coasterEntrance} position={[0, 0, 0]} />
      <Ground />
    </Canvas>
  );
};

EditorCanvas.propTypes = {
  cameraRotationSpeed: PropTypes.number.isRequired,
  cameraMoveSpeed: PropTypes.number.isRequired,
};

export default EditorCanvas;
