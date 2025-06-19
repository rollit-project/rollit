import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { v4 as uuidv4 } from 'uuid';

import { POINT_TEMPLATES } from '@/constants/rail/pointTemplates';
import { ROTATION_MAP } from '@/constants/rail/rotationMap';
import { useItemStore } from '@/store/useItemStore';
import { useRailStore } from '@/store/useRailStore';
import { isGroundCollision } from '@/utils/isGroundCollision';
import { isObjectCollidingWithSceneObjects } from '@/utils/isObjectCollidingWithSceneObjects';
import { getWorldRailPoints } from '@/utils/rail/getWorldRailPoints';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

export const usePlaceRails = (initialRails = []) => {
  const selectedRail = useRailStore((state) => state.selectedRail);
  const placedRails = useRailStore((state) => state.placedRails);
  const setPlacedRails = useRailStore((state) => state.setPlacedRails);
  const placedItems = useItemStore((state) => state.placedItems);

  useEffect(() => {
    setPlacedRails(initialRails);
  }, [initialRails]);

  useEffect(() => {
    if (!selectedRail) {
      return;
    }

    const placeRail = async () => {
      const lastPlacedRail = placedRails.at(-1);
      const startPosition = lastPlacedRail.endPoint;
      const previousYRotation = lastPlacedRail.accumulatedYRotation;

      const railPoints = POINT_TEMPLATES[selectedRail.name];
      const currentRailYRotation = ROTATION_MAP[selectedRail.name] ?? 0;
      const accumulatedYRotation = previousYRotation + currentRailYRotation;
      const worldPoints = getWorldRailPoints(railPoints, startPosition, [0, previousYRotation, 0]);
      const endPosition = worldPoints.at(-1);

      const newRail = {
        id: uuidv4(),
        modelPath: getModelPathByName(selectedRail.name),
        position: startPosition,
        rotation: [0, previousYRotation, 0],
        points: worldPoints,
        endPoint: endPosition,
        accumulatedYRotation,
      };

      if (isGroundCollision(newRail)) {
        toast.error('레일 설치 실패: 지형과 충돌했습니다');

        return;
      }

      try {
        const modelLoader = new GLTFLoader();

        const hasItemCollision = await newRail.points.reduce(async (prevPromise, point) => {
          const isCollisionFound = await prevPromise;

          if (isCollisionFound) {
            return true;
          }

          const gltf = await modelLoader.loadAsync(newRail.modelPath);
          const mesh = gltf.scene.clone();

          mesh.position.set(...point);
          mesh.rotation.set(...newRail.rotation);

          const isItemCollision = await isObjectCollidingWithSceneObjects({
            targetObject: mesh,
            sceneObjects: placedItems,
            getModelPath: (item) => getModelPathByName(item.name),
            getPosition: (item) => item.position,
            getRotation: (item) => [0, item.rotationY || 0, 0],
          });

          return isItemCollision;
        }, Promise.resolve(false));

        if (hasItemCollision) {
          toast.error('레일 설치 실패: 아이템과 충돌했습니다');

          return;
        }

        setPlacedRails([...placedRails, newRail]);
      } catch (err) {
        toast.error('레일 설치 실패: 모델 로딩 오류');
      }
    };

    placeRail();
  }, [selectedRail]);

  return placedRails;
};
