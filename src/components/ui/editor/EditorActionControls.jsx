import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegPlayCircle } from 'react-icons/fa';
import { RiArrowGoBackFill, RiResetLeftFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@/components/ui/editor/ActionButton';
import SpeedSettingModal from '@/components/ui/modal/SpeedSettingModal';
import { SFX_PATHS, SOUND_CONFIG } from '@/constants/sound';
import { useAudio } from '@/hooks/useAudio';
import { useSceneStore } from '@/store/useSceneStore';
import { generateRailCurve } from '@/utils/generateRailCurve';
import { generateSmoothCurvePoints } from '@/utils/generateSmoothCurvePoints';
import { isRailConnected } from '@/utils/isRailConnected';

const EditorActionControls = () => {
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const navigate = useNavigate();
  const placedRails = useSceneStore((state) => state.placedRails);
  const setCoasterPath = useSceneStore((state) => state.setCoasterPath);
  const undoRail = useSceneStore((state) => state.undoRail);
  const resetRails = useSceneStore((state) => state.resetRails);
  const { playSfx } = useAudio();
  const { START_VOLUME } = SOUND_CONFIG;
  const handlePlayClick = () => {
    if (!isRailConnected()) {
      toast.error('레일이 완전히 연결되지 않았습니다! ', {
        duration: 1000,
      });

      return;
    }
    playSfx(SFX_PATHS.start);
    setShowSpeedModal(true);
  };

  const handleStartSimulation = () => {
    const smoothPoints = generateSmoothCurvePoints(placedRails);
    const generatedCurve = generateRailCurve(smoothPoints);

    playSfx(SFX_PATHS.play, START_VOLUME, true);

    setCoasterPath(generatedCurve);
    navigate('/simulation');
  };

  const controlButtons = [
    {
      key: 'play',
      icon: FaRegPlayCircle,
      onClick: handlePlayClick,
    },
    {
      key: 'undo',
      icon: RiArrowGoBackFill,
      onClick: () => {
        undoRail();
        playSfx(SFX_PATHS.action);
      },
    },
    {
      key: 'reset',
      icon: RiResetLeftFill,
      onClick: () => {
        resetRails();
        playSfx(SFX_PATHS.action);
      },
    },
  ];

  return (
    <div className="relative h-[50px] w-[200px] rounded-tl-[10px] border border-white bg-[rgba(255,255,255,0.3)] text-right transition-transform duration-500">
      <div className="flex h-full items-center justify-end gap-10 pr-4">
        {controlButtons.map(({ key, icon, onClick }) => (
          <ActionButton key={key} icon={icon} onClick={onClick} />
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
