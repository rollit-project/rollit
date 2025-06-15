import PropTypes from 'prop-types';

import { RAIL_TOOLTIP_MAP } from '@/constants/railTooltipMap';

const PanelItems = ({ imageList, onClick }) => {
  const getTooltipText = (name) => RAIL_TOOLTIP_MAP[name] ?? '설명 없음';

  return (
    <div className="scrollbar-hidden flex h-[120px] gap-[30px] overflow-x-auto pr-5 pl-5 [&::-webkit-scrollbar]:hidden">
      {imageList.map((image) => (
        <button
          key={image.name}
          type="button"
          onClick={() => onClick(image.name)}
          title={getTooltipText(image.name)}
          className="flex h-[120px] w-[200px] flex-shrink-0"
        >
          <img
            className="h-full w-full flex-1 object-contain hover:scale-110"
            src={image.src}
            alt={image.name}
          />
        </button>
      ))}
    </div>
  );
};

PanelItems.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PanelItems;
