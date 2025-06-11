import * as THREE from 'three';

const getDistanceFromPointToSegment = (point, segmentStart, segmentEnd) => {
  const segmentDirection = new THREE.Vector3().subVectors(segmentEnd, segmentStart);
  const pointDirection = new THREE.Vector3().subVectors(point, segmentStart);
  const projectionRatio = Math.max(
    0,
    Math.min(1, pointDirection.dot(segmentDirection) / segmentDirection.lengthSq()),
  );

  return point.distanceTo(segmentDirection.multiplyScalar(projectionRatio).add(segmentStart));
};

const doesSegmentIntersect = (
  candidateSegmentStart,
  candidateSegmentEnd,
  existingPoints,
  threshold,
) =>
  existingPoints.some((existingPoint) => {
    const distance = getDistanceFromPointToSegment(
      existingPoint,
      candidateSegmentStart,
      candidateSegmentEnd,
    );

    return distance < threshold;
  });

const doesRailCollide = (candidatePoints, existingPoints, threshold) =>
  candidatePoints.slice(0, -1).some((start, i) => {
    const end = candidatePoints[i + 1];

    return doesSegmentIntersect(start, end, existingPoints, threshold);
  });

export const isRailCollision = (candidateRail, placedRails, threshold = 0.3) => {
  if (placedRails.length === 0) {
    return false;
  }

  const isClosingLoop =
    candidateRail.endPoint.distanceTo(new THREE.Vector3(...placedRails[0].position)) < 0.05;

  const railsToCheck = placedRails
    .slice(0, -1)
    .filter((rail) => !rail.isInitial && (!isClosingLoop || rail !== placedRails[0]));

  return railsToCheck.some((rail) => doesRailCollide(candidateRail.points, rail.points, threshold));
};
