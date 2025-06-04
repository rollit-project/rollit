import PropTypes from 'prop-types';

const EditorCategorySelector = ({ activePanelType, onButtonClick }) => {
  const PANEL_INFO = ['coaster', 'track', 'item'];

  return (
    <div className="relative h-[50px] w-[480px] rounded-tr-[10px] text-center transition-all duration-500">
      <div className="flex h-full items-center justify-around">
        {PANEL_INFO.map((type) => (
          <button
            type="button"
            key={type}
            className={`h-full flex-1 cursor-pointer px-4 font-bold text-white transition-all duration-300 ${activePanelType === type ? 'bg-[rgba(0,0,0,0.3)]' : 'border-2 border-white bg-[rgba(255,255,255,0.3)]'} ${type === 'item' ? 'rounded-tr-[10px]' : ''}`}
            onClick={() => onButtonClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

EditorCategorySelector.propTypes = {
  activePanelType: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default EditorCategorySelector;
