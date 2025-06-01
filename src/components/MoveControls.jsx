import { useThree } from '@react-three/fiber';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import * as THREE from 'three';

const MoveControls = ({ moveSpeed, orbitControlsRef }) => {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const direction = new THREE.Vector3();

      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

      forward.y = 0;
      right.y = 0;

      forward.normalize();
      right.normalize();

      switch (e.code) {
        case 'KeyW':
          direction.add(forward);
          break;
        case 'KeyS':
          direction.sub(forward);
          break;
        case 'KeyA':
          direction.sub(right);
          break;
        case 'KeyD':
          direction.add(right);
          break;
        default:
          return;
      }

      direction.normalize().multiplyScalar(moveSpeed);
      camera.position.add(direction);
      orbitControlsRef.current.target.add(direction);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveSpeed]);

  return null;
};

MoveControls.propTypes = {
  moveSpeed: PropTypes.number,
  orbitControlsRef: PropTypes.shape.isRequired,
};
export default MoveControls;
