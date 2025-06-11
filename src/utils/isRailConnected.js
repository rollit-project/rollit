import * as THREE from 'three';

import { useSceneStore } from '@/store/useSceneStore';

export const isRailConnected = () => {
  const { placedRails } = useSceneStore.getState();

  if (placedRails.length < 2) {
    return false;
  }

  const start = new THREE.Vector3(...placedRails[0].position);
  const end = new THREE.Vector3(...placedRails.at(-1).endPoint);

  return start.distanceTo(end) < 0.01;
};
