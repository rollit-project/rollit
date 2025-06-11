import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  RollerCoasterPlayIcon,
  RollerCoasterResetIcon,
  RollerCoasterUndoIcon,
} from '@/assets/icons';
import SpeedSettingModal from '@/components/ui/modal/SpeedSettingModal';
import { useSceneStore } from '@/store/useSceneStore';
import { generateTrackCurve } from '@/utils/generateTrackCurve';
import { isRailConnected } from '@/utils/isRailConnected';

const EditorActionControls = () => {
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const navigate = useNavigate();
  const placedRails = useSceneStore((state) => state.placedRails);
  const setCoasterPath = useSceneStore((state) => state.setCoasterPath);

  const handlePlayClick = () => {
    if (!isRailConnected()) {
      console.log('트랙이 완전히 연결되지 않았습니다.');

      return;
    }

    setShowSpeedModal(true);
  };

  const handleStartSimulation = () => {
    const points = placedRails.flatMap((rail) => rail.points);
    const generatedCurve = generateTrackCurve(points);

    setCoasterPath(generatedCurve);
    navigate('/simulation');
  };

  const controlButtons = [
    {
      key: 'play',
      icon: (
        <RollerCoasterPlayIcon className="fill-white transition-all duration-300 hover:fill-black" />
      ),
      onClick: handlePlayClick,
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
      {showSpeedModal && (
        <SpeedSettingModal
          onCancel={() => setShowSpeedModal(false)}
          onStart={handleStartSimulation}
        />
      )}
    </div>
  );
};

export default EditorActionControls;
