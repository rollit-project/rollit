import * as THREE from 'three';

export const isRailConnectedToLastRail = (newRail, lastRail, threshold = 0.01) => {
  const lastEnd = new THREE.Vector3(...lastRail.endPoint.toArray());
  const newStart = new THREE.Vector3(...newRail.position.toArray());
  const distance = lastEnd.distanceTo(newStart);

  const lastPoints = lastRail.points;
  const newPoints = newRail.points;

  const lastDir = new THREE.Vector3().subVectors(lastPoints.at(-1), lastPoints.at(-2)).normalize();

  const newDir = new THREE.Vector3().subVectors(newPoints.at(-1), newPoints.at(-2)).normalize();

  const angleDiff = lastDir.angleTo(newDir);
  const directionThreshold = 0.3;

  return distance < threshold && angleDiff < directionThreshold;
};
