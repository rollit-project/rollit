import PropTypes from 'prop-types';

const PanelItems = ({ imageList }) => {
  return (
    <div className="scrollbar-hidden flex h-4/5 gap-[30px] overflow-auto pl-5 [&::-webkit-scrollbar]:hidden">
      {imageList.map((src, index) => (
        <img
          key={src}
          className="h-full w-full flex-1 object-contain"
          src={src}
          alt={`패널 종류 ${index + 1}`}
        />
      ))}
    </div>
  );
};

PanelItems.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PanelItems;
