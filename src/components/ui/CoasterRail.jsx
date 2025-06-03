import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial({
  color: '#888888',
  metalness: 0.6,
  roughness: 0.4,
});

const CoasterRail = () => {
  const railRadius = 0.2;
  const railSpacing = 3;
  const sleeperWidth = 3;
  const sleeperThickness = 0.3;
  const sleeperHeight = 0.1;

  return (
    <group>
      <mesh position={[-railSpacing / 2, 0, 0]} material={material} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[railRadius, railRadius, 1.5, 16]} />
      </mesh>

      <mesh position={[railSpacing / 2, 0, 0]} material={material} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[railRadius, railRadius, 1.5, 16]} />
      </mesh>

      <mesh position={[0, 0, 0]} material={material}>
        <boxGeometry args={[sleeperWidth, sleeperHeight, sleeperThickness]} />
      </mesh>
    </group>
  );
};

export default CoasterRail;
