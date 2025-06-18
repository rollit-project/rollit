import PropTypes from 'prop-types';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';

import { SOUND_CONFIG } from '@/constants/sound';
import { useVolumeToggle } from '@/hooks/useVolumeToggle';

const VolumeSlider = ({ label, id, value, onChange }) => {
  const { toggle, isMuted } = useVolumeToggle(value);
  const { MIN_VOLUME, MAX_VOLUME, STEP } = SOUND_CONFIG.BGM;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-grow">
        <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <input
          id={id}
          type="range"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          min={MIN_VOLUME}
          max={MAX_VOLUME}
          step={STEP}
          className="mt-2 block w-full cursor-pointer appearance-none rounded-lg border-1 border-blue-300 bg-white accent-blue-300 dark:bg-gray-700"
        />
      </div>
      <button
        type="button"
        onClick={() => toggle(onChange)}
        className="mt-6 text-gray-600 hover:text-blue-500 dark:text-white"
        aria-label="Toggle mute"
      >
        {isMuted ? <HiVolumeOff size={24} /> : <HiVolumeUp size={24} />}
      </button>
    </div>
  );
};

VolumeSlider.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VolumeSlider;
