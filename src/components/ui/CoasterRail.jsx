import PropTypes from 'prop-types';
import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial({
  color: '#888888',
  metalness: 0.6,
  roughness: 0.4,
});

const CoasterRail = ({ segmentCount = 5, segmentGap = 1.5, origin = [0, 0, 0] }) => {
  const railRadius = 0.2;
  const railSpacing = 3;
  const sleeperWidth = railSpacing;
  const sleeperThickness = 0.3;
  const sleeperHeight = 0.1;

  const segments = Array.from({ length: segmentCount }, (_, index) => {
    const segmentOffsetZ = index * segmentGap;

    return (
      <group key={index} position={[0, 0, segmentOffsetZ]}>
        <mesh
          position={[-railSpacing / 2, 0, 0]}
          material={material}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[railRadius, railRadius, segmentGap, 16]} />
        </mesh>

        <mesh position={[railSpacing / 2, 0, 0]} material={material} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[railRadius, railRadius, segmentGap, 16]} />
        </mesh>

        <mesh position={[0, 0, 0]} material={material}>
          <boxGeometry args={[sleeperWidth, sleeperHeight, sleeperThickness]} />
        </mesh>
      </group>
    );
  });

  return <group position={origin}>{segments}</group>;
};

CoasterRail.propTypes = {
  segmentCount: PropTypes.number,
  segmentGap: PropTypes.number,
  origin: PropTypes.arrayOf(PropTypes.number),
};

export default CoasterRail;
