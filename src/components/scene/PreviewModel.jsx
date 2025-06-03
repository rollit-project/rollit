import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';

import { getModelPathByName } from '@/utils/sceneAssetUtils';

const PreviewModel = ({ selectedItem, position = [0, 0, 0] }) => {
  const modelPath = getModelPathByName(selectedItem);

  const { scene } = useGLTF(modelPath);

  return <primitive object={scene} position={position} scale={0.5} />;
};

PreviewModel.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  position: PropTypes.instanceOf(Vector3),
};

export default PreviewModel;
