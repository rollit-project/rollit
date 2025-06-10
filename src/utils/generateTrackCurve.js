import * as THREE from 'three';

export const generateTrackCurve = (trackPoints) => {
  return new THREE.CatmullRomCurve3(trackPoints);
};
