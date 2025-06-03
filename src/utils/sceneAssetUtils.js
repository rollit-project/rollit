import { SCENE_ASSET_LIST } from '@/constants/sceneAssetList';

export const getImageListByType = (type) => SCENE_ASSET_LIST.filter((item) => item.type === type);

export const getModelPathByName = (name) =>
  SCENE_ASSET_LIST.find((item) => item.name === name)?.model;
