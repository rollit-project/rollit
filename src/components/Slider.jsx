import PropTypes from 'prop-types';

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
        min="1"
        max="5"
        step={0.1}
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
