import { GROUND_COLLISION_THRESHOLD } from '@/constants/collision';

export const isGroundCollision = (candidateRail, threshold = GROUND_COLLISION_THRESHOLD) => {
  const lowestPointY = Math.min(...candidateRail.points.map((p) => p.y));

  return lowestPointY < -threshold;
};
