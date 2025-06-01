import PropTypes from 'prop-types';
import { useState } from 'react';

import EditorActionControls from '@/components/EditorActionControls';
import EditorCategorySelector from '@/components/EditorCategorySelector';
import PanelItems from '@/components/PanelItems';
import { imageList } from '@/utils/imageMapping';

const EditorPanel = () => {
  const [activePanelType, setActivePanelType] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const handlePanelToggle = (buttonType) => {
    setIsPanelOpen(activePanelType !== buttonType);
    setActivePanelType(activePanelType !== buttonType ? buttonType : '');
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
        <PanelItems imageList={imageList(activePanelType)} />
      </div>
    </div>
  );
};

EditorCategorySelector.propTypes = {
  activePanelType: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

PanelItems.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EditorPanel;
