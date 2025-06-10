import { Line, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import DirectionalLight from '@/components/scene/DirectionalLight';
import Ground from '@/components/scene/Ground';
import ItemModel from '@/components/scene/ItemModel';
import MouseFollower from '@/components/scene/MouseFollower';
import MoveControls from '@/components/scene/MoveControls';
import RailRenderer from '@/components/scene/RailRenderer';
import { useSceneStore } from '@/store/useSceneStore';

const EditorCanvas = ({ cameraRotationSpeed, cameraMoveSpeed }) => {
  const orbitControlsRef = useRef();
  const { scene: coaster } = useGLTF('/objects/coaster.glb');
  const placedItems = useSceneStore((state) => state.placedItems);
  const coasterPath = useSceneStore((state) => state.coasterPath);

  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
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
      {placedItems.map((item) => (
        <ItemModel
          key={item.id}
          selectedItem={item.name}
          position={item.position}
          rotation={[0, item.rotationY, 0]}
        />
      ))}
      <RailRenderer />
      <primitive object={coaster.clone()} position={[0, 0, 0]} />
      <Ground />
      <gridHelper args={[10, 10, 'red', 'white']} position={[0, -0.5, 0]} />
      {coasterPath && <Line points={coasterPath.getPoints(100)} color="yellow" lineWidth={2} />}
    </Canvas>
  );
};

EditorCanvas.propTypes = {
  cameraRotationSpeed: PropTypes.number.isRequired,
  cameraMoveSpeed: PropTypes.number.isRequired,
};

export default EditorCanvas;
