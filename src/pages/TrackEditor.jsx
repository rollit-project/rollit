import PropTypes from 'prop-types';
import { useState } from 'react';

import Panel from '@/components/Panel';
import PanelButton from '@/components/PanelButton';

const TrackEditor = () => {
  const [activeButton, setActiveButton] = useState('');
  const [trackMode, setTrackMode] = useState('');

  const handleButtonClick = (buttonType) => {
    setActiveButton((prev) => (prev === buttonType ? '' : buttonType));
    setTrackMode(buttonType);
  };

  return (
    <div className="fixed bottom-0 w-full overflow-visible transition-all duration-500">
      <PanelButton activeButton={activeButton} onButtonClick={handleButtonClick} />
      <div className={`w-full transition-all duration-500 ${activeButton ? 'h-[138px]' : 'h-0'}`}>
        <Panel isOpen={!!activeButton} trackMode={trackMode} />
      </div>
    </div>
  );
};

PanelButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TrackEditor;
