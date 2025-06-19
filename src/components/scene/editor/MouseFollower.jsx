import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { v4 as uuidv4 } from 'uuid';

import ItemModel from '@/components/scene/common/ItemModel';
import { useItemStore } from '@/store/useItemStore';
import { useRailStore } from '@/store/useRailStore';
import { isObjectCollidingWithSceneObjects } from '@/utils/isObjectCollidingWithSceneObjects';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

const MouseFollower = () => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const [previewPosition, setPreviewPosition] = useState(new THREE.Vector3());
  const [rotationY, setRotationY] = useState(0);

  const selectedItem = useItemStore((state) => state.selectedItem);
  const setSelectedItem = useItemStore((state) => state.setSelectedItem);
  const placedItems = useItemStore((state) => state.placedItems);
  const setPlacedItems = useItemStore((state) => state.setPlacedItems);
  const placedRails = useRailStore((state) => state.placedRails);

  const computeIntersectPosition = useCallback(
    (event) => {
      const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);
      const intersect = new THREE.Vector3();

      raycaster.current.ray.intersectPlane(planeRef.current, intersect);

      return intersect;
    },
    [camera],
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyQ') {
        setRotationY((prev) => prev - Math.PI / 6);
      } else if (event.code === 'KeyE') {
        setRotationY((prev) => prev + Math.PI / 6);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const intersect = computeIntersectPosition(event);

      if (intersect) {
        setPreviewPosition(intersect.clone());
      }
    };

    const handlePointerDown = async (event) => {
      const intersect = computeIntersectPosition(event);

      if (!intersect || !selectedItem) {
        return;
      }

      try {
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync(getModelPathByName(selectedItem));
        const mesh = gltf.scene.clone();

        mesh.position.copy(intersect);
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
            position: intersect.clone(),
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

    const dom = gl.domElement;

    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerdown', handlePointerDown);

    return () => {
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [
    gl,
    selectedItem,
    rotationY,
    placedItems,
    setPlacedItems,
    placedRails,
    computeIntersectPosition,
    setSelectedItem,
  ]);

  if (!selectedItem) {
    return null;
  }

  return (
    <ItemModel
      selectedItem={selectedItem}
      position={previewPosition}
      rotation={[0, rotationY, 0]}
    />
  );
};

export default MouseFollower;
