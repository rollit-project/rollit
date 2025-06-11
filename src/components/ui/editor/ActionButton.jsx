import PropTypes from 'prop-types';

const ActionButton = ({ icon: Icon, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="h-full text-white hover:text-black">
      <Icon size={30} />
    </button>
  );
};

ActionButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
};

export default ActionButton;
