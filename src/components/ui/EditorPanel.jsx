import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import EditorActionControls from '@/components/ui/EditorActionControls';
import EditorCategorySelector from '@/components/ui/EditorCategorySelector';
import PanelItems from '@/components/ui/PanelItems';
import { useSceneStore } from '@/store/useSceneStore';
import { getImageListByType } from '@/utils/sceneAssetUtils';

const EditorPanel = () => {
  const [activePanelType, setActivePanelType] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const setSelectedItem = useSceneStore((state) => state.setSelectedItem);
  const setSelectedRail = useSceneStore((state) => state.setSelectedRail);

  const handlePanelToggle = (buttonType) => {
    setIsPanelOpen(activePanelType !== buttonType);
    setActivePanelType(activePanelType !== buttonType ? buttonType : '');
  };

  const handlePanelItemClick = (name) => {
    if (activePanelType === 'rail') {
      setSelectedRail({ name, id: uuidv4() });
    } else {
      setSelectedItem(name);
    }
  };

  return (
    <div className="fixed bottom-0 flex w-full flex-col items-center transition-all duration-500">
      <div
        className={`flex w-full items-center justify-between transition-transform duration-500${
          isPanelOpen ? 'translate-y-[-200px]' : 'translate-y-0'
        }`}
      >
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
          imageList={getImageListByType(activePanelType)}
          onClick={handlePanelItemClick}
        />
      </div>
    </div>
  );
};

export default EditorPanel;
