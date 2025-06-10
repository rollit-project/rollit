import * as THREE from 'three';

import { RAIL_POINT_TEMPLATES } from '@/constants/railPointTemplates';
import { getWorldRailPoints } from '@/utils/getWorldRailPoints';
import { getModelPathByName } from '@/utils/sceneAssetUtils';

export const INITIAL_RAILS = [
  {
    id: 'init-1',
    modelPath: getModelPathByName('straight'),
    position: new THREE.Vector3(0, 0, 12),
    rotation: [0, 0, 0],
    points: getWorldRailPoints(
      RAIL_POINT_TEMPLATES.straight,
      new THREE.Vector3(0, 0, 12),
      [0, 0, 0],
    ),
    endPoint: new THREE.Vector3(0, 0, 6),
    accumulatedYRotation: 0,
  },
  {
    id: 'init-2',
    modelPath: getModelPathByName('straight'),
    position: new THREE.Vector3(0, 0, 6),
    rotation: [0, 0, 0],
    points: getWorldRailPoints(
      RAIL_POINT_TEMPLATES.straight,
      new THREE.Vector3(0, 0, 6),
      [0, 0, 0],
    ),
    endPoint: new THREE.Vector3(0, 0, 0),
    accumulatedYRotation: 0,
  },
  {
    id: 'init-3',
    modelPath: getModelPathByName('straight'),
    position: new THREE.Vector3(0, 0, 0),
    rotation: [0, 0, 0],
    points: getWorldRailPoints(
      RAIL_POINT_TEMPLATES.straight,
      new THREE.Vector3(0, 0, 0),
      [0, 0, 0],
    ),
    endPoint: new THREE.Vector3(0, 0, -6),
    accumulatedYRotation: 0,
  },
];
