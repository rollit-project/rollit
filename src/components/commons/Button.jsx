import PropTypes from 'prop-types';

const Button = ({ buttonText, textSize = '20px', padding = '15px' }) => {
  return (
    <button
      type="button"
      className="inline-block cursor-pointer rounded-xl bg-yellow-300 font-bold text-black shadow-md transition-all duration-300 hover:scale-105 hover:bg-yellow-400"
      style={{
        fontSize: textSize,
        padding,
      }}
    >
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  textSize: PropTypes.string,
  padding: PropTypes.string,
};

export default Button;
