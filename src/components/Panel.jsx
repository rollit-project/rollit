import PropTypes from 'prop-types';
import { useState } from 'react';

import PanelList from '@/components/PanelList';
import { imageList } from '@/utils/imageMapping';

import PanelActionButton from './PanelActionButton';
import PanelButton from './PanelButton';

const Panel = () => {
  const [trackMode, setTrackMode] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const handlePanelToggle = (buttonType) => {
    if (trackMode !== buttonType) {
      setTrackMode(buttonType);
      setIsPanelOpen(true);
    } else {
      setIsPanelOpen(false);
      setTrackMode('');
    }
  };

  return (
    <div className="fixed bottom-0 flex w-full flex-col items-center transition-all duration-500">
      <div
        className={`flex w-full items-center justify-between transition-transform duration-500${
          isPanelOpen ? 'translate-y-[-200px]' : 'translate-y-0'
        }`}
      >
        <PanelButton trackMode={trackMode} onButtonClick={handlePanelToggle} />
        <PanelActionButton />
      </div>
      <div
        className={`w-full overflow-hidden bg-[rgba(0,0,0,0.3)] transition-all duration-500 ${
          isPanelOpen ? 'h-[150px] pt-5' : 'h-0'
        } flex justify-start`}
      >
        <PanelList imageList={imageList(trackMode)} />
      </div>
    </div>
  );
};

PanelButton.propTypes = {
  trackMode: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

PanelList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Panel;
