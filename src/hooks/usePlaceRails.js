import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { POINT_TEMPLATES } from '@/constants/rail/pointTemplates';
import { ROTATION_MAP } from '@/constants/rail/rotationMap';
import { useRailStore } from '@/store/useRailStore';
import { isGroundCollision } from '@/utils/isGroundCollision';
import { getWorldRailPoints } from '@/utils/rail/getWorldRailPoints';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

export const usePlaceRails = (initialRails = []) => {
  const selectedRail = useRailStore((state) => state.selectedRail);
  const placedRails = useRailStore((state) => state.placedRails);
  const setPlacedRails = useRailStore((state) => state.setPlacedRails);

  useEffect(() => {
    setPlacedRails(initialRails);
  }, []);

  useEffect(() => {
    if (!selectedRail) {
      return;
    }

    const lastPlacedRail = placedRails.at(-1);
    const startPosition = lastPlacedRail.endPoint;
    const previousYRotation = lastPlacedRail.accumulatedYRotation;

    const railPoints = POINT_TEMPLATES[selectedRail.name];
    const currentRailYRotation = ROTATION_MAP[selectedRail.name] ?? 0;
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

    const isCollidingWithGround = isGroundCollision(newRail);

    if (isCollidingWithGround) {
      toast.error('레일 설치 실패: 지형과 충돌했습니다');

      return;
    }

    setPlacedRails([...placedRails, newRail]);
  }, [selectedRail]);

  return placedRails;
};
