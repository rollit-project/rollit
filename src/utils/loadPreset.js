import toast from 'react-hot-toast';
import * as THREE from 'three';

import { useSceneStore } from '@/store/useSceneStore';

const toVector3 = (v) =>
  Array.isArray(v) ? new THREE.Vector3(...v) : new THREE.Vector3(v.x, v.y, v.z);

export const loadPreset = async (path) => {
  try {
    const fileResponse = await fetch(path);
    const presetData = await fileResponse.json();

    const safeParsed = presetData.map((rail) => ({
      ...rail,
      position: toVector3(rail.position),
      endPoint: toVector3(rail.endPoint),
      points: rail.points?.map(toVector3),
    }));

    useSceneStore.getState().setPlacedRails(safeParsed);
  } catch (err) {
    toast.error('프리셋 로드 실패: 프리셋을 불러오는 데 실패했습니다.');
  }
};
