import PropTypes from 'prop-types';

import carousel from '@/assets/images/carousel.png';
import chair from '@/assets/images/chair.png';
import coster from '@/assets/images/coster.png';
import cream from '@/assets/images/cream.png';
import racer from '@/assets/images/racer.png';
import smile from '@/assets/images/smile.png';
import stall from '@/assets/images/stall.png';
import steel from '@/assets/images/steel.png';
import stone from '@/assets/images/stone.png';
import vine from '@/assets/images/vine.png';
import windmill from '@/assets/images/windmill.png';
import PanelList from '@/components/PanelList';

const Panel = ({ isOpen, trackMode }) => {
  const costerImages = [coster];
  const trackImages = [steel, stone, vine, smile];
  const itemImages = [carousel, chair, cream, racer, windmill, stall, coster];
  const imageSets = {
    coster: costerImages,
    track: trackImages,
    item: itemImages,
  };
  const imageList = (track) => imageSets[track] || [];

  return (
    <div
      className={`h-[138px] w-full pr-5 pl-5 ${
        isOpen ? 'bg-[rgba(0,0,0,0.3)]' : 'bg-[#FFFFFF]'
      } z-40 flex items-center`}
    >
      <PanelList imageList={imageList(trackMode)} />
    </div>
  );
};

Panel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  trackMode: PropTypes.string,
};

PanelList.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string),
};

export default Panel;
