import { useGLTF } from '@react-three/drei';

const Ground = () => {
  const { scene } = useGLTF('/objects/tree.glb');

  const treePositions = [
    [30, -0.5, -30],
    [-30, -0.5, -30],
    [-30, -0.5, 30],
    [30, -0.5, 30],
  ];

  return (
    <group>
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[100, 1, 100]} />
        <meshStandardMaterial color="#b4e07b" />
      </mesh>

      {treePositions.map((position) => (
        <primitive
          key={position.join('-')}
          object={scene.clone()}
          position={position}
          scale={[0.02, 0.02, 0.02]}
        />
      ))}
    </group>
  );
};

export default Ground;
