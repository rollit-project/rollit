import PropTypes from 'prop-types';

const PanelList = ({ imageList }) => {
  return (
    <div className="flex gap-[30px] h-4/5 overflow-auto scrollbar-hidden [&::-webkit-scrollbar]:hidden">
      {imageList.map((src, index) => (
        <img
          key={src}
          className="h-full w-full object-contain flex-1"
          src={src}
          alt={`패널 종류 ${index + 1}`}
        />
      ))}
    </div>
  );
};

PanelList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PanelList;
