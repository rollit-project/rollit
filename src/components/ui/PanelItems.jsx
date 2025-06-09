import PropTypes from 'prop-types';

const PanelItems = ({ imageList, onClick }) => {
  return (
    <div className="scrollbar-hidden flex h-4/5 gap-[30px] pl-5 [&::-webkit-scrollbar]:hidden">
      {imageList.map((image) => (
        <button
          key={image.name}
          type="button"
          onClick={() => {
            onClick(image.name);
          }}
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
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PanelItems;
