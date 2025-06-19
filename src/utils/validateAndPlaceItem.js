import toast from 'react-hot-toast';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { v4 as uuidv4 } from 'uuid';

import { isObjectCollidingWithSceneObjects } from '@/utils/isObjectCollidingWithSceneObjects';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

export const validateAndPlaceItem = async ({
  selectedItem,
  position,
  rotationY,
  placedItems,
  placedRails,
  setPlacedItems,
  setSelectedItem,
  setRotationY,
}) => {
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(getModelPathByName(selectedItem));
    const mesh = gltf.scene.clone();

    mesh.position.copy(position);
    mesh.rotation.set(0, rotationY, 0);

    const isItemCollision = await isObjectCollidingWithSceneObjects({
      targetObject: mesh,
      sceneObjects: placedItems,
      getModelPath: (item) => getModelPathByName(item.name),
      getPosition: (item) => item.position,
      getRotation: (item) => [0, item.rotationY || 0, 0],
    });

    const isRailCollision = await isObjectCollidingWithSceneObjects({
      targetObject: mesh,
      sceneObjects: placedRails,
      getModelPath: (rail) => rail.modelPath,
      getPosition: (rail) => rail.position,
      getRotation: (rail) => rail.rotation || [0, 0, 0],
    });

    if (isItemCollision || isRailCollision) {
      toast.error('충돌로 인해 설치할 수 없습니다.');

      return;
    }

    setPlacedItems([
      ...placedItems,
      {
        name: selectedItem,
        position: position.clone(),
        id: uuidv4(),
        rotationY,
      },
    ]);
    setSelectedItem(null);
    setRotationY(0);
  } catch (err) {
    console.error('❌ 모델 로딩 실패:', err);
    toast.error('모델 로딩 실패로 설치할 수 없습니다.');
  }
};
