import PropTypes from 'prop-types';

import { SOUND_CONFIG } from '@/constants/sound';

const VolumeSlider = ({ label, id, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={SOUND_CONFIG.BGM.MIN_VOLUME}
        max={SOUND_CONFIG.BGM.MAX_VOLUME}
        step={SOUND_CONFIG.BGM.STEP}
        className="h- mt-2 block w-50 cursor-pointer appearance-none rounded-lg border-1 border-blue-300 bg-white accent-blue-300 dark:bg-gray-700"
      />
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
