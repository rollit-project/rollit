import { useEffect, useState } from 'react';

import { RAIL_POINT_TEMPLATES } from '@/constants/railPointTemplates';
import { RAIL_ROTATION_MAP } from '@/constants/railRotationMap';
import { getWorldRailPoints } from '@/utils/getWorldRailPoints';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

export const usePlaceRails = (selectedRail, initialRails = []) => {
  const [placedRails, setPlacedRails] = useState(initialRails);

  useEffect(() => {
    if (!selectedRail) {
      return;
    }

    const lastPlacedRail = placedRails.at(-1);
    const startPosition = lastPlacedRail.endPoint;
    const previousYRotation = lastPlacedRail.accumulatedYRotation;

    const railPoints = RAIL_POINT_TEMPLATES[selectedRail.name];
    const currentRailYRotation = RAIL_ROTATION_MAP[selectedRail.name] ?? 0;
    const accumulatedYRotation = previousYRotation + currentRailYRotation;
    const worldPoints = getWorldRailPoints(railPoints, startPosition, [0, previousYRotation, 0]);
    const endPosition = worldPoints.at(-1);

    const newRail = {
      id: selectedRail.id,
      modelPath: getModelPathByName(selectedRail.name),
      position: startPosition,
      rotation: [0, previousYRotation, 0],
      points: worldPoints,
      endPoint: endPosition,
      accumulatedYRotation,
    };

    setPlacedRails((prev) => [...prev, newRail]);
  }, [selectedRail]);

  return placedRails;
};
