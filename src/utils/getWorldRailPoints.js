import * as THREE from 'three';

export function getWorldRailPoints(railPoints, position, rotation) {
  const worldPosition = position.clone();
  const worldRotation = new THREE.Euler(...rotation);

  return railPoints.map((point) => {
    const rotatedPoint = point.clone().applyEuler(worldRotation);
    const worldPoint = rotatedPoint.add(worldPosition);

    return worldPoint;
  });
}
