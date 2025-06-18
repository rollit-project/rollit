import { useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import EditorActionControls from '@/components/ui/editor/EditorActionControls';
import EditorCategorySelector from '@/components/ui/editor/EditorCategorySelector';
import PanelItems from '@/components/ui/editor/PanelItems';
import { PRESETS } from '@/constants/rail/presets';
import { useAutoHorizontalScroll } from '@/hooks/useAutoHorizontalScroll';
import { useAudioStore } from '@/store/useAudioStore';
import { useItemStore } from '@/store/useItemStore';
import { useRailStore } from '@/store/useRailStore';
import { loadPreset } from '@/utils/loadPreset';
import { getImageListByType } from '@/utils/sceneAssetUtils';

const EditorPanel = () => {
  const [activePanelType, setActivePanelType] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const setSelectedItem = useItemStore((state) => state.setSelectedItem);
  const setSelectedRail = useRailStore((state) => state.setSelectedRail);
  const { scrollRef, handleMouseMove, handleMouseLeave } = useAutoHorizontalScroll();
  const playSfx = useAudioStore((state) => state.playSfx);

  const handlePanelToggle = (buttonType) => {
    setIsPanelOpen(activePanelType !== buttonType);
    setActivePanelType(activePanelType !== buttonType ? buttonType : '');
  };

  const handlePresetClick = (name) => {
    const jsonPath = PRESETS.find((preset) => preset.name === name)?.json;

    if (jsonPath) {
      loadPreset(jsonPath);
    } else {
      toast.error('프리셋 경로를 찾지 못했습니다.');
    }
  };

  const handlePanelItemClick = (name) => {
    switch (activePanelType) {
      case 'preset':
        handlePresetClick(name);
        break;
      case 'rail':
        setSelectedRail({ name, id: uuidv4() });
        playSfx('/sounds/install.mp3');
        break;
      case 'item':
        setSelectedItem(name);
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-0 z-50 w-full transition-transform duration-500">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <EditorCategorySelector
            activePanelType={activePanelType}
            onButtonClick={handlePanelToggle}
          />
          <EditorActionControls />
        </div>
        <div
          className={`w-full overflow-hidden bg-[rgba(0,0,0,0.3)] transition-all duration-500 ${
            isPanelOpen ? 'h-[150px] pt-5' : 'h-0'
          } flex justify-start`}
        >
          <PanelItems
            ref={scrollRef}
            imageList={getImageListByType(activePanelType)}
            onClick={handlePanelItemClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
