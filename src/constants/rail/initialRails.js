import * as THREE from 'three';

import { POINT_TEMPLATES } from '@/constants/rail/pointTemplates';
import { getWorldRailPoints } from '@/utils/rail/getWorldRailPoints';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

export const INITIAL_RAILS = [
  {
    id: 'init-1',
    modelPath: getModelPathByName('straight'),
    position: new THREE.Vector3(0, 0, 12),
    rotation: [0, 0, 0],
    points: getWorldRailPoints(POINT_TEMPLATES.straight, new THREE.Vector3(0, 0, 12), [0, 0, 0]),
    endPoint: new THREE.Vector3(0, 0, 6),
    accumulatedYRotation: 0,
  },
  {
    id: 'init-2',
    modelPath: getModelPathByName('straight'),
    position: new THREE.Vector3(0, 0, 6),
    rotation: [0, 0, 0],
    points: getWorldRailPoints(POINT_TEMPLATES.straight, new THREE.Vector3(0, 0, 6), [0, 0, 0]),
    endPoint: new THREE.Vector3(0, 0, 0),
    accumulatedYRotation: 0,
  },
  {
    id: 'init-3',
    modelPath: getModelPathByName('straight'),
    position: new THREE.Vector3(0, 0, 0),
    rotation: [0, 0, 0],
    points: getWorldRailPoints(POINT_TEMPLATES.straight, new THREE.Vector3(0, 0, 0), [0, 0, 0]),
    endPoint: new THREE.Vector3(0, 0, -6),
    accumulatedYRotation: 0,
  },
];
