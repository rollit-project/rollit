import PropTypes from 'prop-types';

const PanelButton = ({ activeButton, onButtonClick }) => {
  return (
    <div className="relative h-[50px] w-[480px] rounded-tr-[10px] bg-[#FFFFFF] text-center transition-all duration-500">
      <div className="flex h-full items-center justify-around">
        <button
          type="button"
          name="centerButton"
          className={`h-full flex-1 cursor-pointer px-4 hover:text-red-600 ${activeButton === 'coster' ? 'bg-[rgba(0,0,0,0.3)]' : ''}`}
          onClick={() => onButtonClick('coster')}
        >
          coster
        </button>
        <button
          type="button"
          name="trackButton"
          className={`h-full flex-1 cursor-pointer px-4 hover:text-red-600 ${activeButton === 'track' ? 'bg-[rgba(0,0,0,0.3)]' : ''}`}
          onClick={() => onButtonClick('track')}
        >
          Track
        </button>
        <button
          type="button"
          name="itemButton"
          className={`h-full flex-1 cursor-pointer rounded-tr-2xl px-4 hover:text-red-600 ${activeButton === 'item' ? 'bg-[rgba(0,0,0,0.3)]' : ''}`}
          onClick={() => onButtonClick('item')}
        >
          Item
        </button>
      </div>
    </div>
  );
};

PanelButton.propTypes = {
  activeButton: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default PanelButton;
