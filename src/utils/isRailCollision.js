import * as THREE from 'three';

const getDistanceFromPointToSegment = (point, segmentStart, segmentEnd) => {
  const segmentDirection = new THREE.Vector3().subVectors(segmentEnd, segmentStart);
  const pointDirection = new THREE.Vector3().subVectors(point, segmentStart);

  const projectionRatio = Math.max(
    0,
    Math.min(1, pointDirection.dot(segmentDirection) / segmentDirection.lengthSq()),
  );

  const closestPoint = new THREE.Vector3()
    .copy(segmentDirection)
    .multiplyScalar(projectionRatio)
    .add(segmentStart);

  return point.distanceTo(closestPoint);
};

export const isRailCollision = (candidateRail, placedRails, threshold = 0.3) => {
  const railsToCheck = placedRails.slice(0, -1).filter((rail) => !rail.isInitial);

  return railsToCheck.some((existingRail) => {
    const existingPoints = existingRail.points;
    const candidatePoints = candidateRail.points;

    return candidatePoints.slice(0, -1).some((start, i) => {
      const end = candidatePoints[i + 1];

      return existingPoints.some((point) => {
        const distance = getDistanceFromPointToSegment(point, start, end);

        return distance < threshold;
      });
    });
  });
};
