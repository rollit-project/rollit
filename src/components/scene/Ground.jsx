import { useGLTF } from '@react-three/drei';

const Ground = () => {
  const { scene } = useGLTF('/objects/tree.glb');

  return (
    <group>
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[100, 1, 100]} />
        <meshStandardMaterial color="#b4e07b" />
      </mesh>
      <primitive object={scene} position={[0, -0.5, 0]} scale={[0.15, 0.15, 0.15]} />
    </group>
  );
};

export default Ground;
