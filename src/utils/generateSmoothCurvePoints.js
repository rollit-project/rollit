export const generateSmoothCurvePoints = (placedRails) => {
  if (!placedRails || placedRails.length === 0) {
    return [];
  }

  const smoothPoints = [];

  for (let i = 0; i < placedRails.length; i += 1) {
    const currentPoints = placedRails[i].points;

    if (i === 0) {
      smoothPoints.push(...currentPoints);
    } else {
      smoothPoints.push(...currentPoints.slice(1));
    }
  }

  return smoothPoints;
};
