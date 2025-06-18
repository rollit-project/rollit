import { PRESETS } from '@/constants/rail/presets';
import { SCENE_ASSET_LIST } from '@/constants/sceneAssetList';

export const getImageListByType = (type) => {
  if (type === 'preset') {
    return PRESETS;
  }

  return SCENE_ASSET_LIST.filter((item) => item.type === type);
};

export const getModelPathByName = (name) =>
  SCENE_ASSET_LIST.find((item) => item.name === name)?.model;
