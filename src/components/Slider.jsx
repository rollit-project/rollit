import PropTypes from 'prop-types';

import {
  CAMERA_SPEED_STEP,
  MAX_CAMERA_SPEED,
  MIN_CAMERA_SPEED,
} from '@/constants/cameraSensitivity';

const Slider = ({ label, id, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        onChange={(e) => onChange(e.target.value)}
        type="range"
        value={value}
        min={MIN_CAMERA_SPEED}
        max={MAX_CAMERA_SPEED}
        step={CAMERA_SPEED_STEP}
        className="h- mt-2 block w-50 cursor-pointer appearance-none rounded-lg border-1 border-amber-300 bg-white accent-yellow-300 dark:bg-gray-700"
      />
    </div>
  );
};

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
