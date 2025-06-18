import * as THREE from 'three';

export const getRotationFromDirection = (direction) => {
  const up = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(up, direction).normalize();
  const adjustedUp = new THREE.Vector3().crossVectors(direction, right).normalize();

  const rotationMatrix = new THREE.Matrix4().makeBasis(right, adjustedUp, direction);
  const rotationQuaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);

  return { rotationQuaternion, adjustedUp };
};
