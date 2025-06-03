import PropTypes from 'prop-types';

const PanelItems = ({ imageList }) => {
  return (
    <div className="scrollbar-hidden flex h-4/5 gap-[30px] pl-5 [&::-webkit-scrollbar]:hidden">
      {imageList.map((image) => (
        <img
          key={image.name}
          className="h-full w-full flex-1 object-contain hover:scale-110"
          src={image.src}
          alt={image.name}
        />
      ))}
    </div>
  );
};

PanelItems.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PanelItems;
