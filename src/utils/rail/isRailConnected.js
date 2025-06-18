import * as THREE from 'three';

import { useRailStore } from '@/store/useRailStore';

export const isRailConnected = () => {
  const { placedRails } = useRailStore.getState();

  if (placedRails.length < 2) {
    return false;
  }

  const start = new THREE.Vector3(...placedRails[0].position);
  const end = new THREE.Vector3(...placedRails.at(-1).endPoint);

  const MIN_CONNECTION_GAP_Z = 0.5;
  const MAX_CONNECTION_GAP_Z = 6;

  const zGap = start.z - end.z;

  const isConnected = zGap >= -MIN_CONNECTION_GAP_Z && zGap <= MAX_CONNECTION_GAP_Z;

  return isConnected;
};
