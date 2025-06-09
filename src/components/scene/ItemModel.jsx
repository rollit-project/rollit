import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Vector3 } from 'three';

import { getModelPathByName } from '@/utils/sceneAssetUtils';

const ItemModel = ({ selectedItem, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const modelPath = getModelPathByName(selectedItem);

  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={clonedScene} position={position} scale={0.5} rotation={rotation} />;
};

ItemModel.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  position: PropTypes.instanceOf(Vector3),
  rotation: PropTypes.arrayOf(PropTypes.number),
};

export default ItemModel;
