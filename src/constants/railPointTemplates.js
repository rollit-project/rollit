import * as THREE from 'three';

export const RAIL_POINT_TEMPLATES = {
  straight: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -6)],
  up: [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.6, -2),
    new THREE.Vector3(0, 3, -4.8),
    new THREE.Vector3(0, 3.4, -6),
  ],
  down: [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -0.6, -2),
    new THREE.Vector3(0, -3, -4.8),
    new THREE.Vector3(0, -3.4, -6),
  ],
  curveLeft: [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.5, 0, -2),
    new THREE.Vector3(-0.8, 0, -3),
    new THREE.Vector3(-2, 0, -5),
    new THREE.Vector3(-4, 0, -6),
    new THREE.Vector3(-6.6, 0, -6.6),
  ],
  curveRight: [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.5, 0, -2),
    new THREE.Vector3(0.8, 0, -3),
    new THREE.Vector3(2, 0, -5),
    new THREE.Vector3(4, 0, -6),
    new THREE.Vector3(6.6, 0, -6.6),
  ],
};
