import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Vector3 } from 'three';

const Rail = ({ path, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(path);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <>
      <primitive object={clonedScene} position={position} rotation={rotation} />
    </>
  );
};

Rail.propTypes = {
  path: PropTypes.string.isRequired,
  position: PropTypes.instanceOf(Vector3),
  rotation: PropTypes.arrayOf(PropTypes.number),
};

export default Rail;
