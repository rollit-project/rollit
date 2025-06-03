import PropTypes from 'prop-types';
import * as THREE from 'three';

const CoasterPillar = ({ positionX = 0, pillarHeight = 5 }) => {
  const centerY = pillarHeight / 2;

  const material = new THREE.MeshStandardMaterial({
    color: '#888888',
    metalness: 0.6,
    roughness: 0.4,
  });

  return (
    <group position={[positionX, 0, 0]}>
      <mesh position={[0, centerY, 0]} material={material} castShadow>
        <cylinderGeometry args={[0.2, 0.2, pillarHeight, 16]} />
      </mesh>

      <mesh position={[0, pillarHeight, 0]} material={material} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
      </mesh>
    </group>
  );
};

CoasterPillar.propTypes = {
  positionX: PropTypes.number,
  pillarHeight: PropTypes.number,
};

export default CoasterPillar;
