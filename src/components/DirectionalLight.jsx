import { useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';

const DirectionalLight = () => {
  const lightRef = useRef();

  useHelper(lightRef, DirectionalLightHelper, 1, 'red');

  return <directionalLight ref={lightRef} position={[3, 5, 5]} castShadow intensity={1} />;
};

export default DirectionalLight;
