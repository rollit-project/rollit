export const checkGroundCollision = (candidateRail, threshold = 0.05) => {
  const minY = Math.min(...candidateRail.points.map((p) => p.y));

  return minY < -threshold;
};
