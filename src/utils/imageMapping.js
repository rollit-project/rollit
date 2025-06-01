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

const costerImages = [coster];
const trackImages = [steel, stone, vine, smile];
const itemImages = [carousel, chair, cream, racer, windmill, stall];

const imageSets = {
  coster: costerImages,
  track: trackImages,
  item: itemImages,
};

export const imageList = (track) => imageSets[track] || [];
