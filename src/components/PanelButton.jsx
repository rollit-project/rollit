import PropTypes from 'prop-types';

const PanelButton = ({ activeButton, onButtonClick }) => {
  return (
    <div className="relative w-[480px] h-[50px] rounded-tr-[10px] bg-[#FFFFFF] text-center transition-all duration-500">
      <div className="flex justify-around items-center h-full">
        <button
          type="button"
          name="centerButton"
          className={`flex-1 h-full px-4 cursor-pointer hover:text-red-600 ${activeButton === 'coster' ? 'bg-[rgba(0,0,0,0.3)]' : ''}`}
          onClick={() => onButtonClick('coster')}
        >
          coster
        </button>
        <button
          type="button"
          name="trackButton"
          className={`flex-1 h-full px-4 cursor-pointer hover:text-red-600 ${activeButton === 'track' ? 'bg-[rgba(0,0,0,0.3)]' : ''}`}
          onClick={() => onButtonClick('track')}
        >
          Track
        </button>
        <button
          type="button"
          name="itemButton"
          className={`flex-1 h-full px-4 cursor-pointer rounded-tr-2xl hover:text-red-600 ${activeButton === 'item' ? 'bg-[rgba(0,0,0,0.3)]' : ''}`}
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
