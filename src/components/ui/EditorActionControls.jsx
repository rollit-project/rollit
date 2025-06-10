import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  RollerCoasterPlayIcon,
  RollerCoasterResetIcon,
  RollerCoasterUndoIcon,
} from '@/assets/icons';
import SpeedSettingModal from '@/components/ui/modal/SpeedSettingModal';

const EditorActionControls = ({ handleStartSimulation }) => {
  const [showModal, setShowModal] = useState(false);

  const controlButtons = [
    {
      key: 'play',
      icon: (
        <RollerCoasterPlayIcon className="fill-white transition-all duration-300 hover:fill-black" />
      ),
      onClick: () => setShowModal(true),
    },
    {
      key: 'undo',
      icon: (
        <RollerCoasterUndoIcon className="stroke-white transition-all duration-300 hover:stroke-black" />
      ),
    },
    {
      key: 'reset',
      icon: (
        <RollerCoasterResetIcon className="fill-white stroke-white transition-all duration-300 hover:fill-black hover:stroke-black" />
      ),
    },
  ];

  return (
    <div className="relative h-[50px] w-[200px] rounded-tl-[10px] border border-white bg-[rgba(255,255,255,0.3)] text-right transition-transform duration-500">
      <div className="flex h-full items-center justify-end gap-10 pr-4">
        {controlButtons.map(({ key, icon, onClick }) => (
          <button type="button" key={key} onClick={onClick} className="h-full cursor-pointer">
            {icon}
          </button>
        ))}
      </div>
      {showModal && (
        <SpeedSettingModal onCancel={() => setShowModal(false)} onStart={handleStartSimulation} />
      )}
    </div>
  );
};

EditorActionControls.propTypes = {
  handleStartSimulation: PropTypes.func.isRequired,
};

export default EditorActionControls;
