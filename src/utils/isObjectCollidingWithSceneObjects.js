import toast from 'react-hot-toast';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const isObjectCollidingWithSceneObjects = async ({
  targetObject,
  sceneObjects,
  getModelPath,
  getPosition,
  getRotation,
}) => {
  const modelLoader = new GLTFLoader();
  const targetBox = new THREE.Box3().setFromObject(targetObject);

  const results = await Promise.all(
    sceneObjects.map(async (obj) => {
      try {
        const modelPath = getModelPath(obj);
        const gltf = await modelLoader.loadAsync(modelPath);
        const sceneObj = gltf.scene.clone();

        sceneObj.position.set(...getPosition(obj));
        if (getRotation) {
          sceneObj.rotation.set(...getRotation(obj));
        }

        const objBox = new THREE.Box3().setFromObject(sceneObj);

        return targetBox.intersectsBox(objBox);
      } catch (error) {
        toast.error('설치할 수 없습니다.');

        return true;
      }
    }),
  );

  return results.some(Boolean);
};
