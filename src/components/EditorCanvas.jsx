import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const EditorCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <OrbitControls
        mouseButtons={{
          LEFT: null,
          MIDDLE: 0,
          RIGHT: 2,
        }}
      />
    </Canvas>
  );
};

export default EditorCanvas;
