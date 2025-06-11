import * as THREE from 'three';

export const generateRailCurve = (trackPoints) => {
  return new THREE.CatmullRomCurve3(trackPoints);
};
