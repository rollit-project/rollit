import PropTypes from 'prop-types';

const PanelButton = ({ trackMode, onButtonClick }) => {
  return (
    <div className="relative h-[50px] w-[480px] rounded-tr-[10px] text-center transition-all duration-500">
      <div className="flex h-full items-center justify-around">
        <button
          type="button"
          name="centerButton"
          className={`h-full flex-1 cursor-pointer px-4 font-bold text-white transition-all duration-300 ${
            trackMode === 'coster'
              ? 'bg-[rgba(0,0,0,0.3)]'
              : 'border-2 border-white bg-[rgba(255,255,255,0.3)]'
          }`}
          onClick={() => onButtonClick('coster')}
        >
          coster
        </button>

        <button
          type="button"
          name="trackButton"
          className={`h-full flex-1 cursor-pointer px-4 font-bold text-white transition-all duration-300 ${
            trackMode === 'track'
              ? 'bg-[rgba(0,0,0,0.3)]'
              : 'border-2 border-white bg-[rgba(255,255,255,0.3)]'
          }`}
          onClick={() => onButtonClick('track')}
        >
          Track
        </button>

        <button
          type="button"
          name="itemButton"
          className={`h-full flex-1 cursor-pointer rounded-tr-[10px] px-4 font-bold text-white transition-all duration-300 ${
            trackMode === 'item'
              ? 'bg-[rgba(0,0,0,0.3)]'
              : 'border-2 border-white bg-[rgba(255,255,255,0.3)]'
          }`}
          onClick={() => onButtonClick('item')}
        >
          Item
        </button>
      </div>
    </div>
  );
};

PanelButton.propTypes = {
  trackMode: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default PanelButton;
